import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { FirebaseContext } from "../firebase";

import Formulario from "../components/admin/Formulario";

const NuevoPlatillo = () => {
  //state de las imagenes
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");
  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);
  // hook para redireccionar
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Los Platillos deben tener al menos 3 Caracteres")
        .required("El Nombre es Obligatorio"),
      precio: Yup.number()
        .min(1, "Debes agregar un numero")
        .required("El Precio es Obligatorio"),
      categoria: Yup.string().required("El Categoria es Obligatorio"),
      descripcion: Yup.string()
        .min(10, "La descripcion debe de ser de al menos 10 caracteres")
        .required("La Descricion es Obligatorio"),
    }),
    onSubmit: (datos) => {
      const id = uuidv4().toString();
      datos.existencia = true;
      datos.imagen = urlImage;
      console.log(datos);
      firebase.database
        .ref(`productos/${id}`)
        .set(datos)
        .then(() => {
          console.log("si se pudo");
          navigate("/menu");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  // todo sobre las imagenes
  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };
  const handleUploadError = (err) => {
    setUploading(false);
    console.log(err);
  };
  const handleUploadSuccess = async (nombre) => {
    setProgress(100);
    setUploading(false);
    const url = await firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL();
    setUrlImage(url);
    console.log(url);
  };
  const handleProgress = (progreso) => {
    setProgress(progreso);
    console.log(progreso);
  };

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
      <div>
        <div className="flex justify-center mt-10">
          <Formulario
            formik={formik}
            firebase={firebase}
            handleProgress={handleProgress}
            handleUploadError={handleUploadError}
            handleUploadStart={handleUploadStart}
            handleUploadSuccess={handleUploadSuccess}
            uploading={uploading}
            progress={progress}
            urlImage={urlImage}
          />
        </div>
      </div>
    </div>
  );
};

export default NuevoPlatillo;
