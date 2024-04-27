import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link className="home-link" style={{ color: "white" }} to="http://localhost:5173/">
          Home
        </Link>
        <Link className="home-link" style={{ color: "white" }} to="http://localhost:5173/create/">
          CreateAForum
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;