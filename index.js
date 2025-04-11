document.addEventListener("DOMContentLoaded", function () {
  const buttonsContainer = document.querySelector(".buttons-container");
  const buttons = document.querySelectorAll(".btn");

  let currentIndex = 0; // Índice do botão visível
  const totalButtons = buttons.length;

  // Função para mover os botões
  function moveToIndex(index) {
    const offset = -index * (buttons[0].offsetWidth + 20); // 20 é o gap entre os botões
    buttonsContainer.style.transition = "transform 0.5s ease"; // Adiciona transição suave
    buttonsContainer.style.transform = `translateX(${offset}px)`;
  }

  // Intervalo automático para o carrossel
  setInterval(function () {
    currentIndex = (currentIndex + 1) % totalButtons;
    moveToIndex(currentIndex);
  }, 3000); // Altere 3000 para o tempo desejado entre os slides (em milissegundos)

  // Ajuste para continuar a animação sem espaços
  buttonsContainer.addEventListener("transitionend", function () {
    // Verifica se o último botão foi alcançado
    if (currentIndex === totalButtons - 1) {
      // Redefine o carrossel para o início sem animação para manter a continuidade
      setTimeout(function () {
        buttonsContainer.style.transition = "none"; // Remove a transição
        buttonsContainer.style.transform = "translateX(0)"; // Move para o início
        currentIndex = 0; // Redefine o índice para o início
      }, 500); // Atraso para garantir que a animação termine antes de redefinir
    }
  });
});
