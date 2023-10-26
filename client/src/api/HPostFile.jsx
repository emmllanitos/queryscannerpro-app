export const HFile = async (data) => {
  const currentDate = new Date().toLocaleDateString();

  const formData = new FormData();

  if (data.filename && data.content && data.user) {
    formData.append("filename", data.filename);
    formData.append("content", data.content);
    formData.append("user", data.user);
    formData.append("date", currentDate);

    let val = false;
    let salida = null;
    let query_id = null;

    try {
      const response = await fetch("http://127.0.0.1:8080/qsp/api/file/", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.status === "success") {
        val = true;
        query_id = responseData.query_id;
      }

      return { salida: salida, val: val, query_id: query_id };
    } catch (error) {
      console.error("Error del servidor:", error);
      salida = "Error del servidor";
      query_id = 0;
      return { salida: salida, val: val, query_id: query_id };
    }
  } else {
    console.error("El archivo procesado está vacío o incompleto.");
  }
};
