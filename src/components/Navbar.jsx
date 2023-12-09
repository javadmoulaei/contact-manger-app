import SearchContact from "./Contacts/SearchContact";

import { PURPLE, BACKGROUND } from "../helpers/colors";
import { useLocation } from "react-router-dom";

const Navbar = ({ query, search }) => {
  const location = useLocation();
  return (
    <nav
      className="navbar navbar-dark navbar-expend-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fa fa-id-badge" style={{ color: PURPLE }} /> وب
              اپلیکیشن مدیریت{" "}
              <span style={{ color: PURPLE }}>مدیریت مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
