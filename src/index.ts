import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { Routes } from "./routes"
import config from "./configuration/config";
import { AppDataSource } from "./data-source";

// create express app
const app = express()
app.use(bodyParser.json()); //bodyParse serve para converter a informação que vem em JSON para dentro da api

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})

app.listen(config.port, '0.0.0.0', async () => {
    //apos a api ser inicializada precisamos conetcar com o banco
    console.log(`Api Inicialiazada! na porta ${config.port}`)

    try{
        await AppDataSource.initialize();
        console.log("Database connected!")
    }catch(error){
        console.log("Date base not connected", error)
    }
})