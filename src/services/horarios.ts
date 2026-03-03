import api from "../api"

const editarHorarios = async (dataCriada:string, hora:string, tipo:string, id_funcionario:number)=>{
    try {
        let body = {dataCriada, id_funcionario}
        if(tipo === "entrada"){
            Object.assign(body, {entrada:hora})
        }else if (tipo === "saida"){
            Object.assign(body, {saida:hora})
        }
        
        const {data} = await api.patch("/horarios/editar", body)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar funcionários"}
    }
}

const verificarAll = async ()=>{
    try {
       const {data} = await api.get("/horarios/verificarDia")
        
       return data
   } catch (error) {
       throw error.response?.data || {message: "Erro ao listar funcionários"}
   }
}

const verificar = async (id:number)=>{
    try {
        const {data} = await api.get("/horarios/verificar/"+id)

        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar funcionários"}
    }
}

const entrada = async (id:number)=>{
    try {
        const body = {id_funcionario:id}
        
        const {data} = await api.post("/horarios/entrada/", body)

        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar horarios"}
    }
}

const saida = async (id:number)=>{
    try {
        const body = {id_funcionario:id}
        const {data} = await api.post("/horarios/saida/", body)

        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar saída"}
    }
}

const historicoFuncionario = async (mes:string, ano:string, id:number)=>{
    try {
        const mesNumber = +mes;

        const {data} = await api.get(`/horarios/historico/${id}/${mesNumber + 1}/${ano}`)

        return data;
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar histórico de funcionário"}
    }
}

const historicoFuncionarioAdm = async (id:number, mes:string, ano:string)=>{
      try {
        const mesNumber = +mes;
        
        const {data} = await api.get(`/horarios/historico/${id}/${mesNumber + 1}/${ano}`)
        
        return data;
    } catch (error) {
        throw error.response?.data || {message: "Erro ao listar histórico"}
    }
}

const anoAdm = async (id:number)=>{
    try {
       const {data} = await api.get(`/horarios/ano/${id}`)

       return data;
   } catch (error) {
       throw error.response?.data || {message: "Erro ao listar anos"}
   }
}

const estatisticas = async (id_funcionario:number, mes:string, ano:string)=>{
    try {
        const {data} = await api.get(`/horarios/estatisticas/${id_funcionario}/${+mes + 1}/${ano}`)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao trazer estatísticas"}
    }
}

const ano = async (id:number)=>{
    try {
       const {data} = await api.get(`/horarios/ano/${id}`)

       return data;
   } catch (error) {
       throw error.response?.data || {message: "Erro ao listar ano"}
   }
}

const apagarHorarios = async (id:number)=>{
    try {
        const {data} = await api.delete(`/horarios/${id}`)
        return data
    } catch (error) {
        throw error.response?.data || {message: "Erro ao apagar Horario"}
    }
}



export default  {apagarHorarios, estatisticas, anoAdm, editarHorarios, verificar, entrada, saida, verificarAll, historicoFuncionario, ano, historicoFuncionarioAdm}