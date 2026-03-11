// Variáveis globais
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var personagem = null;
var inimigos = [];
var objetos = [];
var pontuacao = 0;
var vidas = 3;
var gameOver = false;

// Função para desenhar o fundo
function desenharFundo() {
 ctx.fillStyle = '#87CEEB';
 ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Função para criar o personagem
function criarPersonagem() {
 personagem = {
 x: 100,
 y: 100,
 largura: 50,
 altura: 50,
 cor: '#FF0000',
 velocidade: 5
 };
}

// Função para criar inimigos
function criarInimigos() {
 inimigos.push({
 x: 200,
 y: 200,
 largura: 50,
 altura: 50,
 cor: '#00FF00',
 velocidade: 2
 });

 inimigos.push({
 x: 400,
 y: 400,
 largura: 50,
 altura: 50,
 cor: '#0000FF',
 velocidade: 3
 });
}

// Função para criar objetos
function criarObjetos() {
 objetos.push({
 x: 300,
 y: 300,
 largura: 20,
 altura: 20,
 cor: '#FFFF00',
 velocidade: 1
 });
}

// Função para desenhar o personagem
function desenharPersonagem() {
 ctx.fillStyle = personagem.cor;
 ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

// Função para desenhar inimigos
function desenharInimigos() {
 for (var i = 0; i < inimigos.length; i++) {
 ctx.fillStyle = inimigos[i].cor;
 ctx.fillRect(inimigos[i].x, inimigos[i].y, inimigos[i].largura, inimigos[i].altura);
 }
}

// Função para desenhar objetos
function desenharObjetos() {
 for (var i = 0; i < objetos.length; i++) {
 ctx.fillStyle = objetos[i].cor;
 ctx.fillRect(objetos[i].x, objetos[i].y, objetos[i].largura, objetos[i].altura);
 }
}

// Função para atualizar o jogo
function atualizarJogo() {
 if (gameOver) return;

 // Atualizar posição do personagem
 if (teclas[37]) personagem.x -= personagem.velocidade; // Esquerda
 if (teclas[39]) personagem.x += personagem.velocidade; // Direita
 if (teclas[38]) personagem.y -= personagem.velocidade; // Cima
 if (teclas[40]) personagem.y += personagem.velocidade; // Baixo

 // Atualizar posição dos inimigos
 for (var i = 0; i < inimigos.length; i++) {
 inimigos[i].x += inimigos[i].velocidade;
 if (inimigos[i].x > canvas.width) inimigos[i].x = 0;
 }

 // Atualizar posição dos objetos
 for (var i = 0; i < objetos.length; i++) {
 objetos[i].y += objetos[i].velocidade;
 if (objetos[i].y > canvas.height) objetos[i].y = 0;
 }

 // Verificar colisão com inimigos
 for (var i = 0; i < inimigos.length; i++) {
 if (verificarColisao(personagem, inimigos[i])) {
 vidas--;
 if (vidas <= 0) {
 gameOver = true;
 }
 }
 }

 // Verificar colisão com objetos
 for (var i = 0; i < objetos.length; i++) {
 if (verificarColisao(personagem, objetos[i])) {
 vidas--;
 if (vidas <= 0) {
 gameOver = true;
 }
 }
 }
}

// Função para verificar colisão
function verificarColisao(obj1, obj2) {
 if (obj1.x + obj1.largura > obj2.x &&
 obj1.x < obj2.x + obj2.largura &&
 obj1.y + obj1.altura > obj2.y &&
 obj1.y < obj2.y + obj2.altura) {
 return true;
 }
 return false;
}

// Função para desenhar o jogo
function desenharJogo() {
 desenharFundo();
 desenharPersonagem();
 desenharInimigos();
 desenharObjetos();
 ctx.fillStyle = '#000000';
 ctx.font = '24px Arial';
 ctx.textAlign = 'left';
 ctx.textBaseline = 'top';
 ctx.fillText('Vidas: ' + vidas, 10, 10);
 ctx.fillText('Pontuação: ' + pontuacao, 10, 40);
}

// Função para iniciar o jogo
function iniciarJogo() {
 criarPersonagem();
 criarInimigos();
 criarObjetos();
 gameOver = false;
 pontuacao = 0;
 vidas = 3;
}

// Função para mostrar tela de game over
function mostrarGameOver() {
 ctx.fillStyle = '#FF0000';
 ctx.font = '48px Arial';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'middle';
 ctx.fillText('Perdeu playboy!', canvas.width / 2, canvas.height / 2);
}

// Eventos de teclado
var teclas = [];
document.addEventListener('keydown', function(e) {
 teclas[e.keyCode] = true;
});
document.addEventListener('keyup', function(e) {
 teclas[e.keyCode] = false;
});

// Loop do jogo
setInterval(function() {
 atualizarJogo();
 desenharJogo();
 if (gameOver) {
 mostrarGameOver();
 }
}, 1000 / 60);

// Tela de início
ctx.fillStyle = '#000000';
ctx.font = '48px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Cchroncre', canvas.width / 2, canvas.height / 2);
ctx.font = '24px Arial';
ctx.fillText('Aperte para iniciar', canvas.width / 2, canvas.height / 2 + 50);
document.addEventListener('click', function() {
 iniciarJogo();
});
