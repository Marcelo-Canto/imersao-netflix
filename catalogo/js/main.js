// Importa as categorias de dados do arquivo data.js
import { categories } from "./data.js";

// Importa a função para criar carrosséis do componente Carousel.js
import { createCarousel } from "./components/Carousel.js";

// Espera o DOM carregar completamente antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // Obtém o nome do perfil ativo do localStorage, ou usa "Usuário" como padrão
  const nomePerfil = localStorage.getItem("perfilAtivoNome") || "Usuário";

  // Obtém a imagem do perfil ativo do localStorage, ou usa uma imagem padrão
  const imagemPerfil =
    localStorage.getItem("perfilAtivoImagem") ||
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

  // Seleciona o link para kids
  const kidsLink = document.querySelector(".kids-link");

  // Seleciona o ícone do perfil
  const profileIcon = document.querySelector(".profile-icon");

  // Seleciona o menu do perfil
  const profileMenu = document.querySelector(".profile-menu");

  // Se o link kids existe, define o texto como o nome do perfil
  if (kidsLink) kidsLink.textContent = nomePerfil;

  // Se o ícone do perfil existe, define a src como a imagem do perfil
  if (profileIcon) profileIcon.src = imagemPerfil;

  // Se o menu do perfil existe, define o title com o nome do perfil
  if (profileMenu) profileMenu.title = `Perfil ativo: ${nomePerfil}`;

  // Funcionalidade de busca
  // Seleciona o ícone de busca
  const searchIcon = document.querySelector(".fas.fa-search");

  if (searchIcon) {
    // Define o cursor como pointer para indicar que é clicável
    searchIcon.style.cursor = "pointer";

    // Adiciona um event listener para o clique no ícone de busca
    searchIcon.addEventListener("click", () => {
      // Verifica se já existe um input de busca
      let searchInput = document.querySelector(".search-input");

      if (!searchInput) {
        // Cria um novo input de busca
        searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "search-input";
        searchInput.placeholder = "Buscar séries ou filmes...";

        // Define estilos para posicionar o input
        searchInput.style.position = "absolute";
        searchInput.style.top = "50%";
        searchInput.style.right = "60px";
        searchInput.style.transform = "translateY(-50%)";
        searchInput.style.width = "200px";
        searchInput.style.padding = "5px 10px";
        searchInput.style.border = "1px solid #ccc";
        searchInput.style.borderRadius = "4px";
        searchInput.style.background = "#fff";
        searchInput.style.color = "#000";

        // Adiciona o input ao pai do ícone
        searchIcon.parentElement.appendChild(searchInput);

        // Foca no input
        searchInput.focus();

        // Adiciona um event listener para mudanças no input
        searchInput.addEventListener("input", (e) => {
          // Obtém o valor do input em minúsculas
          const query = e.target.value.toLowerCase();

          // Lógica simples de busca (placeholder)
          console.log("Buscando:", query);

          // Aqui você pode implementar filtro nos carrosséis
        });
      } else {
        // Remove o input se já existir
        searchInput.remove();
      }
    });
  }

  // Seleciona o container principal
  const container = document.getElementById("main-content");

  if (container) {
    // Para cada categoria, cria um carrossel e adiciona ao container
    categories.forEach((category) => {
      const carousel = createCarousel(category);
      container.appendChild(carousel);
    });
  }
});
