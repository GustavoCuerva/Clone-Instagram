import logo from './logo.svg';
import './App.css';
import {db} from './firebase.js';
import {useEffect, useState} from 'react';


function App() {

  const [user, steUser] = useState(null);

  useEffect(()=>{

  }),[];

  return (
    <div className="App">
      <div className='header'>
        <div className='center'>
        <div className='header_logo'>
          <a href=''><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'></img></a>
        </div>

        {
          (user)?
          <div>Olá Gustavo</div>
          :
          <div className='header_login'>
          <form>
            <input type='text' placeholder="Login..."/>
            <input type='password' placeholder="Senha..."/>
            <input type='submit' name='acao' value="Logar"/>
          </form>
        </div>
        }

        </div>
      </div>
    </div>
  );
}

export default App;
