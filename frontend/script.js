
 async function testar() {
    const resposta = await fetch('http://localhost:3000/usuarios/teste');
    const dados = await resposta.json();
    // console.log(dados); // { mensagem: "Rota de teste funcionando!" }
    document.getElementById("dados").innerHTML = dados.mensagem;
  }


  const API = 'http://localhost:3000/usuarios';

async function cadastrar() {
    const nome  = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;

    const res = await fetch(`${API}/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
    });

    const dados = await res.json();
    document.getElementById('mensagem').innerHTML = dados.mensagem;
}


async function login() {
    const email = document.getElementById('log-email').value;
    const senha = document.getElementById('log-senha').value;

    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const dados = await res.json();
    document.getElementById('mensagem').innerHTML = dados.mensagem;
}