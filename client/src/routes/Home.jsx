import { useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import QSPLogo from "../images/QSP_0.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export const Home = () => {
  const [archivo, setArchivo] = useState(null);
  const [nombre, setNombre] = useState("");

  const handleArchivoChange = (event) => {
    // Manejar el cambio del archivo aquí
    const archivoSeleccionado = event.target.files[0];
    setArchivo(archivoSeleccionado);
  };

  const handleNombreChange = (event) => {
    // Manejar el cambio del nombre aquí
    const nuevoNombre = event.target.value;
    setNombre(nuevoNombre);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones
    console.log("Archivo seleccionado:", archivo);
    console.log("Nombre:", nombre);
  };

  const consultas = [
    { id: 1, consulta: "Select 1 from dual;", tablas: "dual" },
    {
      id: 2,
      consulta: "Select * from mcuentas.cta_cuenta;",
      tablas: "mcuentas.cta_cuenta",
    },
    {
      id: 3,
      consulta:
        "select s.*, m.* from mcuentas.cta_cuenta cc inner join mcuentas.cta_afiliado ca on cc.id = ca.id;",
      tablas: "mcuentas.cta_cuenta, mcuentas.cta_afiliado",
    },
  ];

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
                value={nombre}
                onChange={handleNombreChange}
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
              Luego de procesar su archivo contiene {consultas.length} consultas
              y estas son las tablas que usa:
            </p>
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
