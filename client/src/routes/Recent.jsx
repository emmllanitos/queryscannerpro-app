import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { resultRData } from "../api/RData";

export const Recent = () => {
  const [data, setData] = useState([]);

  const handleData = async () => {
    const responseData = await resultRData();
    setData(responseData);
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleDescargar = () => {
    // Lógica para descargar el resultado
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
                {data.map((salida) => (
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
        <div className="d-flex justify-content-center my-3">
          <Button variant="primary" onClick={handleData}>
            Actualizar Consulta
          </Button>
        </div>
      </div>
    </Container>
  );
};
