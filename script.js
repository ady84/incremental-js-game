const gameData = {
    totalAmount: 0,
    incrementBtnPower: 1,
};

const totalAmountText = document.querySelector("#total-amount");
const incrementBtn = document.querySelector("#increment-btn");

incrementBtn.addEventListener("click", () => {
    gameData.totalAmount += gameData.incrementBtnPower;
    totalAmountText.textContent = gameData.totalAmount;
});