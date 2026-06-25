const Dashboard = () => {
  return (
     <div className="page-wrapper">
      <div className="container mt-4 mb-2">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">
        <DashboardCard title="Registered Users" value="1200" />
        <DashboardCard title="Featured Guests" value="25" />
        <DashboardCard title="Popular Episodes" value="45" />
        <DashboardCard title="Quick Links" value="12" />
      </div>
    </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
    <div className="card shadow-sm h-100">
      <div className="card-body text-center">
        <h6 className="card-title text-muted">{title}</h6>
        <h2 className="fw-bold">{value}</h2>
      </div>
    </div>
  </div>
);

export default Dashboard;
