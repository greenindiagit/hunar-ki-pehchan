import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Component/common/Loader";
import apis, { BASE_URL } from "../../apis/apis";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getBanners = async () => {
    try {
      setLoading(true);

      const response = await axios.get(apis.banners.get);

      if (response.data.success) {
        setBanners(response.data.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${apis.banners.delete}/${id}`);

      setBanners((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (banner) => {
    try {
      const newStatus = !banner.status;
      setBanners((prev) =>
        prev.map((item) =>
          item._id === banner._id
            ? {
              ...item,
              status: newStatus,
            }
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredData = [...banners]
    .filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "ASC") {
        return (a.name || "").localeCompare(
          b.name || ""
        );
      }

      return (b.name || "").localeCompare(
        a.name || ""
      );
    });

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  const startIndex =
    (currentPage - 1) * pageSize;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-2">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
              <h3 className="fw-bold mb-0">
                Banners ({filteredData.length})
              </h3>

              <div className="d-flex gap-2 flex-wrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  style={{ width: "250px" }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <select
                  className="form-select"
                  style={{ width: "120px" }}
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value)
                  }
                >
                  <option value="DESC">
                    DESC
                  </option>
                  <option value="ASC">
                    ASC
                  </option>
                </select>

                <select
                  className="form-select"
                  style={{ width: "90px" }}
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(
                      Number(e.target.value)
                    );
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>
                    10
                  </option>
                  <option value={25}>
                    25
                  </option>
                  <option value={50}>
                    50
                  </option>
                </select>

                <Link
                  to="/banner"
                  className="btn btn-primary px-4"
                >
                  + Add
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table align-middle">
                <thead
                  style={{
                    background: "#eef3f8",
                  }}
                >
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th width="150">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map(
                      (banner, index) => (
                        <tr
                          key={banner._id}
                        >
                          <td>
                            {startIndex +
                              index +
                              1}
                          </td>

                          <td>
                            <img
                              src={`${BASE_URL}/${banner.image}`}
                              alt={
                                banner.name
                              }
                                className="banner-thumb"
                            />
                          </td>

                          <td>
                            {banner.name}
                          </td>

                          <td>
                            {banner.type}
                          </td>

                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input fs-4"
                                type="checkbox"
                                checked={
                                  banner.status ??
                                  true
                                }
                                onChange={() =>
                                  handleStatusChange(
                                    banner
                                  )
                                }
                              />
                            </div>
                          </td>

                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                to={`/banner-edit/${banner._id}`}
                                className="btn btn-light rounded-circle"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>

                              <button
                                className="btn btn-light rounded-circle"
                                onClick={() =>
                                  handleDelete(
                                    banner._id
                                  )
                                }
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4"
                      >
                        No Banner Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  Showing{" "}
                  {startIndex + 1} -
                  {Math.min(
                    startIndex +
                    pageSize,
                    filteredData.length
                  )}{" "}
                  of{" "}
                  {
                    filteredData.length
                  }{" "}
                  records
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          prev - 1
                      )
                    }
                  >
                    Previous
                  </button>

                  <span className="align-self-center px-2">
                    {currentPage} /{" "}
                    {totalPages}
                  </span>

                  <button
                    className="btn btn-outline-secondary"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          prev + 1
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerList;