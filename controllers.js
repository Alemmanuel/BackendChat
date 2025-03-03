const Message = require("./messageModel");
const OpenAI = require("openai");

// Initialize OpenAI with DeepSeek configuration
const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY, // Make sure to set this environment variable
});

// Function to translate text using DeepSeek API
async function translateText(text, targetLang = "en") {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant that translates Spanish to English." },
        { role: "user", content: `Translate the following Spanish text to English: "${text}"` },
      ],
      model: "deepseek-chat",
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in DeepSeek translation:", error);
    return text; // Return original text if translation fails
  }
}

// Controller to get all messages
exports.obtenerMensajes = (req, res) => {
  Message.getAll((err, results) => {
    if (err) {
      console.error("Error al obtener mensajes:", err);
      return res.status(500).json({ error: "Error al obtener mensajes" });
    }
    res.json(results);
  });
}

// Controller to send a new message and translate it
exports.enviarMensaje = async (req, res) => {
  const { usuario, mensaje } = req.body;
  if (!usuario || !mensaje) {
    return res.status(400).json({ error: 'Se requieren "usuario" y "mensaje"' });
  }

  try {
    // Translate the message to English
    const mensajeTraducido = await translateText(mensaje);
    console.log(`Mensaje original: "${mensaje}"`);
    console.log(`Mensaje traducido: "${mensajeTraducido}"`);

    // Save the original message in the database
    Message.create(usuario, mensaje, (err, result) => {
      if (err) {
        console.error("Error al enviar mensaje:", err);
        return res.status(500).json({ error: "Error al enviar mensaje" });
      }
      // Send the response with the translation
      res.json({
        status: "Mensaje guardado",
        id: result.insertId,
        mensaje_traducido: mensajeTraducido,
      });
    });
  } catch (error) {
    console.error("Error en enviarMensaje:", error);
    res.status(500).json({ error: "Error al procesar el mensaje" });
  }
}

