// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Message = require('./models/Message');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://momo_user:momo1234@cm1.nrivuns.mongodb.net/momo?retryWrites=true&w=majority&appName=CM1')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// GET: Retorna mensagens ordenadas pela data mais recente
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ data: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

// POST: Cria nova mensagem
app.post('/messages', async (req, res) => {
  const { author, message } = req.body;

  if (!author || !message) {
    return res.status(400).json({ error: 'Author e message são obrigatórios' });
  }

  try {
    const newMessage = new Message({ author, message });
    const saved = await newMessage.save();
    console.log('Mensagem salva:', saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar a mensagem' });
  }
});

// PUT: incrementa curtidas
app.put('/messages/:id/like', async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Message.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    res.json({ likes: updated.likes });
  } catch (err) {
    console.error('Erro ao dar like:', err);
    res.status(500).json({ error: 'Erro ao curtir a mensagem' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
