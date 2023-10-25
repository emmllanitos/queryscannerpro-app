import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import QSPLogo from "../images/QSP_0.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { HFile } from "../api/HPostFile";
import { resultIdData } from "../api/RGetData";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { PDFDocument } from "../pdf/PdfFile";

export const Home = () => {
  const [data, setData] = useState({
    filename: "",
    content: "",
    user: "",
  });

  useEffect(() => {}, [data]);

  const handleFileChange = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        const text = reader.result;
        resolve(text);
      };

      reader.onerror = () => {
        reject(reader.error);
      };
    });
  };

  const handleArchivoChange = async (e) => {
    const archivoSeleccionado = e.target.files[0];
    if (!archivoSeleccionado) {
      setData((prevData) => ({
        ...prevData,
        filename: "",
        content: "",
      }));

      return;
    }
    const nombreArchivo = archivoSeleccionado.name;
    try {
      const contentFile = await handleFileChange(archivoSeleccionado);

      setData((prevData) => ({
        ...prevData,
        filename: nombreArchivo,
        content: contentFile,
      }));
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  };

  const handleUserChange = (e) => {
    const nuevoNombre = e.target.value;
    setData((prevData) => ({
      ...prevData,
      user: nuevoNombre,
    }));
  };

  const [salida, setSalida] = useState("Nada");
  useEffect(() => {}, [salida]);
  const [val, setVal] = useState(false);
  useEffect(() => {}, [val]);
  const [jsonDataTable, setJsonDataTable] = useState({
    id: "",
    filename: "",
    result: {
      table: [
        {
          id: "Sin datos",
          query: "Sin datos",
          tables: "Sin datos",
        },
      ],
    },
    user: "",
    date: "",
  });
  const [valJDT, setValJDT] = useState(false);

  const handleDataTable = async (id) => {
    const resultTable = await resultIdData(id);
    setJsonDataTable(resultTable.data);
    setValJDT(resultTable.val);
  };

  useState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.filename || !data.user) {
      alert("Debe llenar los campos antes de enviarlos");
      return;
    }

    try {
      const result = await HFile(data);
      setSalida(result.salida);
      setVal(result.val);

      handleDataTable(result.query_id);

      setData({
        filename: "",
        content: "",
        user: "",
      });

      e.target.reset();
    } catch (error) {
      console.error("error", error);
    }
  };

  const tablesData = jsonDataTable.result.table;

  function removeExtension(filename) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return filename;
    }
    return filename.substring(0, lastDotIndex);
  }

  const filenameWithoutExtension =
    "QSP " + removeExtension(jsonDataTable.filename);

  return (
    <Container>
      <div className="text-center my-5">
        <Image src={QSPLogo} width="150" height="150" />
        <h1>Bienvenidos a Query Scanner Pro</h1>
        <p>Descubre tus datos con precisión y rapidez.</p>

        <h3 style={{ marginTop: 80 }}>Ingrese el archivo a procesar</h3>
        <div className="d-flex justify-content-center align-items-center ">
          <Form bg="dark" onSubmit={handleSubmit} style={{ marginTop: 40 }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="file" onChange={handleArchivoChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre del usuario:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe tu Usuario"
                onChange={handleUserChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>

        {valJDT && valJDT === true ? (
          <div>
            <h3 style={{ marginTop: 80 }}>Respuesta</h3>
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ marginTop: 20 }}
            >
              <Form>
                <p>
                  Luego de procesar su archivo contiene {tablesData.length}{" "}
                  consultas y estas son las tablas que usa:
                </p>
                <Table striped bordered variant="dark">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Consulta</th>
                      <th>Tablas utilizadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablesData.map((salida) => (
                      <tr key={salida.id}>
                        <td>{salida.id}</td>
                        <td>{salida.query}</td>
                        <td>{salida.tables}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p>¿Desea descargar el resultado?</p>
                <PDFDownloadLink
                  document={<PDFDocument data={jsonDataTable} />}
                  fileName={filenameWithoutExtension}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button variant="primary">Cargando documento...</Button>
                    ) : (
                      <Button variant="primary">
                        Pulse aquí para descargar
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              </Form>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};
