const gameData = {
    totalAmount: 0,
    incrementButtonPower: 1,
};

const totalAmountText = document.querySelector("#total-amount");
const incrementButton = document.querySelector("#increment-button");

incrementButton.addEventListener("click", () => {
    gameData.totalAmount += gameData.incrementButtonPower;
    updateDisplay();
});

const upgradeData = {
    upgradePowerCost: 5,
    upgradePowerCost2: 8,
};

function addUpgradeListeners() {
    const upgrades = document.querySelectorAll(".upgrade");
    for (let i = 0; i < upgrades.length; i++) {
        const upgradeButton = upgrades[i].firstElementChild;
        upgradeButton.addEventListener("click", () => {
            let upgradeCost = upgradeData[upgrades[i].lastElementChild.id];
            gameData.totalAmount -= upgradeCost;

            // Raise the linked cost by factor
            upgradeData[upgrades[i].lastElementChild.id] *= parseFloat(upgradeButton.dataset.costFactor);
            
            // Raise the linked upgrade by factor
            gameData[upgradeButton.dataset.upgrade] *= parseFloat(upgradeButton.dataset.upgradeFactor)

            updateDisplay();
        });
    }
}

function displayUpgradeData() {
    const upgrades = document.querySelectorAll(".upgrade");
    for (let i = 0; i < upgrades.length; i++) {
        let costTextElem = upgrades[i].lastElementChild;
        let cost = upgradeData[costTextElem.id];
        costTextElem.textContent = cost;
    }
}

function updateDisplay() {
    totalAmountText.textContent = gameData.totalAmount;
    incrementButton.textContent = "+" + gameData.incrementButtonPower;
    displayUpgradeData();
}

window.onload = () => {
    updateDisplay();
    addUpgradeListeners();
}
