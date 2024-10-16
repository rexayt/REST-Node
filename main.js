const bancoDeDados = require('./bd')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/:query',async (req, res) => {
    let objeto = JSON.parse(req.params.query) // Deve receber um JSON {"tabela":tabela <- Obrigatório, "select": {"coluna"...},"where":{"coluna":"valor"...}}
    let resp = await bancoDeDados
        .getBanco(objeto.tabela, objeto?.select || '*', objeto?.where || null)
        .then(resposta => resposta)

    res.send(JSON.stringify(resp))
})


app.post('/:post', async (req, res) => {
    let post = JSON.parse(req.params.post) // Deve receber um Json {"tabela": tabela, "insert":{"coluna","valor"...}}
    console.log(post)
    let resp = await bancoDeDados.insertBanco(post.tabela, post.insert)

    res.send(resp)
})

app.listen(port, () => {})