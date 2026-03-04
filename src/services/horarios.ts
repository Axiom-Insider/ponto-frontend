import api from "../api"

const editarHorarios = async (dataCriada:string, hora:string, tipo:string, id_funcionario:number)=>{
        let body = {dataCriada, id_funcionario}
        if(tipo === "entrada"){
            Object.assign(body, {entrada:hora})
        }else if (tipo === "saida"){
            Object.assign(body, {saida:hora})
        }
        
        const {data} = await api.patch("/horarios/editar", body)
        return data
}

const verificarAll = async ()=>{
       const {data} = await api.get("/horarios/verificarDia")
       return data
}

const verificar = async (id:number)=>{
        const {data} = await api.get("/horarios/verificar/"+id)
        return data
}

const entrada = async (id:number)=>{
        const body = {id_funcionario:id}
        const {data} = await api.post("/horarios/entrada/", body)
        return data
}

const saida = async (id:number)=>{
        const body = {id_funcionario:id}
        const {data} = await api.post("/horarios/saida/", body)
        return data
}

const historicoFuncionario = async (mes:string, ano:string, id:number)=>{
        const mesNumber = +mes;
        console.log(id, mes, ano);
        const {data} = await api.get(`/horarios/historico/${id}/${mesNumber + 1}/${ano}`)
        console.log(data);
        return data;
}

const historicoFuncionarioAdm = async (id:number, mes:string, ano:string)=>{
        const mesNumber = +mes;
        const {data} = await api.get(`/horarios/historico/${id}/${mesNumber + 1}/${ano}`)
        return data;
}

const anoAdm = async (id:number)=>{
       const {data} = await api.get(`/horarios/ano/${id}`)
       return data;
}

const estatisticas = async (id_funcionario:number, mes:string, ano:string)=>{
        const {data} = await api.get(`/horarios/estatisticas/${id_funcionario}/${+mes + 1}/${ano}`)
        return data
}

const ano = async (id:number)=>{
       const {data} = await api.get(`/horarios/ano/${id}`)

       return data;
}

const apagarHorarios = async (id:number)=>{
        const {data} = await api.delete(`/horarios/${id}`)
        return data
}



export default  {apagarHorarios, estatisticas, anoAdm, editarHorarios, verificar, entrada, saida, verificarAll, historicoFuncionario, ano, historicoFuncionarioAdm}