
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import { Container, Conteudo } from './styled'

import Api from '../services/api';
import { useEffect, useState, React, useRef } from 'react';
const api = new Api();


export default function Index() {

const [alunos, SetAlunos]   = useState([]);
const [nome, SetNome]       = useState('');
const [chamada, SetChamada] = useState('');
const [curso, SetCurso]     = useState('');
const [turma, SetTurma]     = useState('');
const [alt, SetAlt]         = useState(0);
const loading               = useRef(null)

    async function listar (){
        loading.current.continuousStart();

        let r = await api.listar ();
        console.log(r);
        SetAlunos(r);

        loading.current.complete();
    }

    async function inserir (){
        loading.current.continuousStart();

        if(alt == 0 ){
            await api.inserir (nome, chamada, curso, turma);
            toast.dark('inserido')
        } else {
            await api.alterar(alt, nome, chamada, curso, turma);
            toast.dark('alterado')
        }

        limpar();

        loading.current.complete();
    }

    function limpar() {
        SetNome('');
        SetChamada('');
        SetCurso('');
        SetTurma('');
        SetAlt(0);
    }

    async function remover (id) {
        loading.current.continuousStart();

        await api.remover(id);
        toast.dark('removido')

        listar();

        loading.current.complete();
    }
    
    async function alterar (item) {
        SetNome(item.nm_aluno);
        SetChamada(item.nr_chamada);
        SetCurso(item.nm_curso);
        SetTurma(item.nm_turma);
        SetAlt(item.id_matricula);
    }

    useEffect(() => {
        listar();
    },   [])


        return (
            <Container>
                <ToastContainer />
                <LoadingBar color='#EA10C7' ref={loading} />
                    <Menu />
                    <Conteudo>
                        <Cabecalho />
                        <div class="body-right-box">
                            <div class="new-student-box">
                                
                                <div class="text-new-student">
                                    <div class="bar-new-student"></div>
                                    <div class="text-new-student">Novo Aluno</div>
                                </div>

                                <div class="input-new-student"> 
                                    <div class="input-left">
                                        <div class="agp-input"> 
                                            <div class="name-student"> Nome: </div>  
                                            <div class="input" type="text" value={nome} onChange={e => SetNome(e.target.value)} > <input /> </div>  
                                        </div> 
                                        <div class="agp-input">
                                            <div class="number-student"> Chamada: </div>  
                                            <div class="input"> <input type="text" value={chamada} onChange={e => SetChamada(e.target.value)} /> </div> 
                                        </div>
                                    </div>

                                    <div class="input-right">
                                        <div class="agp-input">
                                            <div class="corse-student"> Curso: </div>  
                                            <div class="input" type="text" value={curso} onChange={e => SetCurso(e.target.value)} > <input /> </div>  
                                        </div>
                                        <div class="agp-input">
                                            <div class="class-student"> Turma: </div>  
                                            <div class="input" type="text" value={turma} onChange={e => SetTurma(e.target.value)} > <input /> </div> 
                                        </div>
                                    </div>
                                    <div class="button-create"> <button onClick={inserir}> Cadastrar </button> </div>
                                </div>
                            </div>

                            <div class="student-registered-box">
                                <div class="row-bar"> 
                                    <div class="bar-new-student"> </div>
                                    <div class="text-registered-student"> Alunos Matriculados </div>
                                </div>
                            
                                <table class ="table-user">
                                    <thead>
                                        <tr>
                                            <th> ID </th>
                                            <th> Nome </th>
                                            <th> Chamada </th>
                                            <th> Turma </th>
                                            <th> Curso </th>
                                            <th class="coluna-acao"> </th>
                                            <th class="coluna-acao"> </th>
                                        </tr>
                                    </thead>
                            
                                    <tbody>
                                        {alunos.map(item =>    
                                            <tr>
                                                <td> {item.id_matricula} </td>
                                                <td> {item.nm_aluno != null && item.nm_aluno.length >= 20 ? item.nm_aluno.substr(0, 20) + "..." : item.nm_aluno} </td>
                                                <td> {item.nr_chamada} </td>
                                                <td> {item.nm_turma} </td>
                                                <td> {item.nm_curso} </td>
                                                <td> <button onClick={ () => alterar(item) }> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                                <td> <button onClick={ () => remover(item.id_matricula) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                            </tr>
                                        )}
                                    </tbody> 
                                </table>
                            </div>
                        </div>
                    </Conteudo>
            </Container>
            
        )
}
