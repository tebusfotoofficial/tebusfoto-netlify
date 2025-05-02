const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Metode tidak didukung' })
    };
  }

  try {
    const newAgenda = JSON.parse(event.body);
    const filePath = path.join(__dirname, '..', '..', 'agenda.json');
    const data = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath))
      : [];

    data.push(newAgenda);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Agenda berhasil disimpan' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Terjadi kesalahan saat menyimpan data', error: error.message })
    };
  }
};
