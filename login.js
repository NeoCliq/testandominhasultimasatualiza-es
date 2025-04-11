const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", async e => {
  e.preventDefault();

  // Obtendo os valores do formulário
  const email = emailInput.value;
  const password = passwordInput.value;

  // Definindo a URL da API
  const url = "https://backen-neocliq.onrender.com/login";

  // Verificando se os campos de email e senha estão preenchidos
  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const loginData = { email, password };

  try {
    // Enviando a requisição para o backend
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    // Verificando se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro no login:", errorData);
      alert(`Erro: ${errorData.error}`);
      return;
    }

    // Caso o login seja bem-sucedido, podemos redirecionar para outra página
    const responseData = await response.json();
    console.log("Login bem-sucedido:", responseData);
    alert("Login realizado com sucesso!");

    localStorage.setItem("userEmail", email);

    // Exemplo de redirecionamento após login bem-sucedido
    window.location.href = "teste-2.html"; // Redirecionar para a página inicial ou área do usuário
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Ocorreu um erro ao tentar fazer o login. Tente novamente.");
  }
});
