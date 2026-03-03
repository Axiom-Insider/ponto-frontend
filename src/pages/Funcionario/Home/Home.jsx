import React, { useEffect, useState } from 'react'
import NavbarFuncionario from '../../../components/Navbar/NavbarFuncionario'
import "./Home.css"
import { IoPersonCircleSharp } from "react-icons/io5";
import funcionario from '../../../services/funcionario';
import horario from '../../../services/horarios';
import { FaCheckSquare, FaHourglassHalf } from 'react-icons/fa';
import Alerta from '../../../components/Alertas/Alerta';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function HomeFuncionario() {

  const {user} = useAuth()

  const [data] = useState(new Date())
  const location = useLocation()
  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState("")
  const [cargo, setCargo] = useState("")
  const [entrada, setEntrada] = useState('')
  const [saida, setSaida] = useState('')

  const [alerta, setAlerta] = useState(false)
  const [tipoAlerta, setTipoAlerta] = useState('')
  const [close, setClose] = useState(false)

    useEffect(()=>{
    if(location.state && location.state.mensagem){
      setAlerta(location.state.mensagem)
      setTipoAlerta('sucesso')
    }
  }, [location.state])

  useEffect(() => {
    const feachData = async () => {
      try {
        const dadosFuncionario = await funcionario.getId(user.id)
        
        const { nome, matricula, cargo } = dadosFuncionario
        const dadosHora = await horario.verificar(user.id)
        const {entrada, saida} = dadosHora

        setNome(nome)
        setMatricula(matricula)
        setCargo(cargo)
        setEntrada(entrada)
        setSaida(saida)
      } catch (error) {
        setAlerta(error.message || "Falha ao verificar dados")
        setTipoAlerta('erro')
      }
     
    }
    feachData()
  }, [ ])


  //alerta
        useEffect(() => {
        if (alerta) {
          const t1 = setTimeout(() => {
            setClose(true); 
          }, 1500);
  
          const t2 = setTimeout(() => {
            setAlerta(false)
            setClose(false)
          }, 2000)
  
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
          };
        }
      }, [alerta]);

  return (
    <div>
      <NavbarFuncionario />
      {alerta && (<Alerta msg={alerta} tipo={tipoAlerta} close={close} />) }
      <div className="d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col">
            <div className="date">{data.toLocaleDateString("pt-BR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="box-home">
              <div className="head">
                <span className='avatar'> <IoPersonCircleSharp /> </span>
                <span className="nome">{nome}</span>
              </div>
              <div className="body">
                <div className='caixa' ><div className="matricula"><strong>Matrícula: </strong> <br/>{matricula}</div> 
                <div className="cargoHome"><strong>Cargo: </strong> <br />{cargo}</div></div>
                <div className="caixa">
                  {entrada ? 
                      <div className='entrada'><strong>Entrada:</strong> <br/>{entrada}H <i className='checkHoras'> <FaCheckSquare /></i>
                      </div>
                    : 
                      <div className='entrada'><strong>Entrada:</strong> <i className='wait'> <FaHourglassHalf /></i></div> 
                    }
                    {saida ? 
                      <div className='saida'><strong>Saída:</strong> <br/>{saida}H <i className='checkHoras'> <FaCheckSquare /> </i>
                      </div>
                    : 
                      <div className='saida'><strong>Saída:</strong> <i className='wait'> <FaHourglassHalf /></i></div> 
                    }  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
