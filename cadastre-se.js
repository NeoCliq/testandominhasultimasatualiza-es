// Função para cadastrar o usuário
async function signUp(event) {
  event.preventDefault(); // Impede envio tradicional do formulário

  // Captura os valores do formulário
  const name = document.querySelector('input[name="name"]').value.trim();
  const surname = document.querySelector('input[name="surname"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value;
  const confirmPassword = document.querySelector(
    'input[name="confirm_password"]'
  ).value;

  // Adiciona valor fixo para "tipo"
  const tipo = "consumidor";

  // Validação básica
  if (!name || !surname || !email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const response = await fetch(
      "https://backen-neocliq.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password, tipo }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao cadastrar usuário.");
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "../pages/login.html"; // Redireciona após sucesso
  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert("Erro ao cadastrar: " + error.message);
  }
}

// Escuta o envio do formulário
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  if (form) {
    form.addEventListener("submit", signUp);
  } else {
    console.error("Formulário de cadastro não encontrado.");
  }
});
