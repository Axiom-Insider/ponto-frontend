import api from "../api"

 const nomeMes = (num: number)=> {
    const date = new Date();
    date.setMonth(num - 1);

    return date.toLocaleString('default', { month: 'long' });
  }

const downloadPoloUAB = async (id_funcionario: number, mes: string, ano: string) => {
        const mesNome = nomeMes(+mes + 1).toUpperCase()
        const response = await api.get(
            `/documento/polouab/${id_funcionario}/${+mes + 1}/${ano}`,
            { responseType: "blob" }
        );
        const {data} = await api.get(`/funcionario/${id_funcionario}`)
        const {nome} = data
        const nomeArquivo = nome.replace(/\s/g, '-');
        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${mesNome}-${nomeArquivo}-PoloUAB.docx`; // nome do arquivo
        a.click();
        window.URL.revokeObjectURL(url);
        return 'Donwload PoloUAB realizado com Sucesso'
    
}

const downloadConfianca = async (id_funcionario: number, mes: string, ano: string) => {
        const mesNome = nomeMes(+mes + 1)
        const response = await api.get(
            `/documento/confianca/${id_funcionario}/${+mes + 1}/${ano}`,
            { responseType: "blob" }
        );
        
        const {data} = await api.get(`/funcionario/${id_funcionario}`)
       
        var {nome} = data
        var nomeArquivo = nome.replace(/\s/g, '-');

        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${mesNome}-${nomeArquivo}-Confianca.docx`; // nome do arquivo
        a.click();
        window.URL.revokeObjectURL(url);
        return "Donwload Confianca realizado com Sucesso"
}



export default { downloadPoloUAB, downloadConfianca }