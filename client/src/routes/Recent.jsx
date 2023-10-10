import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

export const Recent = () => {
  const consultas = [
    {
      id: 1,
      filename: "sql_pastelesPeterPan.txt",
      nombre: "03/10/2023",
      usuario: "emmllanitos",
    },
    {
      id: 2,
      filename: "sql_Comfamiliar.txt",
      nombre: "20/09/2023",
      usuario: "emmllanitos",
    },
    {
      id: 3,
      filename: "consultas_sql_fet.txt",
      nombre: "013/10/2023",
      usuario: "emmllanitos",
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
        <h1>Documentos Recientes</h1>
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ marginTop: 60 }}
        >
          <Form>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre archivo</th>
                  <th>Usuario</th>
                  <th>Fecha creacion</th>
                  <th>Ver</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((consulta) => (
                  <tr key={consulta.id}>
                    <td>{consulta.id}</td>
                    <td>{consulta.filename}</td>
                    <td>{consulta.usuario}</td>
                    <td>{consulta.nombre}</td>
                    <td>
                      <Button variant="secondary" onClick={handleDescargar}>
                        Descargar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </div>
      </div>
    </Container>
  );
};
