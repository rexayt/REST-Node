const DB = require('./bd')
const errors = require('./errors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

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
        .then(resposta => res.send(JSON.stringify(resposta)))
        .catch(err => res.send(errors.ultimateErrorSolver(object, DB.getBanco, err)))   // Caso dê erro, ele retorna uma string para o client
                                                                                        // In case of error, it will be returned a string to the cliente
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
                .then(res.send.resp)
                .catch(err => errors.ultimateErrorSolver(object, DB.insertBanco, err, res))     // Caso dê erro, ele retorna uma string para o client
                                                                                                // In case of error, it will be returned a string to the cliente
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
            .updateBanco(object.tabela, object.where, object.update)
            .then(response => res.send(`${response} linhas foram modificadas`))
            .catch(err => errors.ultimateErrorSolver(object, DB.updateBanco, err, res))     // Caso dê erro, ele retorna uma string para o client
                                                                                            // In case of error, it will be returned a string to the cliente
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
                .deleteBanco(object.tabela, object.where)
                .then(response => res.send(`${response} linhas foram deletadas`))
                .catch(res.send(errors.ultimateErrorSolver(object, DB.deleteBanco, err, res)))  // Caso dê erro, ele retorna uma string para o client
                                                                                                // In case of error, it will be returned a string to the cliente
    } catch (err) {
        res.send(`Erro em transformar o JSON favor verificar, mensagem do erro: "${err.message}"`)
    }

})

app.listen(port, () => {})