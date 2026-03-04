import api from "../api"



const formatarTipo = (e:string)=>{
    const tipo = ['FERIAS', 'ATESTADO', 'LICENCA', 'OUTRO']
    switch (e) {
        case "Férias":
            return tipo[0]
        case "Atestado":
            return tipo[1]
        case "Licença":
            return tipo[2]
        case "Outro":
            return tipo[3]
        default:
            return tipo[0]
    }
}

const criarAusencia = async (dataInicio:string, dataFim:string, tipoAusencia:string, id_funcionario:number)=>{
        let body = {dataInicio, dataFim, tipoAusencia:formatarTipo(tipoAusencia), id_funcionario}
        if(!dataFim){body.dataFim = dataInicio}
        const {data} = await api.post("/ausencia", body)
        return data
}


const ano = async (id_funcionario:number)=>{
        const {data} = await api.get(`/ausencia/ano/${id_funcionario}`)
        return data
}

const listarAusencia = async (id_funcionario:number, mes:string, ano:string)=>{
        const {data} = await api.get(`/ausencia/${id_funcionario}/${+mes + 1}/${ano}`)
        return data
}

const excluir = async (id:number)=>{
        api.delete("/ausencia/"+id)
        return "Ausência deletada com sucesso"
}

export default  {criarAusencia, listarAusencia, ano, excluir}