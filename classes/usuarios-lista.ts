import { USuario } from './usuario';
export class UsuariosLista{
    private lista: USuario[] = [];

    constructor(){}

    public agregar(usuario: USuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarUsuario(id: string, nombre: string){
        for(let u of this.lista){
            if(u.id === id){
                u.nombre = nombre
                break;
            }
        }

        console.log('Actualizando Usuario');
        console.log(this.lista);       
    }

    public getLista(){
        return this.lista;
    }
    public getUsuario(id:string){
        return this.lista.find(u => u.id=== id)
    }

    public getUsuariosEnSala(sala:string){
        return this.lista.filter(u => u.sala === sala)
    }

    public borrarUsuario(id:string){
        const tmpUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(u=> u.id != id);

        return tmpUsuario;

    }
}