import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

export const Recent = () => {
  const jsonData = [
    {
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
      date: "2023-10-10",
    },
    {
      id: 2,
      filename: "pepe.txt",
      result: {
        table: [
          {
            id: 4,
            query: "SELECT * FROM customers",
            tables: "customers",
          },
          {
            id: 5,
            query: "SELECT * FROM invoices",
            tables: "invoices",
          },
          {
            id: 6,
            query: "SELECT * FROM products",
            tables: "products",
          },
        ],
      },
      user: "elempresario",
      date: "2023-10-10",
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
                {jsonData.map((salida) => (
                  <tr key={salida.id}>
                    <td>{salida.id}</td>
                    <td>{salida.filename}</td>
                    <td>{salida.user}</td>
                    <td>{salida.date}</td>
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
