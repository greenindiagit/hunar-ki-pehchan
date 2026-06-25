import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/common/Loader";
import apis from "../../apis/apis";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const QuickAdd = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [effectiveDate, setEffectiveDate] = useState("");
    const [quickId, setQuickId] = useState(null);
    const [type, setType] = useState("");

    const { type: routeType } = useParams();


    const fetchContents = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${apis.quickLink.get}/${encodeURIComponent(routeType)}`
            );

            // console.log("API Response:", res.data);

            const data = res?.data?.data;

            if (data) {
                setQuickId(data._id);
                setType(data.type || "");
                setDescription(data.description || "");

                setEffectiveDate(
                    data.effectiveDate
                        ? data.effectiveDate.split("T")[0]
                        : ""
                );
            }
        } catch (error) {
            console.error(
                "Fetch Error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (routeType) {
            fetchContents();
        }
    }, [routeType]);
    // get  


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                title: type,
                type,
                effectiveDate,
                description,
            };
            let res;

            if (quickId) {
                res = await axios.put(
                    `${apis.quickLink.update}/${quickId}`,
                    payload
                );
            } else {
                res = await axios.post(
                    apis.quickLink.create,
                    payload
                );
            }
            navigate("/content-list");
            console.log(res.data);

            fetchContents();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    if (loading) return <Loader />;

    return (
        <div className="page-wrapper">
            <div className="container mt-4 mb-2">
                <h3 className="mb-4">
                    {quickId ? "Update Content" : "Add Content"}
                </h3>

                <form onSubmit={handleSubmit} className="card shadow-sm p-4">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Type</label>
                            <select
                                className="form-select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Privacy Policy">Privacy Policy</option>
                                <option value="Terms & Conditions">Terms & Conditions</option>
                                <option value="Disclaimer">Disclaimer</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Effective Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={effectiveDate}
                                onChange={(e) => setEffectiveDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            {type || "Content Description"}
                        </label>

                        <div className="ckeditor-wrapper">
                            <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                                config={{
                                    placeholder: `Enter ${type || "content"}...`,
                                    toolbar: [
                                        "heading",
                                        "|",
                                        "bold",
                                        "italic",
                                        "link",
                                        "bulletedList",
                                        "numberedList",
                                        "|",
                                        "outdent",
                                        "indent",
                                        "|",
                                        "blockQuote",
                                        "insertTable",
                                        "|",
                                        "undo",
                                        "redo",
                                    ],
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/content-list")}
                        >
                            Back
                        </button>

                        <button type="submit" className="btn btn-primary">
                            {quickId ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuickAdd;
