async function testar() {
    const resposta = await fetch('http://localhost:3000/usuarios/teste');
    const dados = await resposta.json();
    // console.log(dados); // { mensagem: "Rota de teste funcionando!" }
    document.getElementById("dados").innerHTML = dados.mensagem;
  }

const API = 'http://localhost:3000/usuarios';

function mostrarMensagem(texto) {
    document.getElementById('mensagem').innerHTML = texto;
}

// ── Teste 
async function testar() {
    const res   = await fetch(`${API}/teste`);
    const dados = await res.json();
    document.getElementById('dados').innerHTML = dados.mensagem;
}

// ── Cadastrar 
async function cadastrar() {
    const nome  = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;

    const res   = await fetch(`${API}/cadastrar`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nome, email, senha })
    });

    const dados = await res.json();
    mostrarMensagem(dados.mensagem);
    listarUsuarios(); // atualiza a lista após cadastrar
}

// ── Login 
async function login() {
    const email = document.getElementById('log-email').value;
    const senha = document.getElementById('log-senha').value;

    const res   = await fetch(`${API}/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, senha })
    });

    const dados = await res.json();
    mostrarMensagem(dados.mensagem);
}

// ── Listar usuários 
async function listarUsuarios() {
    const res    = await fetch(`${API}/`);
    const dados  = await res.json();

    const lista  = document.getElementById('lista-usuarios');
    lista.innerHTML = '';

    dados.usuarios.forEach(u => {
        lista.innerHTML += `
            <li>
                <strong>${u.nome}</strong> — ${u.email} (ID: ${u.id})
                <button onclick="atualizarDados(${u.id}, '${u.nome}', '${u.email}')">Editar</button>
                <button onclick="removerUsuario(${u.id})">Remover</button>
            </li>
        `;
    });
}

// ── Atualizar 
async function atualizarDados(id, nomeAtual, emailAtual) {
    const novoNome  = prompt("Novo nome:",  nomeAtual);
    const novoEmail = prompt("Novo email:", emailAtual);

    if (!novoNome || !novoEmail) return;

    const res   = await fetch(`${API}/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nome: novoNome, email: novoEmail })
    });

    const dados = await res.json();
    mostrarMensagem(dados.mensagem);
    listarUsuarios(); // atualiza a lista
}

// ── Remover 
async function removerUsuario(id) {
    if (!confirm(`Remover usuário ID ${id}?`)) return;

    const res   = await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });

    const dados = await res.json();
    mostrarMensagem(dados.mensagem);
    listarUsuarios(); // atualiza a lista
}

// Carrega a lista assim que a página abre
listarUsuarios();