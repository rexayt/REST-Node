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

const insertBanco = async (tabela, objeto) => {
    console.log(objeto)
    resposta = await knex(tabela)
        .insert(objeto)
        .then(() => `Registro ${JSON.stringify(objeto)} adicionado à Tabela: ${tabela}`)
        .catch(err => `${err}`)
        
    await knex.destroy()
    return resposta
}

const getBanco = async (tabela, select = '*', where = null) => {
    let resposta = where === null ? 
        await knex(tabela).select(select)
        :await knex(tabela).from(tabela).select(select).where(where)

    await knex.destroy()

    return resposta
}

module.exports = {getBanco, insertBanco}