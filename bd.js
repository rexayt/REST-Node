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
    await knex(tabela).insert(objeto)
    await knex.destroy().then(console.log('Processo finalizado'))
    
}

const getBanco = async (tabela, select = '*', where = null) => {
    if (where == null){
        await knex.select(select).from(tabela).then(console.log)
    }else{
        await knex.select(select).from(tabela).where().then(console.log)
    }
    

    await knex.destroy().then(console.log('Processo finalizado'))
}

module.exports = {getBanco, insertBanco}

getBanco('Teste')