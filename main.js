const bancoDeDados = require('./bd')
const express = require('express')
const app = express()
const port = 3000

bancoDeDados.getBanco('Teste')