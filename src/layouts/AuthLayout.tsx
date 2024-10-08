import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "../assets/elda-ai-logo-no-bg.png";
import { AuthLayoutProps } from "@/types";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="sign-in-layout">
      <nav className="flex justify-between items-center w-full px-8 py-2 h-[15vh] md:h-[120px] bg-white">
        <Link
          to="/"
          className="w-[40%] sm:w-[30%] md:w-[15%]"
        >
          <img src={Logo} alt="logo" className="w-full h-full object-cover" />
        </Link>
        <Link to="/sign-in">
          <Button className="bg-red p-5 md:h-12 md:w-32">Sign In</Button>
        </Link>
      </nav>
      <main className="flex items-center justify-center py-10 min-h-[90vh] bg-ai">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
