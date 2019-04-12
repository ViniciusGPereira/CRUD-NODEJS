const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const uri = "mongodb+srv://admin:zGkpXvaWbAubBcfH@cluster-crudnodejs-dxxb9.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri, (err, client) => {
    //Caso retorne algum erro mostra o erro no console
    if(err) return console.log(err)
    db = client.db('Cluster-CRUDNODEJS')

    //Iniciando servidor na porta 3000
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})


//Iniciando a utilização do middleware Body Parser
//Para trabalhar com a leitura dos dados do elemento <form> enviado
//O comando urlencoded dentro do body parser diz ao mesmo para extrair dados do elemento <form>
// E adicinar-los a propriedade BODY no objeto REQUEST
app.use(bodyParser.urlencoded({extended: true}))

// Resposta ao navegador após solicitação GET ao servidor
app.get('/', (req, res) => {
    //Teste de funcionamento do metodo GET
    //res.send('Hello Word')

    //Obtendo conteudo do DB via método find() disponivel em collection
    //CURSOR é um objeto MongoDB, nele estão contidas todas as citações do DB
    let cursor = db.collection('data').find()
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
    //console.log(req.body)

    //Cria uma coleção com nome data
    //Uma coleção é um local nomeado para armazenar objetos
    //Neste caso irei utilizar os objetos contidos no body que foram enviados via <form>
    db.collection('data').save(req.body, (err, result) =>{
        if (err) return console.log(err)

        console.log('Salvo no BD')
        res.redirect('/')
        //O método toArray recebe uma função callback que nos permite fazer algumas coisas com os objetos que recuperamos do mLab.
        db.collection('data').find().toArray((err, results) => {
            //Nessa aplicação estamos exibindo todos os registros do DB no console
            console.log(results)
        })
    })    
});