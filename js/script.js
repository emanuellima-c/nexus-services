/* =========================================================
   CHAMA Serviços — script.js
   Login demonstrativo, renderização de listas e PWA hooks.
   ========================================================= */

// ---------- Login ----------

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (email && senha) {
      localStorage.setItem("chama_usuario", email);
      window.location.href = "index.html";
    } else {
      alert("Preencha e-mail e senha para entrar.");
    }
  });
}

// ---------- Marca o link ativo no menu ----------

(function marcarLinkAtivo() {
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".topbar nav a").forEach((link) => {
    if (link.getAttribute("href") === paginaAtual) {
      link.classList.add("active");
    }
  });
})();

// ---------- Lista de serviços (servicos.html) ----------

const proGrid = document.getElementById("proGrid");

if (proGrid && typeof PROFISSIONAIS !== "undefined") {
  const filterContainer = document.getElementById("filterChips");
  const categorias = ["Todos", ...new Set(PROFISSIONAIS.map((p) => p.categoria))];
  let categoriaAtiva = "Todos";

  function renderChips() {
    filterContainer.innerHTML = "";
    categorias.forEach((cat) => {
      const chip = document.createElement("button");
      chip.className = "filter-chip" + (cat === categoriaAtiva ? " active" : "");
      chip.type = "button";
      chip.textContent = cat;
      chip.addEventListener("click", () => {
        categoriaAtiva = cat;
        renderChips();
        renderGrid();
      });
      filterContainer.appendChild(chip);
    });
  }

  function renderGrid() {
    const lista =
      categoriaAtiva === "Todos"
        ? PROFISSIONAIS
        : PROFISSIONAIS.filter((p) => p.categoria === categoriaAtiva);

    if (lista.length === 0) {
      proGrid.innerHTML = `<p class="no-results">Nenhum profissional encontrado nessa categoria ainda.</p>`;
      return;
    }

    proGrid.innerHTML = lista
      .map(
        (p) => `
        <div class="pro-card corner-card">
          <div class="pro-card-top">
            <div class="pro-avatar">${p.icone}</div>
            <div>
              <h3>${p.nome}</h3>
              <div class="categoria">${p.categoria}</div>
            </div>
          </div>
          <p class="sobre">${p.sobre}</p>
          <div class="tag-list">
            ${p.tags.slice(0, 3).map((t) => `<span class="tag-pill">${t}</span>`).join("")}
          </div>
          <div class="pro-meta">
            <span class="rating">⭐ ${p.nota.toFixed(1)} · ${p.avaliacoes} avaliações</span>
            <span>${p.cidade}</span>
          </div>
          <a href="detalhes.html?id=${p.id}" class="btn-primary">Ver profissional</a>
        </div>
      `
      )
      .join("");
  }

  renderChips();
  renderGrid();
}

// ---------- Página de detalhes (detalhes.html) ----------

const detailWrap = document.getElementById("detailContent");

if (detailWrap && typeof getProfissionalPorId !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const pro = getProfissionalPorId(id) || PROFISSIONAIS[0];

  detailWrap.innerHTML = `
    <div class="detail-head">
      <div class="detail-avatar">${pro.icone}</div>
      <div>
        <h1>${pro.nome}</h1>
        <div class="categoria">${pro.categoria}</div>
      </div>
    </div>

    <div class="detail-stats">
      <div class="stat">
        <span class="num">⭐ ${pro.nota.toFixed(1)}</span>
        <span class="label">${pro.avaliacoes} avaliações</span>
      </div>
      <div class="stat">
        <span class="num">📍</span>
        <span class="label">${pro.cidade}</span>
      </div>
      <div class="stat">
        <span class="num">💰</span>
        <span class="label">${pro.precoBase}</span>
      </div>
    </div>

    <div class="detail-section">
      <h2>Sobre</h2>
      <p>${pro.sobre}</p>
    </div>

    <div class="detail-section">
      <h2>Especialidades</h2>
      <div class="tag-list">
        ${pro.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}
      </div>
    </div>

    <div class="detail-actions">
      <button class="btn-primary" id="btnSolicitar">Solicitar serviço</button>
      <a href="servicos.html" class="btn-secondary">Ver outros profissionais</a>
    </div>

    <div class="confirm-banner" id="confirmBanner">
      ✅ Solicitação enviada! ${pro.nome.split(" ")[0]} costuma responder em poucos minutos.
    </div>
  `;

  document.getElementById("btnSolicitar").addEventListener("click", () => {
    document.getElementById("confirmBanner").classList.add("show");
  });
}

// ---------- Perfil (perfil.html) ----------

const profileEmail = document.getElementById("usuario");

if (profileEmail) {
  const usuario = localStorage.getItem("chama_usuario");
  profileEmail.textContent = usuario || "Visitante";

  const initialEl = document.getElementById("profileInitial");
  if (initialEl) {
    initialEl.textContent = usuario ? usuario.charAt(0).toUpperCase() : "?";
  }
}

function logout() {
  localStorage.removeItem("chama_usuario");
  window.location.href = "login.html";
}

// ---------- PWA: registrar Service Worker ----------

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // Falha silenciosa: continua funcionando sem cache offline.
    });
  });
}

// ---------- PWA: banner de instalação ----------

let deferredPrompt;
const installBanner = document.getElementById("installBanner");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  if (installBanner) installBanner.classList.add("show");
});

const installYes = document.getElementById("installYes");
const installNo = document.getElementById("installNo");

if (installYes) {
  installYes.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBanner.classList.remove("show");
  });
}

if (installNo) {
  installNo.addEventListener("click", () => {
    installBanner.classList.remove("show");
  });
}
