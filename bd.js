const knex = require('knex')({
    client: 'mssql',
    connection: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        server: process.env.SERVER,
        port: parseInt(process.env.PORT),
        database: process.env.DATABASE,
        requestTimeout: 30000,
        options: {
            encrypt: true
        }
    }
})

const insertBanco = async (tabela, objeto) => {
    resposta = await knex(tabela).insert(objeto)
    await knex.destroy()
    return resposta
}

const getBanco = async (tabela, select = '*', where = null) => {
    let resposta = []
    if (where == null){
        resposta = await knex.select(select).from(tabela)
    }else{
        resposta = await knex.select(select).from(tabela).where()
    }
    
    await knex.destroy()

    return resposta
}

module.exports = {getBanco, insertBanco}
