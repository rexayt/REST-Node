const bancoDeDados = require('./bd')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/:tabela',async (req, res) => {
    let tabela = req.params.tabela
    let resp = await bancoDeDados.getBanco(tabela).then(resposta => resposta)
    res.send(JSON.stringify(resp))
})


app.post('/:tabela', async (req, res) => {
    let tabela = req.params.tabela
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})