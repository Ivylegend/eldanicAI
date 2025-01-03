import { Link } from "react-router-dom";
import Logo from "../assets/elda-new-logo.png";
import { Button } from "./ui/button";

const HomeNavBar = () => {
  return (
    <div className="min-w-full py-8 px-8 sm:px-12 lg:px-16 flex justify-between items-center overflow-hidden h-40">
      <div className="flex items-center justify-center w-[160px] sm:w-[240px]">
        <img src={Logo} alt="logo" className="w-full h-full scale-150" />
      </div>
      <Button className="bg-red rounded-lg p-3 w-28 h-12 text-lg flex items-center justify-center">
        <Link to="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
};

export default HomeNavBar;
