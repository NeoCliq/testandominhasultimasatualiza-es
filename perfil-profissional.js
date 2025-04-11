const overlay = document.getElementById("overlay");
let startY = 0;
let currentHeight = 50;
let isSliding = false;
let lastMove = 0;
let requestId = null;

//* Calendário
// Função para verificar se o ano é bissexto
function isBissexto(ano) {
  return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
}

// Função para obter o nome do mês atual
const nomeDosMeses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const mesAtual = new Date().getMonth();
const nomeMesAtual = nomeDosMeses[mesAtual];

document.getElementById("mes-atual-nome").textContent = nomeMesAtual;

document
  .getElementById("selecionando-meses-btn")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    const opcoes = document.getElementById("selecionando-meses-opcoes");
    opcoes.style.display = opcoes.style.display === "block" ? "none" : "block";
  });

const opcoesMeses = document.querySelectorAll(".selecionando-meses-opcoes li");
opcoesMeses.forEach(function (opcao) {
  opcao.addEventListener("click", function () {
    const mesEscolhido = this.getAttribute("data-mes");
    document.getElementById("mes-atual-nome").textContent = mesEscolhido;
    document.getElementById("selecionando-meses-opcoes").style.display = "none";
    atualizarDiasDoMes(mesEscolhido);
  });
});

document.addEventListener("click", function (event) {
  const opcoes = document.getElementById("selecionando-meses-opcoes");
  const btn = document.getElementById("selecionando-meses-btn");

  if (!btn.contains(event.target) && !opcoes.contains(event.target)) {
    opcoes.style.display = "none";
  }
});

function exibirDataSelecionada(dia, mes, ano) {
  const nomeDosMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const data = new Date(ano, nomeDosMeses.indexOf(mes), dia);
  const opcoes = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const dataFormatada = data.toLocaleDateString("pt-BR", opcoes);

  document.getElementById("data-selecionada").textContent = dataFormatada;
}

function atualizarDiasDoMes(mes) {
  const diasContainer = document.getElementById("dias-container");
  diasContainer.innerHTML = "";

  const anoAtual = new Date().getFullYear();
  let diasNoMes;
  const data = new Date(anoAtual, nomeDosMeses.indexOf(mes), 1);
  const diaDaSemana = data.getDay();

  switch (mes) {
    case "Janeiro":
    case "Março":
    case "Maio":
    case "Julho":
    case "Agosto":
    case "Outubro":
    case "Dezembro":
      diasNoMes = 31;
      break;
    case "Abril":
    case "Junho":
    case "Setembro":
    case "Novembro":
      diasNoMes = 30;
      break;
    case "Fevereiro":
      diasNoMes = isBissexto(anoAtual) ? 29 : 28;
      break;
    default:
      diasNoMes = 30;
  }

  for (let i = 1; i <= diasNoMes; i++) {
    const diaElemento = document.createElement("div");
    diaElemento.classList.add("dia-container");
    diaElemento.setAttribute("data-dia", i);

    // Adiciona a classe "dia-atual" se for o dia atual
    if (i === new Date().getDate() && nomeMesAtual === mes) {
      diaElemento.classList.add("dia-atual");
    }

    diaElemento.addEventListener("click", function () {
      // Verifica se o dia já está marcado
      if (diaElemento.classList.contains("ativo")) {
        diaElemento.classList.remove("ativo"); // Desmarca o dia e remove a cor de fundo
        // Se o dia for desmarcado, remove a exibição da data selecionada
        document.getElementById("data-selecionada").textContent = "";
      } else {
        // Remove a classe "ativo" de todos os dias
        const diasMarcados = document.querySelectorAll(".dia-container.ativo");
        diasMarcados.forEach(dia => dia.classList.remove("ativo"));

        // Marca o dia selecionado
        diaElemento.classList.add("ativo");
        // Exibe a data formatada
        exibirDataSelecionada(i, mes, anoAtual);
      }
    });

    const nomeDia = new Date(anoAtual, nomeDosMeses.indexOf(mes), i)
      .toLocaleString("pt-BR", { weekday: "short" })
      .toUpperCase();

    diaElemento.innerHTML = `
        <div class="dia-nome">${nomeDia}</div>
        <div class="dia-numero">${i}</div>
      `;
    diasContainer.appendChild(diaElemento);
  }
}

// Inicializa o calendário com o mês atual
atualizarDiasDoMes(nomeMesAtual);
//* Calendário
overlay.addEventListener("touchstart", e => {
  isSliding = true;
  startY = e.touches[0].clientY;
  lastMove = startY;
});

overlay.addEventListener("touchmove", e => {
  if (isSliding) {
    const touchMoveY = e.touches[0].clientY;
    const moveDistance = lastMove - touchMoveY;

    if (moveDistance !== 0) {
      currentHeight = Math.min(
        100,
        Math.max(50, currentHeight + (moveDistance / window.innerHeight) * 100)
      );
      overlay.style.height = `${currentHeight}%`;
    }

    lastMove = touchMoveY;
  }
});

function smoothTransition() {
  if (currentHeight > 75) {
    overlay.classList.add("expanded");
    overlay.style.height = "100%";
  } else if (currentHeight < 45) {
    overlay.classList.remove("expanded");
    overlay.style.height = "45%";
  } else {
    overlay.classList.remove("expanded");
    overlay.style.height = "45%";
  }
}

overlay.addEventListener("touchend", () => {
  isSliding = false;
  if (requestId) cancelAnimationFrame(requestId);
  requestId = requestAnimationFrame(smoothTransition);
});

document.getElementById("favoriteButton").addEventListener("click", () => {
  alert("Adicionado aos favoritos!");
});

// Referências aos elementos
// Referências aos elementos

// Botão selecionars

// Referências aos elementos
// Referências aos elementos
const servicosButton = document.getElementById("servicosButton");
const popupWindow = document.getElementById("popupWindow");
const popupOverlay = document.getElementById("popupOverlay");
const closeBtn = document.getElementById("closeBtn");
const servicesForm = document.getElementById("servicesForm");

// Função para contar o número de checkboxes selecionados
function getSelectedCount() {
  const checkboxes = servicesForm.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  return checkboxes.length;
}

// Função para atualizar o texto do botão com o número de seleções
function updateButtonText() {
  const selectedCount = getSelectedCount();
  if (selectedCount > 0) {
    servicosButton.textContent = `Selecionado: ${selectedCount}`;
    servicosButton.classList.add("selected");
  } else {
    servicosButton.textContent = "Selecione";
    servicosButton.classList.remove("selected");
  }
}

// Função para abrir o pop-up
servicosButton.addEventListener("click", function () {
  popupWindow.style.display = "block";
  popupOverlay.style.display = "block";
});

// Função para fechar o pop-up
closeBtn.addEventListener("click", function () {
  popupWindow.style.display = "none";
  popupOverlay.style.display = "none";

  // Atualizando o texto do botão com a quantidade de seleções
  updateButtonText();
});

// Fechar o pop-up ao clicar fora dele (na área de sobreposição)
popupOverlay.addEventListener("click", function () {
  popupWindow.style.display = "none";
  popupOverlay.style.display = "none";

  // Atualizando o texto do botão com a quantidade de seleções
  updateButtonText();
});

// Adicionar evento de mudança para os checkboxes
const checkboxes = servicesForm.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", function () {
    updateButtonText(); // Atualizar o texto sempre que o usuário marcar ou desmarcar uma opção
  });
});
//
const servicosSelecionados = [];
const servicosCheckboxes = document.querySelectorAll(
  'input[name="service"]:checked'
);

servicosCheckboxes.forEach(checkbox => {
  servicosSelecionados.push(checkbox.value);
});

if (servicosSelecionados.length > 0) {
  document.getElementById(
    "confirmacao-servicos"
  ).textContent = `Serviços: ${servicosSelecionados.join(", ")}`;
}

//
//
//
//
//Puxar email, nome e telefone do localstorage
//
// Função para buscar o nome do usuário no backend
async function fetchUserData() {
  try {
    const userEmail = localStorage.getItem("userEmail"); // Pega o email armazenado no localStorage
    if (!userEmail) {
      console.error("Usuário não encontrado no localStorage!");
      return;
    }

    // Fazer a requisição para pegar o nome do usuário
    const response = await fetch(
      `https://backen-neocliq.onrender.com/profile?email=${encodeURIComponent(
        userEmail
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao buscar perfil do usuário:", response.statusText);
      return;
    }

    // Parse do JSON retornado do backend
    const data = await response.json();
    const nomeUsuario = data.name || ""; // Se não encontrar nome, exibe "Usuário"
    const telefoneUsuario = data.phone || ""; // Telefone

    // Atualiza os elementos da página com os dados recebidos
    document.getElementById("nomeUsuario").textContent = nomeUsuario;
    document.getElementById("telefoneUsuario").textContent = telefoneUsuario;

    // Salva os dados no localStorage para facilitar o preenchimento futuro
    localStorage.setItem(
      "userData",
      JSON.stringify({
        email: userEmail,
        name: nomeUsuario,
        phone: telefoneUsuario,
      })
    );
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error);
  }
}

// Função para exibir/ocultar o formulário de edição
function toggleEditForm() {
  const editForm = document.getElementById("editForm");
  const overlay = document.getElementById("overlay-user");
  const isVisible = editForm.style.display === "block";
  editForm.style.display = isVisible ? "none" : "block";
  overlay.style.display = isVisible ? "none" : "block";

  // Preencher os campos de edição com os dados atuais do localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    document.getElementById("editNomeUsuario").value = userData.name;
    document.getElementById("editTelefone").value = userData.phone;
  }
}

// Lógica para editar e salvar os dados localmente
document.getElementById("editUserForm").onsubmit = function (event) {
  event.preventDefault();

  const nomeUsuario = document.getElementById("editNomeUsuario").value;
  const telefone = document.getElementById("editTelefone").value;

  // Atualiza os campos principais com os novos valores
  document.getElementById("nomeUsuario").textContent = nomeUsuario;
  document.getElementById("telefoneUsuario").textContent = telefone;

  // Atualiza os dados no localStorage
  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        email: userEmail,
        name: nomeUsuario,
        phone: telefone,
      })
    );
  }

  // Fecha o formulário de edição
  toggleEditForm();
};

// Chama a função para buscar os dados do usuário ao carregar a página
window.onload = fetchUserData;

//
//
//
// Seleção de todos os botões de horário
// Seleção de todos os itens de horário (li)
const horarios = document.querySelectorAll(".conjunto-botoes-horario li");

// Variável para armazenar o horário selecionado
let horarioSelecionado = null;

// Função para alternar o estado de "selecionado"
horarios.forEach(hora => {
  hora.addEventListener("click", () => {
    // Se o item de horário já estiver selecionado, remove a seleção
    if (hora.classList.contains("selecionado")) {
      hora.classList.remove("selecionado");
      horarioSelecionado = null; // Desmarcando o horário
    } else {
      // Caso contrário, desmarque outros itens e marque o item clicado
      horarios.forEach(h => h.classList.remove("selecionado"));
      hora.classList.add("selecionado");
      horarioSelecionado = hora.getAttribute("data-hora"); // Armazena o horário selecionado
    }
  });
});

//

//
//
//
//
//
//atendimento online ou presencial
// Função para alternar a visibilidade das opções
function toggleOptions(event) {
  const optionsContainer = document.getElementById("options-container");
  // Previne que o clique no botão feche o menu
  event.stopPropagation();

  // Alterna a visibilidade
  if (optionsContainer.style.display === "block") {
    optionsContainer.style.display = "none";
  } else {
    optionsContainer.style.display = "block";
  }
}

// Função para fechar o menu se o clique for fora do menu
document.addEventListener("click", function (event) {
  const optionsContainer = document.getElementById("options-container");
  const atendimentoBtn = document.querySelector(".atendimento-btn");

  // Verifica se o clique foi fora do menu e do botão
  if (
    !optionsContainer.contains(event.target) &&
    event.target !== atendimentoBtn
  ) {
    optionsContainer.style.display = "none";
  }
});

// Função para escolher a opção e atualizar o texto
function chooseOption(option) {
  const selectedOptionText = document.getElementById("selected-option-text");
  selectedOptionText.textContent = option; // Atualiza o texto com a opção escolhida

  // Fecha as opções após a escolha
  document.getElementById("options-container").style.display = "none";
}

//
//
// Captura a forma de pagamento selecionada
const formaPagamento = document.querySelector(
  'input[name="forma-pagamento"]:checked'
);

// Se uma forma de pagamento estiver selecionada
if (formaPagamento) {
  document.getElementById(
    "confirmacao-pagamento"
  ).textContent = `Forma de Pagamento: ${formaPagamento.value}`;
}

//
//
//tela de confirmação
// Referências aos elementos
// Função para abrir o popup de confirmação
// Função para abrir o popup de confirmação
// Função para abrir o popup de confirmação
let formaAtendimentoSelecionada = null;

// Função para alternar entre as opções de forma de atendimento
function toggleOptions(event) {
  const container = document.getElementById("options-container");
  container.style.display =
    container.style.display === "none" ? "block" : "none";
}

// Função para escolher a opção de atendimento
function chooseOption(opcao) {
  formaAtendimentoSelecionada = opcao;
  const button = document.querySelector(".atendimento-btn");
  button.innerText = `Forma de atendimento: ${opcao}`;
  const container = document.getElementById("options-container");
  container.style.display = "none"; // Esconde as opções após a escolha
}

// Função para abrir o popup de confirmação
function abrirPopupConfirmacao() {
  // Mostrar a tela de confirmação
  const popup = document.getElementById("ultima-tela-confirmacao");
  popup.style.display = "block"; // Torna o popup visível

  // Definir os dados na tela de confirmação
  document.getElementById("confirmacao-nome").innerText =
    "Nome: " + document.getElementById("nomeUsuario").innerText;

  // Definir os dados na tela de confirmação
  document.getElementById("confirmacao-telefone").innerText =
    "Telefone: " + document.getElementById("telefoneUsuario").innerText;
  document.getElementById("confirmacao-data").innerText =
    "Data: " + document.getElementById("data-selecionada").innerText;

  // Captura o horário selecionado
  // Usar a variável `horarioSelecionado` que já foi definida anteriormente
  document.getElementById("confirmacao-horario").innerText = horarioSelecionado
    ? "Horário: " + horarioSelecionado
    : "Horário: Não selecionado";

  // Captura os serviços selecionados
  const servicosSelecionados = obterServicosSelecionados();
  document.getElementById("confirmacao-servicos").innerText =
    servicosSelecionados.length > 0
      ? "Serviços: " + servicosSelecionados.join(", ")
      : "Serviços: Nenhum serviço selecionado";

  // Captura a forma de pagamento selecionada
  const formaPagamento = document.querySelector(
    'input[name="forma-pagamento"]:checked'
  );
  document.getElementById("confirmacao-pagamento").innerText = formaPagamento
    ? "Forma de pagamento: " + formaPagamento.value
    : "Forma de pagamento: Não selecionada";

  // Exibir a forma de atendimento no popup
  document.getElementById("confirmacao-atendimento").innerText =
    formaAtendimentoSelecionada
      ? "Forma de Atendimento: " + formaAtendimentoSelecionada
      : "Forma de Atendimento: Não selecionada";
}

// Função para obter os serviços selecionados
function obterServicosSelecionados() {
  const checkboxes = document.querySelectorAll(
    '#servicesForm input[type="checkbox"]:checked'
  );
  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Função para fechar o popup de confirmação
function fecharPopupConfirmacao() {
  const popup = document.getElementById("ultima-tela-confirmacao");
  popup.style.display = "none"; // Esconde o popup
}

// Evento para o botão de confirmar agendamento
document
  .getElementById("confirmar-agendamento")
  .addEventListener("click", function () {
    alert("Agendamento confirmado!");
    fecharPopupConfirmacao(); // Fecha o popup após confirmação
  });

// Evento para o botão de cancelar agendamento
document
  .getElementById("cancelar-agendamento")
  .addEventListener("click", fecharPopupConfirmacao);

// Exemplo de ativar o popup de confirmação
document
  .getElementById("button")
  .addEventListener("click", abrirPopupConfirmacao);

// Adicionando a classe "selected" ao horário selecionado
const horarioItems = document.querySelectorAll(
  "#botaoHorario .conjunto-botoes-horario li"
);
horarioItems.forEach(item => {
  item.addEventListener("click", function () {
    // Remove a classe "selected" de todos os itens
    horarioItems.forEach(li => li.classList.remove("selected"));
    // Adiciona a classe "selected" ao item clicado
    item.classList.add("selected");
  });
});
