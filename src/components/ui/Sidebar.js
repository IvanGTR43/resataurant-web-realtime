import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-center font-bold">Restaurant</p>
        <p className="mt-4 text-gray-500">
          Administra tu restaurant en las siguientes opciones
        </p>
        <nav>
          <CustomLink to="/">Ordenes</CustomLink>
          <CustomLink to="/menu">Menu</CustomLink>
          <CustomLink to="/nuevo-platillo">Nuevo Platillo</CustomLink>
        </nav>
      </div>
    </div>
  );
};

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <Link
        exact="true"
        to={to}
        className={`${
          match ? "text-yellow-500 hover:text-gray-500" : "hover:text-gray-900"
        } p-1 block text-gray-400 hover:bg-yellow-500`}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

export default Sidebar;
