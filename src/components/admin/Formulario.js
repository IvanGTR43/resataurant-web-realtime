import React from "react";
import FileUploader from "react-firebase-file-uploader";

const Formulario = (props) => {
  const {
    formik,
    firebase,
    handleProgress,
    handleUploadError,
    handleUploadStart,
    handleUploadSuccess,
    uploading,
    progress,
    urlImage,
  } = props;
  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre:{" "}
          </label>
          <input
            className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            placeholder="Nombre Platillo"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.nombre && formik.errors.nombre ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{formik.errors.nombre}</p>
          </div>
        ) : null}

        <div className="mb4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="precio"
          >
            Precio:{" "}
          </label>
          <input
            className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="precio"
            placeholder="$ 20"
            type="number"
            min="0"
            onChange={formik.handleChange}
            value={formik.values.precio}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.precio && formik.errors.precio ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{formik.errors.precio}</p>
          </div>
        ) : null}

        <div className="mb4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoria"
          >
            Categoria:{" "}
          </label>
          <select
            className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoria"
            name="categoria"
            onChange={formik.handleChange}
            value={formik.values.categoria}
            onBlur={formik.handleBlur}
          >
            <option value="">----Seleccione----</option>
            <option value="desayuno">Desayuno</option>
            <option value="comida">Comida</option>
            <option value="cena">Cna</option>
            <option value="bebida">Bebida</option>
            <option value="postre">Postre</option>
            <option value="ensalada">Ensalada</option>
          </select>
        </div>
        {formik.touched.categoria && formik.errors.categoria ? (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{formik.errors.categoria}</p>
          </div>
        ) : null}

        <div className="mb4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoria"
          >
            Imagen:{" "}
          </label>
          <FileUploader
            accept="image/*"
            id="imagen"
            name="imagen"
            randomizeFilename
            storageRef={firebase.storage.ref("productos")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
          {uploading && (
            <div className="h-12 w-full border relative">
              <div
                className="bg-green-500 absolute left-0 top-0 to-white px-2 text-sm h-12 flex items-center"
                style={{ width: `${progress}%` }}
              >
                {progress} %
              </div>
            </div>
          )}
          {urlImage && (
            <p className="bg-green-500 to-white p-3 text-center my-5">
              La imagen se subio Correctamente
            </p>
          )}
        </div>
        <div className="mb4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="descripcion"
          >
            Descripcion:{" "}
          </label>
          <textarea
            className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            id="descripcion"
            placeholder="Descripción del Platillo"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.descripcion && formik.errors.descripcion ? (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{formik.errors.descripcion}</p>
            </div>
          ) : null}
        </div>
        <input
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
          value="Agregar Platillo"
        />
      </form>
    </div>
  );
};

export default Formulario;
