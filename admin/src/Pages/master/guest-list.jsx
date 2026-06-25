import { useEffect, useState } from "react";
import apis, { BASE_URL } from "../../apis/apis";
import Loader from "../../Component/common/Loader";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../Component/Pagination/Pagination";
import axios from "axios";

const GuestList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    updateParams({
      search: debouncedSearch,
      page: 1,
    });
  }, [debouncedSearch]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apis.guests.get, {
        params: {
          page,
          limit,
          search,
          sort,
        },
      });
      if (res.data.success) {
        setGuests(res.data.data);
        setTotal(res.data.total || 0);
        setHasNextPage(res.data.hasNextPage);
        setHasPrevPage(res.data.hasPrevPage);
        setPagination(res.data.pagination || null);
      }
    } catch (error) {
      console.error("Fetch guests error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGuests();
  }, [page, limit, sort, search]);

  const updateParams = (newParams) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      ...newParams,
    }));
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guest?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`${apis.guests.delete}/${id}`);
      setGuests((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleStatusChange = async (guest) => {
    try {
      const newStatus = !guest.status;
      setGuests((prev) =>
        prev.map((item) =>
          item._id === guest._id
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
  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-2">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold"> Guest List ({total})</h4>

          {/* CONTROLS */}
          <div className="d-flex gap-2 align-items-center">
            {/* SEARCH */}
            <input
              type="text"
              className="form-control form-control-sm w-auto"
              style={{ width: "200px" }}
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            {/* SORT */}
            <select
              className="form-select form-select-sm w-auto"
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value, page: 1 })}
            >
              <option value="desc">DESC</option>
              <option value="asc">ASC</option>
            </select>

            {/* LIMIT */}
            <select
              className="form-select form-select-sm w-auto"
              value={limit}
              onChange={(e) =>
                updateParams({ limit: Number(e.target.value), page: 1 })
              }
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>

            <Link to="/guest/add">
              <button className="btn btn-sm btn-primary">Add</button>
            </Link>
          </div>
        </div>
        {/* LIST */}
        <div className="table-responsive mt-3">
          <table className="table table-hover align-middle">
            <thead className="table-info">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {guests.length > 0 ? (
                guests.map((guest, index) => (
                  <tr key={guest._id}>
                    <td>
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td>
                      <img
                        src={`${BASE_URL}/${guest.image}`}
                        alt={guest.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>

                    <td className="fw-bold">
                      {guest.name}
                    </td>

                    <td className="text-primary">
                      {guest.role}
                    </td>

                    <td className="text-muted">
                      {guest.description}
                    </td>

                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input fs-4"
                          type="checkbox"
                          checked={guest.status ?? true}
                          onChange={() =>
                            handleStatusChange(guest)
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/guest/edit/${guest._id}`}
                          className="btn btn-light rounded-circle"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-light rounded-circle"
                          onClick={() =>
                            handleDelete(guest._id)
                          }
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >
                    No guests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* PAGINATION */}
        <Pagination
          pagination={pagination}
          page={page}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          onPageChange={(p) => updateParams({ page: p })}
        />
      </div>
    </div>
  );
};

export default GuestList;
