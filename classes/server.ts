import express from 'express';
import { SERVER_PORT } from '../global/enviorement';
import socketIO from 'socket.io';
import {createServer}  from 'http';

import * as socket from '../sockets/socket';

export default class Server{

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer;
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = createServer(this.app);

        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

        this.escucharSockets();
    }

    public static getInstance(){
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente =>{

            //Conectar CLietne
            socket.conectarCliente(cliente);
            // Configura Usuario
            console.log(cliente.id);
            socket.login(cliente, this.io)

            

            socket.desconectar(cliente);
            socket.mensaje(cliente, this.io);
        })
    }

    start( callback: Function ){
        this.httpServer.listen(this.port, callback());
    }
}