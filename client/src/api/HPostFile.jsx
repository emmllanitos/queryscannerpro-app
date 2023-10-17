export const HFile = async (data) => {
  const currentDate = new Date().toLocaleDateString();

  const formData = new FormData();

  if (data.filename && data.content && data.user) {
    formData.append("filename", data.filename);
    formData.append("content", data.content);
    formData.append("user", data.user);
    formData.append("date", currentDate);

    try {
      const response = await fetch("http://127.0.0.1:8080/qsp/api/file/", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      let val = null;
      let salida = null;

      if (responseData.status === "success") {
        salida = "";
        val = true;
      } else {
        console.error("Algo fallo al enviar el archivo");
        salida = "Algo fallo al enviar el archivo";
        val = false;
      }

      return { salida: salida, val: val };
    } catch (error) {
      console.error("Error del servidor:", error);
      const salida = "Error del servidor";
      const val = false;
      return { salida: salida, val: val };
    }
  } else {
    console.error("El archivo procesado está vacío o incompleto.");
  }
};
