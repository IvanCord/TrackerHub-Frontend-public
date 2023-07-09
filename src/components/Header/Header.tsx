import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/th.png";

const navItems = [
  {
    title: "Pedidos",
    link: "/",
    icon: "file-earmark-richtext-fill",
  },
  {
    title: "Simulación / Operaciones",
    link: "/simulator",
    icon: "pc-display-horizontal",
  },
];

function Header() {
  return (
    <div className="Header">
      <div className="flex items-center justify-start pl-8">
        <h1 className="font-black text-3xl">Tracker</h1>
        <img
          src={logo}
          className="h-12 w-auto relative top-[-5px]"
          alt="TH logo"
        />
      </div>
      <nav className="Header_navbar">
        {navItems.map((item, key) => {
          return (
            <NavLink
              to={item.link}
              key={key}
              className={(e) =>
                `Header_navbar_item ${e.isActive ? "selected" : ""}`
              }
            >
              <i className={`Header_navbar_item_i bi bi-${item.icon}`}></i>
              <span className="Header_navbar_item_span">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="Header_profile">
        <i className={`Header_profile_icon bi bi-person-circle`}></i>
      </div>
    </div>
  );
}

export default Header;
