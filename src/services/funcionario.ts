import api from "../api"

const getAll = async ()=>{
        const {data} = await api.get("/funcionario")
        return data
    
}

const getId = async (id:number)=>{
        const {data} = await api.get("/funcionario/"+id)
        return data
}

const resetarSenha = async (id:number)=>{
        const {data} = await api.patch("/funcionario/resetarSenha/"+id)
        return data
}

const create = async (body:{
    nome:string, matricula:string,
    cpf:string, cargo:string, 
    empresa:string, turno:string 
})=>{ 
    const {data} = await api.post("/funcionario", body)   
    return data     
}

const buscar = async (nome:string)=>{
        const {data} = await api.get("/funcionario/buscar/" + nome)
        return data
}

const editar = async (body:{
    nome:string, matricula:string,
    cpf:string, cargo:string, 
    empresa:string, turno:string 
}, id:number)=>{
        const {data} = await api.patch('/funcionario/'+id, body)
        return data
}

export default  {getAll, getId, resetarSenha, buscar, create, editar}