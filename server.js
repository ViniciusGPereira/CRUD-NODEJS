const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Iniciando a utilização do middleware Body Parser
//Para trabalhar com a leitura dos dados do elemento <form> enviado
//O comando urlencoded dentro do body parser diz ao mesmo para extrair dados do elemento <form>
// E adicinar-los a propriedade BODY no objeto REQUEST
app.use(bodyParser.urlencoded({extended: true}))

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

//Processando solicitação POST 
//Enviada pelo formulário via action para /show
app.post('/show', (req, res) => {
    //Exibição das propriedades contidas no body, pelo console
    console.log(req.body)
});