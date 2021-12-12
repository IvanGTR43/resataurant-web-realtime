import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../firebase";

import { Platillo } from "../components/ui/Platillo";
function Menu() {
  const { firebase } = useContext(FirebaseContext);
  const [platillos, setPlatillos] = useState({});
  useEffect(() => {
    firebase.database.ref("productos").on("value", (snapshot) => {
      console.log(snapshot.val());
      setPlatillos(snapshot.val());
    });
  }, []);
  return (
    <div>
      <h1 className="text-3xl">Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="ml-3 bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercasefont-bold"
      >
        Agregar Platillo
      </Link>
      {Object.entries(platillos).map(([key, platillo]) => {
        console.log(key);
        return <Platillo key={key} idPlatillo={key} platillo={platillo} />;
      })}
    </div>
  );
}

export default Menu;
