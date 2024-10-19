const bancoDeDados = require('./bd')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/pegarbanco',async (req, res) => {
    let objeto = req.body// Deve receber um JSON {"tabela":tabela <- Obrigatório, "select": {"coluna"...},"where":{"coluna":"valor"...}}
    console.log(req.body)
    let resp = await bancoDeDados
        .getBanco(objeto.tabela, objeto?.select || '*', objeto?.where || null, objeto?.limite)
        .then(resposta => resposta)

    res.send(JSON.stringify(resp))
})


app.post('/insert', async (req, res) => {
    let post = req.body // Deve receber um Json {"tabela": tabela, "insert":{"coluna","valor"...}}
    
    let resp = await bancoDeDados.insertBanco(post.tabela, post.insert)

    res.send(resp)
})

app.patch('/:update',async (req, res) => {
    let update = req.body

    let resp = bancoDeDados.updateBanco(update.tabela, update.where, update.update)

    res.send(`${resp} linhas foram modificadas`)
})

app.delete('/:delete', async(req, res) => {
    let request = req.body
    let resp = await bancoDeDados.deleteBanco(request.tabela, request.where)
    res.send(`${resp} linhas foram deletadas`)
})

app.listen(port)