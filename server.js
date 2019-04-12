const express = require('express')
const app = express()

// Iniciando servidor na porta 3000
app.listen(3000, function(){
    console.log('server running on port 3000')
});

// Resposta ao navegador após solicitação GET ao servidor
app.get('/', (req, res) => {
    res.send('Hello Word')
});