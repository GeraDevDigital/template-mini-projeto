// Selecionando elementos do DOM
const input = document.querySelector(".form input");
const btnAdicionar = document.querySelector(".button-add");
const btnLimpar = document.querySelector(".button-clear");
const lista = document.querySelector(".list ul");
const chaveStorage = "meus-interesses";

// Atualiza a lista exibida na tela
function atualizarLista(interesses) {
  lista.innerHTML = "";
  interesses.forEach((item) => {
    const li = document.createElement("li"); // 
    li.textContent = item;
    lista.appendChild(li);
  });
}

// Carrega os dados salvos no localStorage 
// [M1S07] Ex 1 - Mini projeto - Meus interesses
function carregarInteresses() {
  const dadosSalvos = localStorage.getItem(chaveStorage);
  const interesses = dadosSalvos ? JSON.parse(dadosSalvos) : [];
  atualizarLista(interesses);
}

// Adiciona novo item à lista
// [M1S07] Ex 2 - Mini projeto - Adicionando interesse a lista
btnAdicionar.addEventListener("click", () => {
  const valor = input.value.trim();
  if (valor === "") return;

  const dadosSalvos = localStorage.getItem(chaveStorage);
  const interesses = dadosSalvos ? JSON.parse(dadosSalvos) : [];

  interesses.push(valor);
  localStorage.setItem(chaveStorage, JSON.stringify(interesses));
  input.value = "";
  atualizarLista(interesses);
});

// Limpa toda a lista 
// [M1S07] Ex 4 - Mini projeto - Limpar lista de interesses 
btnLimpar.addEventListener("click", () => {
  localStorage.removeItem(chaveStorage);
  atualizarLista([]);
});

// Ao carregar a página, carregar lista salva
carregarInteresses();

// Atualizar a lista a cada 1 segundo (1000 ms) 
// [M1S07] Ex 3 - Mini projeto - Atualização da lista a cada segundo.
setInterval(() => {
  carregarInteresses();
}, 1000);

// Requisição à API do IBGE e exibição da notícia
// [M1S07] Ex 5 - Mini projeto - Buscando noticias para seção de noticias do dia
fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release")
  .then((response) => response.json())
  .then((data) => {
    const primeiraNoticia = data.items[0]; //
    const tituloNoticia = primeiraNoticia.titulo; //[M1S07] Ex 6 - Mini projeto - Insira a noticia de destaque em sua seção
    document.querySelector(".title-news-today").textContent = tituloNoticia;
  })
  .catch((error) => {
    console.error("Erro ao buscar notícias do IBGE:", error);
  });
