document.addEventListener("DOMContentLoaded", () => {
  // Executa quando o documento estiver completamente carregado.

  // ----- Seleção de Elementos do DOM -----
  const overlay = document.getElementById("overlay");
  // Elemento que representa o overlay (modal) de edição do perfil.

  const closeOverlayButton = document.getElementById("close-overlay");
  // Botão (ou span) que fecha o overlay.

  const informacoesPessoais = document.getElementById("informacoes-pessoais");
  // Elemento que, ao ser clicado, abre o overlay para editar as informações pessoais.

  const salvarButton = document.getElementById("salvar");
  // Botão que dispara a atualização do perfil.

  // ----- Seleção dos Campos do Formulário de Perfil -----
  const nomeCompletoInput = document.getElementById("nome-completo");
  const emailInput = document.getElementById("email");
  const telefoneInput = document.getElementById("telefone");
  const dataNascimentoInput = document.getElementById("data-nascimento");
  // Campos de entrada para nome, email, telefone e data de nascimento.

  // ----- Seleção dos Elementos para a Foto do Perfil -----
  const fotoCirculo2 = document.getElementById("foto-circulo2");
  // Elemento (div) dentro do overlay para alteração da foto (interativo).

  const fotoCirculo = document.getElementById("foto-circulo");
  // Elemento (div) fixo que exibe a foto do perfil fora do overlay.

  const inputFoto = document.getElementById("input-foto");
  // Input de arquivo (oculto) usado para selecionar a nova foto do perfil.

  // ----- Variáveis de Controle -----
  let fotoPerfil = null;
  // Armazena a URL da foto do perfil (pode vir do upload ou do banco).

  let hasChanges = false;
  // Indicador para controlar se houveram alterações (pode ser usado para prevenir salvar sem mudança).

  // ----- Seleção dos Elementos da Mensagem de Confirmação -----
  const confirmacaoSalvar = document.getElementById("confirmacao-salvar");
  const fecharSalvarButton = document.getElementById("fechar-salvar");
  // Elementos para exibir mensagem de sucesso quando o perfil for atualizado.

  // ----- Recupera Email do Usuário -----
  const userEmail = localStorage.getItem("userEmail");
  // Pega o email salvo (por exemplo, logo após login) do localStorage.
  if (!userEmail) {
    console.error("Email do usuário não encontrado!");
    alert("Erro: Email do usuário não encontrado. Faça login novamente.");
    return;
  }

  // ----- Função para Buscar Perfil do Usuário -----
  async function fetchProfile() {
    try {
      const response = await fetch(
        `https://backen-neocliq.onrender.com/profile?email=${encodeURIComponent(
          userEmail
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        console.error("Erro ao buscar perfil:", response.statusText);
        return;
      }
      const data = await response.json();
      console.log("Dados do perfil retornados:", data);

      // Atualiza os campos do formulário
      nomeCompletoInput.value = `${data.name || ""} ${
        data.surname || ""
      }`.trim();

      emailInput.value = data.email || "";
      telefoneInput.value = data.phone || "";
      dataNascimentoInput.value = data.dataNascimento || "";

      const imagemPadrao =
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

      // Atualiza ambos os elementos de exibição da foto:
      if (data.foto) {
        fotoCirculo.style.backgroundImage = `url('${data.foto}')`;
        fotoCirculo2.style.backgroundImage = `url('${data.foto}')`;
        fotoPerfil = data.foto;
      } else {
        fotoCirculo.style.backgroundImage = `url('${imagemPadrao}')`;
        fotoCirculo2.style.backgroundImage = `url('${imagemPadrao}')`;
      }

      // Atualiza o nome de usuário exibido no elemento (fora do formulário)
      const nomeUsuarioSpan = document.getElementById("nome-usuario");
      if (nomeUsuarioSpan) {
        nomeUsuarioSpan.textContent = data.name || "Usuário";
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  }
  const nomeCompleto = nomeCompletoInput.value.trim();
  const partes = nomeCompleto.split(" ");

  const firstName = partes.shift() || ""; // Primeiro nome
  const lastName = partes.join(" ") || ""; // Resto vira sobrenome

  // Chama a função para carregar o perfil quando a página inicia
  fetchProfile();

  // ----- Configurações de Abertura e Fechamento do Overlay -----
  informacoesPessoais.addEventListener("click", () => {
    overlay.classList.add("show");
    hasChanges = false;
  });
  closeOverlayButton.addEventListener("click", () => {
    overlay.classList.remove("show");
  });

  // ----- Ação: Clique para Selecionar a Foto (Dentro do Overlay) -----
  fotoCirculo2.addEventListener("click", () => {
    // Simula o clique no input de arquivo para que o usuário possa escolher uma foto.
    inputFoto.click();
  });

  // ----- Upload de Imagem -----
  inputFoto.addEventListener("change", async event => {
    const file = event.target.files[0];
    // Verifica se foi selecionado um arquivo e se é uma imagem.
    if (!file || !file.type.startsWith("image/")) {
      alert("Por favor, selecione uma imagem válida.");
      return;
    }

    // Prepara os dados para envio via FormData.
    const formData = new FormData();
    formData.append("foto", file);
    formData.append("email", userEmail);

    try {
      // Envia a imagem para o endpoint de upload no backend.
      const response = await fetch(
        "https://backen-neocliq.onrender.com/upload-foto",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Erro ao fazer upload da imagem");
      }

      // Após o upload, a URL pública é armazenada e os dois elementos são atualizados.
      fotoPerfil = result.publicUrl;
      fotoCirculo.style.backgroundImage = `url('${fotoPerfil}')`;
      fotoCirculo2.style.backgroundImage = `url('${fotoPerfil}')`;
      console.log("Foto atualizada com sucesso:", fotoPerfil);
    } catch (err) {
      console.error("Erro no upload da imagem:", err.message);
      alert("Erro ao fazer upload da imagem.");
    }
  });

  // ----- Salvar Atualizações do Perfil -----
  salvarButton.addEventListener("click", async () => {
    // Recolhe o valor do campo nome completo e separa em nome e sobrenome
    const nomeCompleto = nomeCompletoInput.value.trim();
    const partes = nomeCompleto.split(" ");
    const name = partes.shift() || ""; // Primeiro nome
    const surname = partes.join(" ") || ""; // Resto como sobrenome

    const phone = telefoneInput.value.trim();
    const dataNascimento = dataNascimentoInput.value;

    // Monta o objeto com os dados atualizados
    const updatedProfile = {
      email: userEmail,
      name,
      surname,
      phone,
      dataNascimento,
      foto: fotoPerfil,
    };

    try {
      const response = await fetch(
        "https://backen-neocliq.onrender.com/profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao atualizar perfil:", errorData);
        alert(
          "Erro ao atualizar perfil: " +
            (errorData.error || "Erro desconhecido")
        );
        return;
      }

      const result = await response.json();
      console.log("Perfil atualizado com sucesso:", result);

      confirmacaoSalvar.style.display = "flex";
      confirmacaoSalvar.classList.add("show");
      setTimeout(() => {
        confirmacaoSalvar.style.display = "none";
        confirmacaoSalvar.classList.remove("show");
      }, 3000);

      overlay.classList.remove("show");
      fetchProfile();
      hasChanges = false;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Ocorreu um erro ao atualizar o perfil. Tente novamente.");
    }
  });

  // ----- Fechar a Mensagem de Confirmação Manualmente -----
  fecharSalvarButton.addEventListener("click", () => {
    confirmacaoSalvar.style.display = "none";
    confirmacaoSalvar.classList.remove("show");
  });
});
