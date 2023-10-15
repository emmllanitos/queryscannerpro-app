export const resultRData = async () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const jsonError = [
    {
      id: 1,
      filename: "Sin informacion",
      result: {
        table: [],
      },
      user: "Sin informacion",
      date: "Sin informacion",
    },
  ];

  try {
    const response = await fetch(
      "http://127.0.0.1:8080/queryfile/api/v1/QueryFileRouter/"
    );
    const responseData = await response.json();

    const formattedResponseData = responseData.map((item) => {
      return {
        ...item,
        date: formatDate(item.date),
      };
    });

    return formattedResponseData;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return jsonError;
  }
};
