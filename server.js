const express = require('express');
const cors = require('cors')
 
 
const app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
 
// Ruta de la pagina index
app.get("/", function (req, res) {
   res.send("El Chatbot esta  vivo!!!");
});
 
app.listen(process.env.PORT || 3000, () => console.log('conectado'));
