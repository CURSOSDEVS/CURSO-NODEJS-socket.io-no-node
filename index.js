var express = require("express");
var app = express();

//colocando a aplicação express para rodar dentro do servidor http nativo do node
var http = require("http").createServer(app);

var io = require("socket.io")(http);

//evento de conexão do socket.io
io.on("connection",(clienteBackEnd) => {

    clienteBackEnd.on("disconnect",() => {
        console.log("Cliente X desconectou "+ clienteBackEnd.id);
    })
    
    clienteBackEnd.on("mensagem", (data) => {
        console.log(data);
    })

    clienteBackEnd.on('palavra',(data) => {
        console.log(data);
        clienteBackEnd.emit("resultado", data + " Guia do programador" );
    })
    
})

//configuando a view do projeto para utilizar o ejs
app.set("view engine","ejs");

//criando rota principal que irá renderizar o arquvio index.ejs
app.get("/", (req, res) => {
    res.render('index')
})

http.listen(3000, () => {
    console.log("Servidor rodando");
})

