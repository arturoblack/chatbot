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
app.get("/privacidad", function (req, res) {
    res.send("<html><body>politica de privacidad</body></html>");
 });
// Validacion con facebook
app.get("/webhook", function (req, res) {
    // Verificar la coincidendia del token
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        // Mensaje de exito y envio del token requerido
        console.log("webhook verificado!");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        // Mensaje de fallo
        console.error("La verificacion ha fallado, porque los tokens no coinciden");
        res.sendStatus(403);
    }
 });
 
// Todos eventos de mesenger sera apturados por esta ruta
app.post("/webhook", function (req, res) {
    // Verificar si el vento proviene del pagina asociada
    if (req.body.object == "page") {
        // Si existe multiples entradas entraas
        req.body.entry.forEach(function(entry) {
            // Iterara todos lo eventos capturados
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    process_event(event);
                }
            });
        });
        res.sendStatus(200);
    }
 });

 // Funcion donde se procesa el evento
function process_event(event){
    // Capturamos los datos del que genera el evento y el mensaje
    var senderID = event.sender.id;
    var message = event.message;
   
    // Si en el evento existe un mensaje de tipo texto
    if(message.text){
        // Crear un payload para un simple mensaje de texto
        console.log('=========MENSAJE DE ============')
        console.log('Mensaje de ' + senderID);
        console.log('mensaje: ' + message.text);
    }
   
    // Enviamos el mensaje mediante SendAPI
    //enviar_texto(senderID, response);
 }
 


 
app.listen(process.env.PORT || 3000, () => console.log('conectado'));
// EAA9TEaMGrbsBAJMXDt0CEE8d2pv9t1fHNy8XrMMuvuQVVncnV7QYh86Uw0lQZBzWU08HdlYnyBOcXvQoBQXIZCE9kDbmCjgjhrpjDZAGBTb8uFiv6nxQIopt0k3d3ZCZBpNrzH7yuiHEPQZANdKdkFGngtXSL3z6x9GYIrki5goAZDZD
// mysupersecretpassword
//
// https://pure-ocean-03880.herokuapp.com/webhook