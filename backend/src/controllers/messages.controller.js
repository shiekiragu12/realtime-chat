const { Message } = require('../models');

exports.createMessage = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    const message = await Message.create({ full_name, email, phone, password });

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);

    if (!message) return res.status(404).json({ error: 'Message not found' });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone } = req.body;

    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    await message.update({ full_name, email, phone });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    await message.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
