import React, { useEffect, useState } from 'react'
import "./Login.css"
import NavbarOff from '../../components/Navbar/NavbarOff'
import {loginDay}  from '../../services/login'
import Alerta from "../../components/Alertas/Alerta"
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'


export default function Login() {
  const navigation = useNavigate()
  const [cpf, setCpf] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const location = useLocation()


  const [alerta, setAlerta] = useState(false)
  const [tipoAlerta, setTipoAlerta] = useState('')
  const [close, setClose] = useState(false)


  useEffect(()=>{
    if(location.state){
      if(location.state.sucesso){
        setAlerta(location.state.sucesso)
        setTipoAlerta('sucesso')
      }

      if(location.state.erro){
        setAlerta(location.state.erro)
        setTipoAlerta('erro')
      }
    }
  }, [location.state])

   //alerta
      useEffect(() => {
      if (alerta) {
        const t1 = setTimeout(() => {
          setClose(true); 
        }, 2000);

        const t2 = setTimeout(() => {
          setAlerta(false)
          setClose(false)
        }, 2500)

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    }, [alerta]);

  const handleLogin = async (e)=>{
    e.preventDefault()

    if(!cpf || !senha){
      setAlerta("Preencha todos os campos")
      setTipoAlerta('info')
      return
    }
    
    setLoading(true)

    try {
      const data = await loginDay(cpf, senha);   
       
      if(!data.primeiraEntrada){
          return navigation("/primeira-entrada", {state:{cpf}, replace:true})
        }
      return window.location.reload()

    } catch (error) {
      setAlerta(error.message || "Falha no Login")
      setTipoAlerta('erro')
    } finally{
      setLoading(false)
    }
  }
  
  return (
    <div>
      <NavbarOff></NavbarOff>
       {alerta && (<Alerta msg={alerta} tipo={tipoAlerta} close={close} />) }
    <div className="container-login">
      <div className="fundoPreto"></div>
        {loading ? 
          <Loading></Loading>
        :   
      <div className="box">
        <p className="titulo">LOGIN</p>
        <form className='formulario' id='meuform' onSubmit={handleLogin}>
          <label className='text'>CPF:</label>
            <input required type="text" onChange={(e)=> setCpf(e.target.value)} placeholder=" Digite seu CPF..." className="input" />
          <label className='text'>Senha:</label>
            <input required type="password" onChange={(e)=> setSenha(e.target.value)} placeholder=" Digite sua senha..." className="input" />
        </form>
         <div className="boxBotao">
          <button form='meuform'  className='botao'>➔</button>
         </div>
      </div>}
    
    </div>
  </div>
  )
}
