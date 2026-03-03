import api from "../api"

const getAll = async ()=>{
    try {
        const {data} = await api.get("/funcionario")
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar funcionarios"}
    }
}

const getId = async (id:number)=>{
    try {
        
        const {data} = await api.get("/funcionario/"+id)

        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar funcionarios"}
    }
}

const resetarSenha = async (id:number)=>{
    try {
        const {data} = await api.patch("/funcionario/resetarSenha/"+id)

        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao Resetar Senha"}
    }
}

const create = async (body:{
    nome:string, matricula:string,
    cpf:string, cargo:string, 
    empresa:string, turno:string 
})=>{
    try {
        
    const {data} = await api.post("/funcionario", body)   
    return data     
    } catch (error) {
    throw error.response?.data || {message: "Erro ao listar funcionarios"}
    }
}

const buscar = async (nome:string)=>{
    try {
        const {data} = await api.get("/funcionario/buscar/" + nome)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar funcionarios"}
    }
}

const editar = async (body:{
    nome:string, matricula:string,
    cpf:string, cargo:string, 
    empresa:string, turno:string 
}, id:number)=>{
    try {
        const {data} = await api.patch('/funcionario/'+id, body)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar funcionarios"}
    }
}

export default  {getAll, getId, resetarSenha, buscar, create, editar}