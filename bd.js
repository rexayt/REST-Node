const fs = require('fs')
criarArquivoNoErro = err => fs.appendFile(__dirname + '/errosLog.txt', `Erro:\n ${err}\r\n\n`, erro => null)

const knex = require('knex')({
    client: 'mssql',
    connection: {
        user: 'greenplusadmin',
        password: '554HLLST@',
        server: 'green-plus-server.database.windows.net',
        port: 1433,
        database: 'Green Plus',
        requestTimeout: 300,
        options: {
            encrypt: true
        }
    }
})

const insert = (tabela, objeto) => {
    knex(tabela).insert(objeto)
    .then(console.log('Finalizado'))
    .catch(err => console.log(err))
}

insert('User', {
    tipo: false, 
    nome: 'Gayzão',
    email: 'Gayzao@gaymail.com',
    cargo: 'Putinha da empresa',
    grupos: 'Sla',
    username: 'Gayzao1234',
    senha: '1234'
})