import logoImage from "../assets/logo.png";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

function LoginHeader() {
  return (
    <Link to="/" className="flex items-center p-4">
      <div
         className="w-[250px] h-[60px] bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${logoImage})` }}
      />
    </Link>
  );
}

export default LoginHeader;