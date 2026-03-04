import api from "../api"

const criarFeriado = async (nome:string, dataInicio:string, dataFim:string, tipoFeriado:string, nacional:boolean)=>{
        const body = {nome, dataInicio, dataFim, tipoFeriado, nacional}
        if(!dataFim){
            body.dataFim = dataInicio
        }
        const {data} = await api.post("/feriados", body)
        return data
}

const lerFeriado = async ()=>{
        const {data} = await api.get("/feriados")
        return data    
   
}

const anosFeriados = async ()=>{
        const {data} = await api.get("/feriados/anos")
        
        return data
}

const findAnoTipo = async (ano:string, tipoFeriado:string)=>{
        const {data} = await api.get(`/feriados/tipo/${ano}/${tipoFeriado}`)
        return data
}

const excluirFeriado = async(id:number)=>{
        const {data} = await api.delete("/feriados/"+id)
        return data
}

export default  {criarFeriado, lerFeriado, anosFeriados, findAnoTipo, excluirFeriado}