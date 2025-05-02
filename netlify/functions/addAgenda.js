// netlify/functions/addAgenda.js

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);

  console.log("Data diterima:", data);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data diterima", data }),
  };
};
