import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { resultRData } from "../api/RData";

export const Recent = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState(true);

  const handleData = async () => {
    const result = await resultRData();
    setData(result.data);
    setVal(result.val);
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
            {data && data.length > 0 && val === true ? (
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
            ) : data && data.length === 0 && val === true ? (
              <p>No se han registrado archivos aún.</p>
            ) : (
              <p>{data}</p>
            )}
          </Form>
        </div>
        <div className="d-flex justify-content-center my-3">
          <Button variant="primary" onClick={handleData}>
            Actualizar
          </Button>
        </div>
      </div>
    </Container>
  );
};
