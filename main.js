const DB = require('./bd')
const errors = require('./errors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))



app.post('/django/:coiso', async (req, res) => {
    let object = req.params.coiso
    try {
        object = JSON.parse(object)
        await DB
            .getUser(object)
            .then(response => res.send(JSON.stringify(response)))
            .catch(err => res.send(errors.ultimateErrorSolver(object, DB.getUser(object, DB.getUser, err, res))))
    }
    catch (err) {
        res.send(`Erro em transformar o JSON favor verificar, mensagem do erro: "${err.message}"`)
    } 
})

app.get('/:query',async (req, res) => {
    let object = req.params.query   // Deve receber um JSON {"tabela":tabela <- Obrigatório, "select": {"coluna"...},"where":{"coluna":"valor"...}}
                                    // Must receive an JSON {"tabela":tabela <- required, "select": {"coluna"...},"where":{"coluna":"valor"...}}
    
    // Tentativa de transformar o JSON em objeto
    // Attempt of transformation a JSON into an Object
    try {
        object = JSON.parse(object)

        // Faz uma consulta com o banco de dados
        // Makes a query inside of the database
        await DB
            .getBanco(object)
            .then(response => res.send(JSON.stringify(response)))
            .catch(err => res.send(errors.ultimateErrorSolver(object, DB.getBanco, err, res)))   // Caso dê erro, ele retorna uma string para o cliente
                                                                                            // In case of error, it will be returned a string to the client
    } 
    catch (err) {
        res.send(`Erro em transformar o JSON favor verificar, mensagem do erro: "${err.message}"`)
    } 


})


app.post('/:post', async (req, res) => {
    let object = req.params.post    // Deve receber um Json {"tabela": tabela, "insert":{"coluna","valor"...}}
                                    // Must receive an JSON {"tabela": tabela, "insert":{"coluna","valor"...}}

    // Tentativa de transformar o JSON em objeto
    // Attempt of transformation a JSON into an Object
    try {
        object = JSON.parse(object)
        
        
        await DB
                .insertBanco(object)
                .then(response => res.send(JSON.stringify(response)))
                .catch(err => res.send(errors.ultimateErrorSolver(object, DB.insertBanco, err, res)))     // Caso dê erro, ele retorna uma string para o cliente
                                                                                                // In case of error, it will be returned a string to the client
    }
    catch (err) {
        res.send(`Erro em transformar o JSON favor verificar, mensagem do erro: "${err.message}"`)
    }

})

// Função usada para atualizar alguma coluna dentro do banco de dados
// Function used to update some column on the database
app.patch('/:update',async (req, res) => {
    let object = req.params.update

    // Tentativa de transformar o JSON em objeto
    // Attempt of transformation a JSON into an Object
    try {
        object = JSON.parse(object)


        await DB
            .updateBanco(object)
            .then(response => res.send(`${response} linhas foram modificadas`))
            .catch(err => res.send(errors.ultimateErrorSolver(object, DB.updateBanco, err, res)))     // Caso dê erro, ele retorna uma string para o cliente
                                                                                            // In case of error, it will be returned a string to the client
    } 
    catch (err) {
        res.send(`Erro em transformar o JSON favor verificar, mensagem do erro: "${err.message}"`)
    }

    
})

// Função usada para deletar alguma linha do banco de dados
// Function used to delete some row on the data base
app.delete('/:delete', async(req, res) => {
    let object = req.params.delete


    // Tentativa de transformar o JSON em objeto
    // Attempt of transformation a JSON into an Object
    try {
        object = JSON.parse(object)

        await DB
                .deleteBanco(object)
                .then(response => res.send(`${response} linhas foram deletadas`))
                .catch(err => res.send(errors.ultimateErrorSolver(object, DB.deleteBanco, err, res)))  // Caso dê erro, ele retorna uma string para o cliente
                                                                                                // In case of error, it will be returned a string to the client
    } catch (err) {
        res.send(`Erro em transformar o JSON favor verificar, mensagem do erro: "${err.message}"`)
    }

})

app.listen(port, () => {
    console.log('Ouvindo')
})