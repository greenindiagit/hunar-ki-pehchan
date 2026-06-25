import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Component/common/Loader";
import { Link } from "react-router-dom";
import apis from "../../apis/apis";

const ContentList = () => {
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            setLoading(true);

            const response = await axios.get(apis.quickLink.get);

            if (response?.data?.data) {
                setContents(response.data.data);
            } else {
                setContents([]);
            }
        } catch (error) {
            console.error(error);
            setContents([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-GB");
    };

    if (loading) return <Loader />;
    return (
        <div className="page-wrapper">
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Content Management</h3>

                    <Link
                        to="/content/"
                        className="btn btn-primary"
                    >
                        Add Content
                    </Link>
                </div>

                <div className="card shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Effective Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {contents.length > 0 ? (
                                    contents.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{formatDate(item.effectiveDate)}</td>
                                            <td>
                                                <Link to={`/content/${item._id}`}
                                                  className="btn btn-light rounded-circle"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentList;