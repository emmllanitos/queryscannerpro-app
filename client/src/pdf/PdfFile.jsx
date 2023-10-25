import { Page, Text, Document, Image, Font, View } from "@react-pdf/renderer";
import { styles } from "../stylesheets/stylesPDF";
import QSPLogo from "../images/QSP_0.png";

export const PDFDocument = ({ data }) => {
  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  return (
    <Document title="Resultado QSP" author="QSP" pdfVersion="1.0">
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Creado por Query Scanner Pro ~
        </Text>
        <Text style={styles.title}>{data.filename}</Text>
        <Text style={styles.author}>Usuario: {data.user}</Text>
        <Text style={styles.author}>Fecha de Generación: {data.date}</Text>
        <Image style={styles.image} src={QSPLogo} />
        <Text style={styles.subtitle}>Resultados de Consultas SQL</Text>

        {data.result.table.map((item) => (
          <View key={item.id} style={styles.text}>
            <Text>Consulta {item.id}:</Text>
            <Text>Query: {item.query}</Text>
            <Text>Tablas utilizadas: {item.tables}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Gracias por utilizar Query Scanner Pro
        </Text>
        <Text style={styles.contact}>
          Contáctenos en support@queryscannerpro.com
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
