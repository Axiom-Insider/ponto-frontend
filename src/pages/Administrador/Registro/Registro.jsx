import React, { useEffect, useState } from 'react'
import NavbarAdm from '../../../components/Navbar/NavbarAdm'
import { FaCheck, FaRegClock, FaSearch, FaUserEdit, FaUserPlus } from 'react-icons/fa'
import "./Registro.css"
import { MdPersonSearch } from 'react-icons/md'
import Horarios from '../Horarios/Horarios'
import funcionario from '../../../services/funcionario'
import Alerta from '../../../components/Alertas/Alerta'

export default function Registro() {

  //dados do funcionario
  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [cargo, setCargo] = useState('')
  const [empresa, setEmpresa] = useState('Polouab')
  const [turno, setTurno] = useState('Vespertino')
  const [cpf, setCpf] = useState('')

  const [selecionado, setSelecionado] = useState(false);
  const [ativo, setAtivo] = useState('registrar');
  const [funcionarioFiltrado, setFuncionarioFiltrado] = useState([]);

   //Alerta
  const [alerta, setAlerta] = useState(false)
  const [tipoAlerta, setTipoAlerta] = useState('')
  const [close, setClose] = useState(false)


  const iniciais = (nome) => {
    var dividido = nome.split(' ')
    var primeira = dividido[0].charAt(0).toUpperCase();
    var segunda = dividido[1].charAt(0).toUpperCase();
    return `${primeira}${segunda}`
  }

  const digitando = async (event) => {
    if(event.target.value != ''){
      try {
            const dados = await funcionario.buscar(event.target.value)
            setFuncionarioFiltrado(dados)
          } catch (error) {
            setAlerta(error.message || "Erro ao buscar funcionários");
            setTipoAlerta('erro')
          }
    }
  }
  const editarFuncionario = async (e)=>{
    e.preventDefault()
    try {
      const body = {nome, matricula, cpf, empresa, turno, cargo}
      const dados = await funcionario.editar(body, selecionado)
      funcionarioSelecionado(selecionado)
      setAlerta(dados.message)
      setTipoAlerta('sucesso')
    } catch (error) {
      setAlerta(error.message || "Erro ao buscar funcionários");
      setTipoAlerta('erro')
    }
  }

  const registrarFuncionario = async (e)=>{
     e.preventDefault()
     try {
      const body = {nome, matricula, cpf, empresa, turno, cargo}
      const dados = await funcionario.create(body)
      
      setAlerta(dados.message)
      setTipoAlerta('sucesso')
    } catch (error) {
      setAlerta(error.message || "Erro ao buscar funcionários");
      setTipoAlerta('erro')
    }
  } 

  const funcionarioSelecionado = (id) => {
    if (selecionado == id) {
      setSelecionado(false)
      setNome('')
      setMatricula('')
      setCargo('')
      setEmpresa('Confianca')
      setTurno('vespertino')
      setCpf('')
    } else {
      setSelecionado(id)
      const fun = funcionarioFiltrado.filter(user => user.id === id);
      setNome(fun[0].nome)
      setMatricula(fun[0].matricula)
      setCargo(fun[0].cargo)
      setEmpresa(fun[0].empresa)
      setTurno(fun[0].turno)
      setCpf(fun[0].cpf)
      setFuncionarioFiltrado(fun)
    }

  }

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
      <NavbarAdm />
       {alerta && (<Alerta msg={alerta} tipo={tipoAlerta} close={close} />) }
      <div className="d-flex justify-content-center align-items-center">
        <div className="box-registro-funcionario">
          <div className="head">
            <div className={ativo == 'registrar' ? "sub selecionado" : "sub"} onClick={() => setAtivo('registrar')}><FaUserPlus /> Registrar</div>
            <div className={ativo == 'editar' ? "sub selecionado" : "sub"} onClick={() => setAtivo('editar')}><FaUserEdit /> Editar</div>
          </div>
          {ativo === "editar" ?
            <form onSubmit={editarFuncionario} autoComplete="off">
            <div className="body-horarios">
              <div className="registro-linha">
                <label htmlFor="" className='form-label'>Nome:</label>
                <input className='form-control'  value={nome} onChange={(e) => setNome(e.target.value)} type="text" name="nome" />
              </div>
              <div className="linha-registro">
                <div className="registro-linha editar">
                  <label htmlFor="" className='form-label'>Matricula:</label>
                  <input className='form-control' onChange={(e) => setMatricula(e.target.value)} type="text" value={matricula} name="matricula" />
                </div>
                 <div className="registro-linha editar">
                  <label htmlFor="" className='form-label'>CPF:</label>
                  <input className='form-control' onChange={(e) => setCpf(e.target.value)} type="text" value={cpf} name="CPF" />
                </div>
                <div className="registro-linha editar">
                  <label htmlFor="" className='form-label'>Cargo:</label>
                  <input className='form-control' onChange={(e) => setCargo(e.target.value)} type="text" value={cargo} name="cargo" />
                </div>
              </div>
              <div className="linha-registro">
              <div className="registro-linha">
                <label className='form-label'>Empresa:</label>
                <select className='form-select' value={empresa} onChange={(e) => setEmpresa(e.target.value)} name="" id="">
                  <option value="Confianca" >Confiança</option>
                  <option value="Polouab" >PoloUAB</option>
                </select>
              </div>
               <div className="registro-linha">
                <label htmlFor="" className='form-label'>Turno:</label>
                <select className='form-select' value={turno} onChange={(e) => setTurno(e.target.value)} name="" id="">
                  <option value="Vespertino" >Vespertino</option>
                  <option value="Matutino" >Matutino</option>
                </select>
              </div>
              </div>
              {selecionado != false ?
                <div className="registro-linha">
                  <div className="registro-linha"><button className='botao-adicionar'>Atualizar Registro</button></div>
                </div> : ''}
              <div className="registro-linha mt-4">
                <div className="search-container">
                  <input type="text" onChange={digitando} className="form-control search-input" placeholder="Pesquisar..." />
                  <i className="fas fa-search search-icon"><MdPersonSearch /> </i>
                </div>
              </div>
              <div className="horarios-linha">
                {funcionarioFiltrado.map(dados => (
                  <div className={selecionado == dados.id ? 'funcionarios select' : 'funcionarios'} onClick={() => funcionarioSelecionado(dados.id)} key={dados.id}>
                    <div className="icone" >{iniciais(dados.nome)}</div>
                    <div className="nome-horarios">{dados.nome}</div>
                    {selecionado == dados.id ? <div className='func-selecionado'><FaCheck /></div> : ''}</div>
                ))}
              </div>
            </div>
            </form>
            :
            <form onSubmit={registrarFuncionario} autoComplete="off">
            <div className='body-horarios'>
                <div className="registro-linha">
                  <label htmlFor="" className='form-label'>Nome:</label>
                  <input className='form-control' onChange={(e)=>setNome(e.target.value)} type="text" name="nome" id="" required/>
                </div>
              <div className="linha-registro">
                <div className="registro-linha editar">
                  <label htmlFor="" className='form-label'>Matrícula:</label>
                  <input className='form-control' onChange={(e)=>setMatricula(e.target.value)} type="number" name="matricula" id="" required/>
                </div>
                 <div className="registro-linha">
                  <label htmlFor="" className='form-label'>CPF:</label>
                  <input className='form-control' onChange={(e)=>setCpf(e.target.value)} type="text" name="cpf" id="" required/>
                </div>
                <div className="registro-linha editar">
                  <label htmlFor="" className='form-label'>Cargo:</label>
                  <input className='form-control' onChange={(e)=>setCargo(e.target.value)} type="text" name="matricula" id="" required/>
                </div>
              </div>

              <div className="linha-registro">
                <div className="registro-linha">
                  <label htmlFor="" onChange={(e)=>setEmpresa(e.target.value)} className='form-label'>Empresa:</label>
                    <select className='form-select select-registro' name="" id="">
                      <option value="Confiança">Confiança</option>
                       <option value="PoloUAB">PoloUAB</option>
                    </select>
                </div>
                <div className="registro-linha">
                  <label htmlFor="" onChange={(e)=>setTurno(e.target.value)} className='form-label'>Turno:</label>
                    <select className='form-select select-registro' name="" id="">
                      <option value="PoloUAB">Matutino</option>
                      <option value="Confianca">Vespertino</option>
                    </select>
                </div>
              </div>
              <div className="registro-linha mt-2"><button className='botao-adicionar'>Registrar Funcionário</button></div>
            </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}
