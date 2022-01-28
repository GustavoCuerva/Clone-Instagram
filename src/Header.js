import { useEffect, useState } from "react";

function Header(props) {
  
    useEffect(() =>{
        props.setUser('Jonas');
    },[])

  return (
    <div className="header">
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
            <form>
              <input type="text" placeholder="Login..." />
              <input type="password" placeholder="Senha..." />
              <input type="submit" name="acao" value="Logar" />
            </form>
            <div className="btn_criarConta">
              <a href="#">Criar conta</a>
            </div>
          </div>
        }
      </div>
    </div>
  );
}


export default Header;