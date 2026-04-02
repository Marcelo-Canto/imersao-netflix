// Seleciona o botão de alternância de tema e o elemento raiz do documento para propriedades customizadas CSS
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

// Definição das paletas de cores para os temas dark e light
const themes = {
  dark: {
    "--netflix-black": "#000000",
    "--netflix-dark-gray": "#141414",
    "--netflix-gray": "#333333",
    "--netflix-light-gray": "#666666",
    "--netflix-white": "#ffffff",
    "--netflix-text-gray": "#cccccc",
    background: "linear-gradient(135deg, #000000 0%, #141414 100%)",
    color: "#ffffff",
  },
  light: {
    "--netflix-black": "#ffffff",
    "--netflix-dark-gray": "#f5f5f5",
    "--netflix-gray": "#e0e0e0",
    "--netflix-light-gray": "#c2c2c2",
    "--netflix-white": "#111111",
    "--netflix-text-gray": "#333333",
    background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
    color: "#111111",
  },
};

// Função para aplicar o tema selecionado
const applyTheme = (theme) => {
  // Seleciona o tema ou usa dark como padrão
  const selected = themes[theme] || themes.dark;

  // Para cada propriedade no tema, aplica no CSS
  Object.entries(selected).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      root.style.setProperty(key, value); // Define variável CSS
    } else {
      document.body.style[key] = value; // Define estilo inline no body
    }
  });

  // Alterna as classes do body para light ou dark mode
  document.body.classList.toggle("light-mode", theme === "light");
  document.body.classList.toggle("dark-mode", theme === "dark");

  // Muda o texto do botão de toggle
  themeToggle.textContent = theme === "light" ? "☀️" : "🌙";

  // Define o atributo aria-label para acessibilidade
  themeToggle.setAttribute(
    "aria-label",
    theme === "light" ? "Tema claro ativo" : "Tema escuro ativo",
  );

  // Salva o tema no localStorage
  localStorage.setItem("theme", theme);
};

// Obtém o tema atual salvo ou usa dark como padrão
const currentTheme = localStorage.getItem("theme") || "dark";
applyTheme(currentTheme);

// Se o botão de toggle existe, adiciona event listener para alternar tema
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    // Alterna entre light e dark
    const nextTheme =
      localStorage.getItem("theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  });
}

// ===== PERFIS =====

// Chaves para armazenar perfis no localStorage
const profilesKey = "netflixProfiles";
const activeProfileNameKey = "perfilAtivoNome";
const activeProfileAvatarKey = "perfilAtivoImagem";

// Perfis padrão
const defaultProfiles = [
  { id: 1, name: "Berlim", avatar: "assets/perfil-1.png" },
  { id: 2, name: "Gi-Hun", avatar: "assets/perfil-2.png" },
  { id: 3, name: "Eleven", avatar: "assets/perfil-3.png" },
  { id: 4, name: "Max", avatar: "assets/perfil-4.png" },
];

// Lista de avatares do pack
const packAvatars = [
  "1 - zBr1CQ3.png",
  "2 - WM6zTNc.png",
  "3 - fPFQZP6.png",
  "4 - xyYlCNi.png",
  "9 - bQYJ3j2.png",
  "12 - U5Aima9.png",
  "15 - GyGZmke.png",
  "18 - ZAyj3n2.png",
  "24 - XTIFwVV.png",
  "30 - bBKeCVv.png",
  "40 - JTlCoLo.png",
  "50 - g1c0Dnd.png",
  "60 - siylyIN.png",
  "70 - NkseE8G.png",
  "80 - CjMherY.png",
  "90 - JdYIFkw.png",
  "100 - wNuh9Ba.png",
  "110 - I9thsGH.png",
  "120 - QLAh0E5.png",
  "130 - 6NDpYkk.png",
];

// Seleciona o elemento da lista de perfis
const profileListEl = document.getElementById("profiles-list");

// Seleciona o botão de gerenciar perfis
const manageBtn = document.getElementById("manage-profiles-btn");
const managerPanel = document.getElementById("profile-manager");
const closeManagerBtn = document.getElementById("close-manager-btn");
const profilesAdminList = document.getElementById("profiles-admin-list");
const avatarGallery = document.getElementById("avatar-gallery");
const profileForm = document.getElementById("profile-form");
const profileNameInput = document.getElementById("profile-name");
const profileIdInput = document.getElementById("profile-id");
const saveProfileBtn = document.getElementById("save-profile-btn");

const encodeAsset = (name) => `assets/pack/${encodeURIComponent(name)}`;

const getProfiles = () => {
  try {
    const raw = localStorage.getItem(profilesKey);
    if (!raw) {
      setProfiles(defaultProfiles);
      return [...defaultProfiles];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 4) {
      setProfiles(defaultProfiles);
      return [...defaultProfiles];
    }
    const fixed = parsed
      .slice(0, 4)
      .sort((a, b) => a.id - b.id)
      .map((p) => ({ id: p.id, name: p.name, avatar: p.avatar }));
    return fixed;
  } catch (e) {
    console.warn("Falha ao ler perfis do storage, carregando default", e);
    setProfiles(defaultProfiles);
    return [...defaultProfiles];
  }
};

const setProfiles = (profiles) => {
  // mantém apenas 4 perfis em ordem por id e evita exclusão/adição
  const fixed = profiles
    .slice(0, 4)
    .sort((a, b) => a.id - b.id)
    .map((p) => ({ id: p.id, name: p.name, avatar: p.avatar }));

  if (fixed.length !== 4) {
    localStorage.setItem(profilesKey, JSON.stringify(defaultProfiles));
  } else {
    localStorage.setItem(profilesKey, JSON.stringify(fixed));
  }
};

const setActiveProfile = (profile) => {
  localStorage.setItem(activeProfileNameKey, profile.name);
  localStorage.setItem(activeProfileAvatarKey, profile.avatar);
  window.location.href = "catalogo/catalogo.html";
};

const renderMainProfiles = () => {
  const profiles = getProfiles();
  profileListEl.innerHTML = "";

  profiles.forEach((profile) => {
    const item = document.createElement("li");
    item.className = "profile";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "profile-link";
    button.setAttribute("aria-label", `Entrar com ${profile.name}`);

    button.innerHTML = `
      <img src="${profile.avatar}" alt="Avatar ${profile.name}" />
      <p class="profile-name">${profile.name}</p>
    `;

    button.addEventListener("click", () => setActiveProfile(profile));

    item.appendChild(button);
    profileListEl.appendChild(item);
  });
};

const renderAvatarGallery = (selectedAvatar) => {
  avatarGallery.innerHTML = "";

  packAvatars.forEach((filename) => {
    const img = document.createElement("img");
    img.src = encodeAsset(filename);
    img.alt = `Avatar ${filename}`;
    img.className = "profile-avatar-option";
    img.style.cursor = "pointer";
    img.style.width = "72px";
    img.style.height = "72px";
    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
    img.style.border = "2px solid transparent";

    if (selectedAvatar === img.src) {
      img.style.borderColor = "#e50914";
    }

    img.addEventListener("click", () => {
      document.querySelectorAll(".profile-avatar-option").forEach((n) => {
        n.style.borderColor = "transparent";
      });
      img.style.borderColor = "#e50914";
      img.dataset.selected = "true";
      profileForm.dataset.selectedAvatar = img.src;
    });

    avatarGallery.appendChild(img);
  });
};

const renderAdminProfiles = () => {
  const profiles = getProfiles();
  profilesAdminList.innerHTML = "";

  profiles.forEach((profile) => {
    const li = document.createElement("li");
    li.className = "profile-admin-item";

    li.innerHTML = `
      <img src="${profile.avatar}" alt="${profile.name}">
      <span>${profile.name}</span>
    `;

    li.addEventListener("click", () => {
      // remove seleção anterior
      document.querySelectorAll(".profile-admin-item").forEach((item) => {
        item.classList.remove("selected");
      });
      // destaca o selecionado
      li.classList.add("selected");

      profileIdInput.value = profile.id;
      profileNameInput.value = profile.name;
      profileForm.dataset.selectedAvatar = profile.avatar;
      renderAvatarGallery(profile.avatar);

      // mostra o formulário
      profileForm.classList.remove("hidden");
      profileNameInput.focus();
    });

    profilesAdminList.appendChild(li);
  });
};

const resetProfileForm = () => {
  profileIdInput.value = "";
  profileNameInput.value = "";
  profileForm.dataset.selectedAvatar = "";
  profileForm.classList.add("hidden");

  // remove destaques
  document.querySelectorAll(".profile-admin-item").forEach((item) => {
    item.classList.remove("selected");
  });

  renderAvatarGallery("");
};

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = profileNameInput.value.trim();
  const avatar = profileForm.dataset.selectedAvatar || "assets/perfil-1.png";

  if (!name) {
    alert("Digite um nome válido para o perfil.");
    return;
  }

  const profiles = getProfiles();
  const existingId = Number(profileIdInput.value);

  if (!existingId) {
    alert("Selecione um perfil na lista de gerência para editar.");
    return;
  }

  const index = profiles.findIndex((p) => p.id === existingId);
  if (index === -1) {
    alert("Perfil não encontrado para edição.");
    return;
  }

  const oldName = profiles[index].name;
  profiles[index] = { id: existingId, name, avatar };

  setProfiles(profiles);

  // se o perfil editado era o ativo, atualiza o localStorage
  if (localStorage.getItem(activeProfileNameKey) === oldName) {
    localStorage.setItem(activeProfileNameKey, name);
    localStorage.setItem(activeProfileAvatarKey, avatar);
  }

  renderMainProfiles();
  renderAdminProfiles();
  resetProfileForm();
});

manageBtn.addEventListener("click", () => {
  managerPanel.classList.remove("hidden");
  managerPanel.setAttribute("aria-hidden", "false");
  renderAdminProfiles();
  renderAvatarGallery("");
  resetProfileForm(); // garante form oculto
});

closeManagerBtn.addEventListener("click", () => {
  managerPanel.classList.add("hidden");
  managerPanel.setAttribute("aria-hidden", "true");
  resetProfileForm();
});

// inicialização
renderMainProfiles();
renderAvatarGallery("");

// Se não houver perfil ativo usa o primeiro disponível
if (!localStorage.getItem(activeProfileNameKey)) {
  const first = getProfiles()[0];
  if (first) {
    localStorage.setItem(activeProfileNameKey, first.name);
    localStorage.setItem(activeProfileAvatarKey, first.avatar);
  }
}
