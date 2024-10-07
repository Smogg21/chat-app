const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

connectDB();


app.use(cors());
app.use(bodyParser.json());


const messageRoutes = require('./routes/messages');
app.use('/api/messages', messageRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
