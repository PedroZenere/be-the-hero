import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'
import '../../global.css'

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){

  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogon(e){
    e.preventDefault();

    //console.log('ID: ', id);
    
    try{
      const response = await api.post('session', {id});

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch(err){
      alert('ID inválido :( Tente Novamente!');
    }
  }

    return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Logo"/>
         
        <form>
            <h1>Faça seu logon</h1>
            <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
            />
            <button className="button" type="submit" onClick={handleLogon}>Entrar</button>
            <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não possui cadastro</Link>
        </form>
        
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
    );
}