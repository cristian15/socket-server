import { Router, Request, Response  } from 'express'
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';


export const router = Router();

router.get('/mensajes', (req: Request, res: Response)=>{
    res.json({
        ok: true,
        mensaje: ' Todo OK'
    })
});
router.get('/usuarios', (req: Request, res: Response)=>{

    const server = Server.getInstance();
    server.io.allSockets().then((clientes)=>{
        console.log("Usuarios:", clientes);
        res.json({
            ok: true,
            clientes: Array.from(clientes)
        })

    }).catch((err)=>{
        res.json({
            ok: false,
            mensaje: err.message
        })
    });
});

router.get('/usuarios/detalle', (req: Request, res: Response)=>{

    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    });
    
});
router.post('/mensajes', (req: Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.getInstance();

    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    })
});
router.post('/mensajes/:id', (req: Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.getInstance();

    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
});



export default router;
