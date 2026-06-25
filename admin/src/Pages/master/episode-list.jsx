import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Component/common/Loader";
import apis from "../../apis/apis";
import { Link, useSearchParams } from "react-router-dom";

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(search);

  // ---------------- FETCH EPISODES ----------------
  const fetchEpisodes = async () => {
    try {
      setLoading(true);

      const res = await axios.get(apis.episodes.get, {
        params: {
          page,
          limit,
          search,
          sort,
        },
      });

      if (res.data.success) {
        setEpisodes(res.data.data || []);
      }
    } catch (error) {
      console.error("Episode fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [page, limit, search, sort]);

  // ---------------- UPDATE URL PARAMS ----------------
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    setSearchParams(params);
  };

  // ---------------- SEARCH DEBOUNCE ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({
        search: searchInput,
        page: 1,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);


  // -----------toggle button------------
  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;

      const res = await axios.put(
        `${apis.episodes.update}/${id}`,
        {
          status: newStatus,
        }
      );

      if (res.data.success) {
        setEpisodes((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, status: newStatus }
              : item
          )
        );
      }
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };


  // ---------------- DELETE EPISODE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this episode?"))
      return;

    try {
      const res = await axios.delete(`${apis.episodes.delete}/${id}`);

      if (res.data.success) {
        setEpisodes((prev) => prev.filter((ep) => ep._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <Loader />;

  return (
     <div className="page-wrapper">
      <div className="container mt-4 mb-2">

      {/* HEADER CARD */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

            <div>
              <h5 className="mb-0 ">Episodes {episodes.length}</h5>
            </div>

            {/* CONTROLS */}
            <div className="d-flex gap-2 flex-wrap align-items-center">

              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search episodes..."
                style={{ width: "220px" }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <select
                className="form-select form-select-sm"
                value={sort}
                style={{ width: "110px" }}
                onChange={(e) =>
                  updateParams({ sort: e.target.value, page: 1 })
                }
              >
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>

              <select
                className="form-select form-select-sm"
                value={limit}
                style={{ width: "90px" }}
                onChange={(e) =>
                  updateParams({ limit: Number(e.target.value), page: 1 })
                }
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>

              <Link to="/episode-add" className="btn btn-primary btn-sm px-3">
                + Add Episode
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Guest</th>
                <th>Duration</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {episodes.length > 0 ? (
                episodes.map((ep, index) => (
                  <tr key={ep._id}>
                    <td className="text-muted">
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td className="fw-semibold">{ep.title}</td>
                    <td>{ep.guestName || "-"}</td>
                    <td>{ep.duration || "-"}</td>

                    {/* STATUS BADGE */}
                    <td>
                      <div className="form-check form-switch ">
                        <input
                          className="form-check-input fs-4"
                          type="checkbox"
                          checked={ep.status}
                          onChange={() => handleStatusChange(ep._id, ep.status)}
                        />
                      </div>
                    </td>

                    {/* ACTION */}
                    <td>
                      <div className="d-flex justify-content-center gap-2">

                        <Link
                          to={`/episode/edit/${ep._id}`}
                          className="btn btn-light rounded-circle"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>

                        <button
                          className="btn btn-light rounded-circle"
                          onClick={() => handleDelete(ep._id)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No episodes found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={page === 1}
          onClick={() => updateParams({ page: page - 1 })}
        >
          <i className="bi bi-chevron-right"></i>
        </button>

        <span className="fw-semibold">
          {page}
        </span>

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={episodes.length < limit}
          onClick={() => updateParams({ page: page + 1 })}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

      </div>
    </div>
    </div>
  );
};

export default EpisodeList;
