import { useEffect, useState } from "react";
import {auth} from './firebase.js';

function Header(props) {
  
    useEffect(() =>{
    },[]);

    //Abrir tela de cadastro
    function abrirModalCriarConta(e) {
      e.preventDefault();
      
      let modal = document.querySelector('.modalCriarConta');
      modal.style.display = "block";

    }

    //Fechar tela de cadastro
    function fecharModalCriar() {
      let modal = document.querySelector('.modalCriarConta');
      modal.style.display = "none";
    }

    //Autenticando a conta com o firebase
    function criarConta(e) {
      
      e.preventDefault();

      let email = document.getElementById('email-cadastro').value;
      let username = document.getElementById('username-cadastro').value;
      let senha = document.getElementById('senha-cadastro').value;

      //Criar conta firebase

      auth.createUserWithEmailAndPassword(email, senha)
      .then((authUser)=>{
        authUser.user.updateProfile({
          displayName:username
        });
        alert("Conta criada com sucesso");
        fecharModalCriar();
      }).catch((error)=>{
        alert(error.message);
      });

    }

    //Autenticação de login
    function logar(e) {
      e.preventDefault();

      let email = document.getElementById('email-login').value;
      let senha = document.getElementById('senha-login').value;

      auth.signInWithEmailAndPassword(email, senha)
      .then((auth)=>{
        props.setUser(auth.user.displayName);
        alert('Logado com sucesso');
      }).catch((err)=>{
        alert(err.message);
      })
    }

  return (
    <div className="header">
    <div className="modalCriarConta">
      <div className="formCriarConta">
        <div onClick={()=>fecharModalCriar()} className="close-modal-criar">x</div>
        <h2>Criar Conta</h2>
        <form onSubmit={(e)=>criarConta(e)}>
          <input id="email-cadastro" type='text' placeholder="Seu e-mail..."/>
          <input id="username-cadastro" type='text' placeholder="Seu username..."/>
          <input id="senha-cadastro" type='password' placeholder="Senha..."/>
          <input type='submit' value='Criar Conta!'/>
        </form>
      </div>
    </div>

      <div className="center">
        <div className="header_logo">
          <a href="">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
          </a>
        </div>

        {(props.user)? 
          <div className="header_logadoInfo">
            <span>
              Olá <b>{props.user}</b>
            </span>
            <a href="#">Postar!</a>
          </div>
        : 
          <div className="header_login">
            <form onSubmit={(e)=>logar(e)}>
              <input id="email-login" type="text" placeholder="Login..." />
              <input id="senha-login" type="password" placeholder="Senha..." />
              <input type="submit" name="acao" value="Logar" />
            </form>
            <div className="btn_criarConta">
              <a onClick={(e)=>abrirModalCriarConta(e)}>Criar conta</a>
            </div>
          </div>
        }
      </div>
    </div>
  );
}


export default Header;