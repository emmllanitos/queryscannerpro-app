import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { resultRData } from "../api/RGetData";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "../pdf/PdfFile";

export const Recent = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  function removeExtension(filename) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return filename;
    }
    return filename.substring(0, lastDotIndex);
  }

  const handleData = async () => {
    const result = await resultRData();

    const data = result.data;

    const formattedExtension = data.map((item) => {
      return {
        ...item,
        filename2: "QSP " + removeExtension(item.filename),
      };
    });

    setData(formattedExtension);
    setVal(result.val);
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleDataAndResetRow = () => {
    handleData();
    setSelectedRow(null);
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
              <Table striped bordered hover variant="dark" size="sm">
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
                  {data.map((salida, index) => (
                    <tr key={salida.id}>
                      <td>{salida.id}</td>
                      <td>{salida.filename}</td>
                      <td>{salida.user}</td>
                      <td>{salida.date}</td>
                      <td>
                        {selectedRow === index ? (
                          <PDFDownloadLink
                            document={<PDFDocument data={salida} />}
                            fileName={salida.filename2}
                          >
                            {({ loading }) =>
                              loading ? (
                                <Button variant="primary">
                                  Renderizando...
                                </Button>
                              ) : (
                                <Button variant="primary">Descargar</Button>
                              )
                            }
                          </PDFDownloadLink>
                        ) : (
                          <Button
                            variant="secondary"
                            onClick={() => setSelectedRow(index)}
                          >
                            Mostrar PDF
                          </Button>
                        )}
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
          <Button variant="primary" onClick={() => handleDataAndResetRow()}>
            Actualizar
          </Button>
        </div>
      </div>
    </Container>
  );
};
