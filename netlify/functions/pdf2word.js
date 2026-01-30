const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const apiKey = process.env.ILOVEPDF_API_KEY_WORD;
    if (!apiKey) throw new Error("API key missing");

    // For file upload from browser
    const form = new FormData();
    form.append("file", Buffer.from(event.body, "base64"), "file.pdf");

    const res = await fetch("https://api.ilovepdf.com/v1/pdf-to-word", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ downloadUrl: data.file.url })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
