import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { ArrowLeft, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import apis from "../../apis/apis";
function Disclaimer() {
  const navigate = useNavigate();
 

    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get(apis.quickLink.get);

        const allData = res?.data?.data || [];

        console.log("All Data:", allData);

        const content = allData.find(
          (item) => item.type === "Disclaimer"
        );

        console.log("Matched Content:", content);

        if (content) {
          setData(content);
        }
      } catch (error) {
        console.error("Terms fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const effectiveDate = data?.effectiveDate
    ? new Date(data.effectiveDate).toLocaleDateString("en-IN")
    : "";

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <h5>Loading...</h5>
        </div>
        <Footer />
      </>
    );
  }

 
  return (
    
    <>
      <Header />

      <section className="policy-header">
        <div className="tcp-shell py-4 py-md-5">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="d-flex align-items-center justify-content-center back-btn mb-4"
          >
            <ArrowLeft size={20} color="#0f7b53" />
          </button>

          {/* Main Card */}
          <div className="card border-0 policy-card">
            {/* Header */}
            <div className="p-4 policy-card-header">
              <h2 className="policy-title">Disclaimer</h2>

              {/* Badge */}
              <div className="policy-badge">
                <Clock3 size={16} />
                Effective {effectiveDate}
              </div>
            </div>

            {/* Body */}
            {data && (
              <div
                className="p-4 p-md-5"
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Disclaimer;
