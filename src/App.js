import React, { useState, useEffect } from 'react'
import api from './services/api';7

import './App.css';

import Header from './components/Header';

function App(){
    

    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        api.get('projects').then(response =>{
            setProjects(response.data)
        });
    }, []);

    //useState retorna um array com 2 posições
    //1. Variavel com o seu valor inicial
    //2. funlçao para atualizarmos esse valor

    async function handleAddProject(){
        setProjects([...projects, `Novo Projeto ${Date.now()}`])
        
        const response = await api.post('projects', {
            title: 'tomas',
            owner: 'TOMAS'
        })

        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects rs"/>
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
            <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    )
}
export default App;