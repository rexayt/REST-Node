const ultimateErrorSolver = async (object, funcao, error = null,res, tentativas = 1) => {
    let resposta = 'O servidor obteve um erro inesperado'
    if (error.code === 'ETIMEOUT') {
        console.log(error.number)
        if (tentativas === 4) {
            return 'O banco de dados demorou muito para responder, tente novamente.'
        }

        resposta = await funcao(object).catch(err => ultimateErrorSolver(object, funcao, err, ++tentativas))
    } 

    else if (error.message.includes('The query is empty')) {
        resposta = `A query do objeto JSON está vazia`
    }

    else if (error.number === 208) {
        resposta =  `A tabela, ${object.tabela} não existe.`
    } 

    else if (error.number === 207 || error?.errors[0]?.number === 207) {
        if (error.errors) {
            let arrayOfErrors = error.errors.map(e => e.message)
            let columns = arrayOfErrors.map(e => e
                                            .substring(
                                                e.indexOf("'") + 1, 
                                                e.lastIndexOf("'"))
                                            )

            resposta = `As colunas "${columns}" não existem`
        }
        else {

            let errorMessage = error.message
            let column = errorMessage
                        .substring( 
                            errorMessage.indexOf("'") + 1,
                            errorMessage.lastIndexOf("'")
                        )
            resposta = `A coluna "${column}" não existe`   
        }
        
    }
    

    res.send(resposta)
}

module.exports = {ultimateErrorSolver}