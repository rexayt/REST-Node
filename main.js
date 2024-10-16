const bancoDeDados = require('./bd')
const express = require('express')
const app = express()
const port = 3000

app.get('/:tabela',async (req, res) => {
    let tabela = req.params.tabela
    let select = req.body.select || '*'
    let where = req.body.where || null
    let resp = bancoDeDados.getBanco(tabela, select, where).then(resposta => JSON.stringify(resposta))
    res.send(resp)
})


app.post('/:tabela', async (req, res) => {
    let tabela = req.params.tabela
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})