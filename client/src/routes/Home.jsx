import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import QSPLogo from "../images/QSP_0.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { HFile } from "../api/HPostFile";

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
    setData({
      ...data,
      user: nuevoNombre,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await HFile(data);
      //console.log(response);
      //falta validar respuestas del create y aplicar la logica de django para guardar en la bd
    } catch (error) {
      console.error("error", error);
    }
  };

  const jsonData = {
    id: 1,
    filename: "export_qa_super.dsx",
    result: {
      table: [
        {
          id: 1,
          query: "SELECT * FROM users",
          tables: "users",
        },
        {
          id: 2,
          query: "SELECT * FROM products",
          tables: "products",
        },
        {
          id: 3,
          query: "SELECT * FROM orders",
          tables: "orders",
        },
      ],
    },
    user: "emmllanitos",
    date: "2023-10-10T18:42:57.261461-05:00",
  };

  const tablesData = jsonData.result.table;

  /*const result = fetch('http://127.0.0.1:8080/queryfile/api/v1/QueryFileRouter/1/', {
    method: "GET",
  });
*/
  //const data = result.json();

  // Función para descargar el resultado
  const handleDescargar = () => {
    // Aquí puedes agregar la lógica para descargar el resultado
    alert("Descargando el resultado...");
  };

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
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ marginTop: 100 }}
        >
          <Form>
            <p>
              Luego de procesar su archivo contiene {tablesData.length}{" "}
              consultas y estas son las tablas que usa:
            </p>
            {/*
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Consulta</th>
                  <th>Tablas utilizadas</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((consulta) => (
                  <tr key={consulta.id}>
                    <td>{consulta.id}</td>
                    <td>{consulta.consulta}</td>
                    <td>{consulta.tablas}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            */}
            <Table striped bordered>
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
            <Button variant="primary" onClick={handleDescargar}>
              Pulse aquí para descargar
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};
