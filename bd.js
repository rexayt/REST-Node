const { json } = require('express')
const md5 = require('md5')
const knex = require('knex')({
    client: 'mssql',
    connection: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        server: process.env.SERVER,
        port: parseInt(process.env.PORTA),
        database: process.env.DATABASE,
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
    let resposta = ''

    if (table.toLowerCase() !== 'user'){
        resposta = where === null ? 
            await knex(table).select(select).limit(limite)
            :await knex(table).select(select).where(where).limit(limite)
    }
    else{
        const senha = object.senha
        if (senha === undefined) {
            return `A senha precisa ser adicionada à consulta, exemplo {tabela: User , where: { username: usuario }, senha: senha}`
        }
        resposta = await knex(table).select(['username','senha']).where(where).limit(1).then(query => {
            if (senha === query[0].senha) {
                return {status: 1} 
            }
            else {
                return {status: 0} 
            }
        })
    }
    return resposta
}


const insertBanco = async (object) => {
    const table = object.tabela
    const insert = object.insert
    if (table === 'User' || table === 'user') {
        insert.senha = md5(insert.senha)
    }

    let resposta = await knex(table)
        .insert(insert)
        .then(() => `A sua solicitação ${JSON.stringify(insert)} foi inserida na tabela: ${table}`)


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