import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import Footer from "../components/shared/NavBar/Footer";

const Root = () => {
  return (
    <div className="bg-[#1A202C] text-[#89A3B6] min-h-screen">
      <NavBar />
      <div> {/* Removed padding-top */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
