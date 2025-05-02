const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  const filePath = path.join(__dirname, '../../public/agenda.json');

  try {
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      existingData = JSON.parse(content);
    }

    existingData.push(data);

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data berhasil disimpan!' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gagal menyimpan data' })
    };
  }
};
