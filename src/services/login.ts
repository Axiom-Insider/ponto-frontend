import api from "../api"


const loginDay = async (cpf: string, senha: string) => {
        const { data } = await api.post("/auth/login", { cpf, senha })
        if (!data.primeiraEntrada) {
            return data
        }
        localStorage.setItem("token", data.token)
        return data
}

const loginFirst = async (cpf: string, senha: string, novaSenha: string) => {
        const { data } = await api.post("/auth/login", { cpf, senha, novaSenha })
        return data
}



export { loginDay, loginFirst }