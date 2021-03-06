import { useEffect, useState } from "react";
import {auth, storage, db} from './firebase.js';
import firebase from "firebase/compat/app";

function Header(props) {

    //Criando estados do progresso e do arquivo
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

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
        window.location.href = '/';
      }).catch((err)=>{
        alert(err.message);
      })
    }

    //Sair
    function deslogar(e){
      e.preventDefault();
      auth.signOut().then(function(val){
        props.setUser(null);
        window.location.href = '/';
      })
    }

    //Abrir tela de upload
    function abrirModalUpload(e) {
      e.preventDefault();
      
      let modal = document.querySelector('.modalUpload');
      modal.style.display = "block";

    }

    //Fechar tela de upload
    function fecharModalUpload() {
      let modal = document.querySelector('.modalUpload');
      modal.style.display = "none";
    }

    //Fazer upload da postagem para o banco de dados
    function uploadPost(e) {
      e.preventDefault();
     
      //coletando titulo
      let tituloPost = document.getElementById('titulo-upload').value;

      //Coloca o caminho ou referencia para onde vai estar armazenado nossa foto, com o nome do arquivo
      const uploadTask = storage.ref(`images/${file.name}`).put(file);

      //Verificando onde está o upload
      uploadTask.on('state_changed',function(snapshot) {
        const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgress(progress);
      },function(error) {
        //Caso ocorra erro
      },function(params) {

        //Adicionando ao banco de dados
        storage.ref('images').child(file.name).getDownloadURL()
        .then(function(url) {
          db.collection('posts').add({
            titulo: tituloPost,
            image: url,
            userName: props.user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })

          setProgress(0);
          setFile(null);

          alert('Upload realizado com sucesso');

          document.getElementById('formUpload').reset();

          fecharModalUpload();
        })
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

    <div className="modalUpload">
      <div className="formUpload">
        <div onClick={()=>fecharModalUpload()} className="close-modal-upload">x</div>
        <h2>Postar</h2>
        <form onSubmit={(e)=>uploadPost(e)} id="formUpload">
          <progress id='progressUpload' value={progress}></progress>
          <input id="titulo-upload" type='text' placeholder="Nome da foto"/>
          <input onChange={(e)=>setFile(e.target.files[0])} type='file' name="file"/>
          <input type='submit' value='Publicar'/>
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
            <a onClick={(e)=>abrirModalUpload(e)}>Postar!</a>
            <a onClick={(e)=>deslogar(e)}>Sair</a>
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