import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="header">This is Header</div>
      <div className="main">
        <Outlet />
      </div>
      <div className="footer">This is Footer</div>
    </>
  );
}

export default MainLayout