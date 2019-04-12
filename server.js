//BASEADO NO ARTIGO:
//https://medium.com/baixada-nerd/criando-um-crud-completo-com-nodejs-express-e-mongodb-parte-3-3-b243d14a403c

const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const uri = "mongodb+srv://admin:zGkpXvaWbAubBcfH@cluster-crudnodejs-dxxb9.mongodb.net/test?retryWrites=true";

var ObjectId = require('mongodb').ObjectId;
MongoClient.connect(uri, (err, client) => {
        //Caso retorne algum erro mostra o erro no console
    if(err) return console.log(err)
    db = client.db('Cluster-CRUDNODEJS')

        //Iniciando servidor na porta 3000
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

    /*
    Iniciando a utilização do middleware Body Parser
    Para trabalhar com a leitura dos dados do elemento <form> enviado
    O comando urlencoded dentro do body parser diz ao mesmo para extrair dados do elemento <form>
    E adicinar-los a propriedade BODY no objeto REQUEST
    */
app.use(bodyParser.urlencoded({extended: true}))

    /*
    Utilização do template engine EJS (Embedded Javascript)
    Configuração da View Engine no Express
    */
app.set('view engine', 'ejs')

// Resposta ao navegador após solicitação GET ao servidor
app.get('/', (req, res) => {
        //Teste de funcionamento do metodo GET
        //res.send('Hello Word')
        
        //Pagina a ser renderizada pelo navegador
    res.render('index.ejs')

});

app.get('/', (req, res) => {
    /*
    CURSOR é um objeto MongoDB, nele estão contidas todas as citações do DB
    Obtendo conteudo do DB via método find() disponivel em collection
    */
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    //O método toArray recebe uma função callback que nos permite fazer algumas coisas com os objetos que recuperamos do mLab.
    db.collection('data').find().toArray((err, results) => {
        if(err) return console.log(err)
        //Renderiza pagina show.ejs passando os resultados contidos em data
        res.render('show.ejs', {data:results})
    })
})

/*
Processando solicitação POST 
Enviada pelo formulário via action para /show
*/
app.post('/show', (req, res) => {
        /*
        Exibição das propriedades contidas no body, pelo console
        console.log(req.body)

        Cria uma coleção com nome data
        Uma coleção é um local nomeado para armazenar objetos
        Neste caso irei utilizar os objetos contidos no body que foram enviados via <form>
        */
        db.collection('data').save(req.body, (err, result) =>{
        if (err) return console.log(err)

        console.log('Salvo no BD')
        res.redirect('/show')           
    })    
});

/*
Indicando qual rota ira escutar
E aplicando funções
*/
app.route('/edit/:id')
.get((req, res) => {
    //Obtem ID
    var id = req.params.id

    //Busca com id pelo objeto no BD
    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        //Passa os dados obtidos a pagina edit.ejs
        res.render('edit.ejs', {data: result})
    })
})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    //Utilizando metodo updateOne e passando ID com nome e sobrenome
    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if(err) return res.send(err)

        res.redirect('/show')
        console.log('BD Atualizado com Sucesso!')
    })
})