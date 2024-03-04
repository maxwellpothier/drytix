const Banner = () => {
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
      <h1 style={bannerH1Style}>
        <a href="/dashboard">Dashboard</a>
      </h1>
      <h1 style={bannerH1Style}>
        <a href="/login">Login</a>
      </h1>
    </div>
  );
};

export default Banner;
