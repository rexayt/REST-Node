const bancoDeDados = require('./bd')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/:query',async (req, res) => {
    let objeto = JSON.parse(req.params.query) // Deve receber um JSON {"tabela":tabela <- Obrigatório, "select": {"coluna"...},"where":{"coluna":"valor"...}}
    let resp = await bancoDeDados
        .getBanco(objeto.tabela, objeto?.select || '*', objeto?.where || null, objeto?.limite)
        .then(resposta => resposta)

    res.send(JSON.stringify(resp))
})


app.post('/:post', async (req, res) => {
    let post = JSON.parse(req.params.post) // Deve receber um Json {"tabela": tabela, "insert":{"coluna","valor"...}}
    let resp = await bancoDeDados.insertBanco(post.tabela, post.insert)

    res.send(resp)
})

app.patch('/:update',async (req, res) => {
    let update = JSON.parse(req.params.update)

    let resp = bancoDeDados.updateBanco(update.tabela, update.where, update.update)

    res.send(`${resp} linhas foram modificadas`)
})

app.delete('/:delete', async(req, res) => {
    let request = JSON.parse(req.params.delete)
    let resp = await bancoDeDados.deleteBanco(request.tabela, request.where)
    res.send(`${resp} linhas foram deletadas`)
})

app.listen(port, () => {})