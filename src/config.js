import { Command } from "commander";
import dotenv from "dotenv";

export const PRODUCTS_JASON = './db/products.json';
export const PORT = 8080;
//export const MONGODB_CNX_STR = 'mongodb://127.0.0.1/ecommerce'
export const MONGODB_CNX_STR = 'mongodb+srv://msusanainfo:Susana1831@46soles.tn88qqs.mongodb.net/ecommerse'

export const SESSION_SECRET = 'MySecret'

export const githubAppId = '726396'
export const githubClienteId = 'Iv1.3ed92726cccd28c9'
export const githubClientSecret = '7b86cd670b1e47dcb9e23808e8fb07c2e46f1fd4'
export const githubCallbackUrl = 'http://localhost:8080/githubcallback'
/*
const program = new Command()
program
    .option('-p, --prod', 'entorno de ejecucion', false)
    .parse()
const { prod } = program.opts()

dotenv.config({
    path: prod ? './config/prod.env' : './config/dev.env'
})

export const PORT = process.env.PORT
export const MODE = process.env.MODE
export const CNX_STR = process.env.CNX_STR*/