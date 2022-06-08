import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="header">This is Header Login</div>
      <div className="main">
        <Outlet />
      </div>
      <div className="footer">This is Footer Login</div>
    </>
  );
}

export default AuthLayout