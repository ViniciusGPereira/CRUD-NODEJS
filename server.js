const express = require('express')
const app = express()

// Iniciando servidor na porta 3000
app.listen(3000, function(){
    console.log('server running on port 3000')
});

// Resposta ao navegador após solicitação GET ao servidor
app.get('/', (req, res) => {
    //Teste de funcionamento do metodo GET
    //res.send('Hello Word')

    //Pagina a ser renderizada pelo navegador
    res.render('index.ejs')

});

//Utilização do template engine EJS (Embedded Javascript)
//Configuração da View Engine no Express
app.set('view engine', 'ejs')

