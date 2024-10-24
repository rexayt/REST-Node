const knex = require('knex')({
    client: 'mssql',
    connection: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        server: process.env.SERVER,
        port: parseInt(process.env.PORTA),
        database: process.env.DATABASE,
        requestTimeout: 30000,
        options: {
            encrypt: true
        }
    }
})



const getBanco = async (object) => {
    const table = object.tabela
    const select = object.select ? object.select : '*'
    const limite = object.limite ? object.limite : 100
    const where = object.where ? object.where : null

    let resposta = where === null ? 
        await knex(table).select(select).limit(limite)
        :await knex(table).select(select).where(where).limit(limite)

    return resposta
}

const insertBanco = async (object) => {
    const table = object.tabela
    const insert = object.insert

    let resposta = await knex(table)
        .insert(insert, ['ID'])
        .then((id) => `A sua solicitação foi inserida na tabela: ${table}, com o ID: ${id[0].ID}`)

    console.log(resposta)

    return resposta
}

const deleteBanco = async (tabela, where,) => {

    let resposta = await knex(tabela).where(where).del()
    return resposta
}

const updateBanco = async (tabela, where, update) => {
    let resposta = await knex(tabela).where(where).update(update)
    return resposta
}

module.exports = {getBanco, insertBanco, deleteBanco, updateBanco}