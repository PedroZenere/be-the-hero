import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import '../../global.css';
import './styles.css';

export default function NewIncident(){

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };
        
        try{
            const response = await api.post('incidents', data, {
                headers:{
                Authorization: ongId,
            }
        })
            alert(`Caso ${response.data.id} Inserido com Sucesso!!`);
            history.push('/profile');
        } catch (err) {
            alert('Não foi possível cadastrar :( Tente Novamente');
        }

    }

    return(
       <div className="newincident-container">
        <div className="content">
            <section className="form">
                <img src={logoImg} alt="logo" />

                <h1>Cadastrar novo caso</h1>

                <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isto.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Titulo do caso" 
                value={title}
                onChange={ e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição" 
                value={description}
                onChange={ e => setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em reais"
                value={value}
                onChange={ e => setValue(e.target.value)} 
                />
            
                <button className="button" type="submit">Cadastrar</button>
                
            </form>
        </div>
       </div>
    );
}