import { useRouter } from "next/router";

const Banner = (props: { dashboard: boolean }) => {
  const dashboard = !props.dashboard;
  const dashboardContainerStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    height: "auto",
    padding: 20,
    fontFamily: "Arial, sans-serif",
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  };

  const bannerH1Style = {
    margin: "0",
    color: "blue",
    padding: "10px",
  };

  return (
    <div style={dashboardContainerStyle}>
      <h1 style={bannerH1Style}>
        <a href="/">Home</a>
      </h1>
      {dashboard ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h1 style={bannerH1Style}>
            <a href="/register">Register</a>
          </h1>
          <h1 style={bannerH1Style}>
            <a href="/login">Login</a>
          </h1>
          <h1 style={bannerH1Style}>
            <a href="/team">Meet the Team</a>
          </h1>
        </div>
      ) : (
        <div>
          <h1 style={bannerH1Style}>
            <a href="/login">Logout</a>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Banner;
