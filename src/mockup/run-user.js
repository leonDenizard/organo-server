const fs = require("fs");
const axios = require("axios");

async function sendPayloads() {
  const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));

  for (const [index, payload] of data.entries()) {
    try {
      const res = await axios.post("http://localhost:3000/api/user", payload);
      console.log(`✅ Registro ${index + 1} enviado:`, res.status);
    } catch (err) {
      console.error(`❌ Erro no registro ${index + 1}:`, err.message);
    }
  }
}

sendPayloads();