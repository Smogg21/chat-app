const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Obtener todos los mensajes
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

// Enviar un nuevo mensaje
router.post('/', async (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const newMessage = new Message({ username, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

module.exports = router;
