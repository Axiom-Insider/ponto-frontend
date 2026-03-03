import api from "../api"

const criarFeriado = async (nome:string, dataInicio:string, dataFim:string, tipoFeriado:string, nacional:boolean)=>{
    try {
        const body = {nome, dataInicio, dataFim, tipoFeriado, nacional}
        if(!dataFim){
            body.dataFim = dataInicio
        }
        const {data} = await api.post("/feriados", body)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao criar feriado"}
    }
}

const lerFeriado = async ()=>{
    try {
        const {data} = await api.get("/feriados")
        return data    
    } catch (error){
        throw error.response?.data || {message: "Erro ao criar feriado"}
    } 
}

const anosFeriados = async ()=>{
    try {
        const {data} = await api.get("/feriados/anos")
        
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar anos"}
    }
}

const findAnoTipo = async (ano:string, tipoFeriado:string)=>{
    try {
        const {data} = await api.get(`/feriados/tipo/${ano}/${tipoFeriado}`)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar feriados"}
    }
}

const excluirFeriado = async(id:number)=>{
    try {
        const {data} = await api.delete("/feriados/"+id)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao apagar feriados"}
    }
}

export default  {criarFeriado, lerFeriado, anosFeriados, findAnoTipo, excluirFeriado}