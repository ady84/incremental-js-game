const gameData = {
    totalAmount: 0,
    incrementButtonPower: 1,
    farms: 0,
    banks: 0,
};

const totalAmountText = document.querySelector("#total-amount");
const incrementButton = document.querySelector("#increment-button");

incrementButton.addEventListener("click", () => {
    gameData.totalAmount = round(gameData.totalAmount + gameData.incrementButtonPower);
    updateDisplay();
});

const upgradeData = {
    upgradePowerCost: 10,
    farmCost: 25,
    bankCost: 75,
};

function addUpgradeListeners() {
    const upgrades = document.querySelectorAll(".upgrade");
    for (let i = 0; i < upgrades.length; i++) {
        const upgradeButton = upgrades[i].firstElementChild;
        upgradeButton.addEventListener("click", () => {
            let upgradeCost = upgradeData[upgrades[i].lastElementChild.id];
            if (gameData.totalAmount - upgradeCost < 0) {
                console.log("You don't have enough money");
            }
            else {
                gameData.totalAmount = round(gameData.totalAmount - upgradeCost);
    
                // Raise the linked cost by factor
                let newUpgradeCost = upgradeCost * parseFloat(upgradeButton.dataset.costFactor);
                upgradeData[upgrades[i].lastElementChild.id] = round(newUpgradeCost);
                
                // Raise the linked upgrade by factor
                let upgradeCostElem = upgrades[i].lastElementChild;
                if (upgradeCostElem.dataset.type == "linear") {
                    let newUpgradeAmount = gameData[upgradeButton.dataset.upgrade] + parseFloat(upgradeButton.dataset.upgradeFactor);
                    gameData[upgradeButton.dataset.upgrade] = round(newUpgradeAmount);
                }
                else if (upgradeCostElem.dataset.type == "exponential") {
                    let newUpgradeAmount = gameData[upgradeButton.dataset.upgrade] * parseFloat(upgradeButton.dataset.upgradeFactor);
                    gameData[upgradeButton.dataset.upgrade] = round(newUpgradeAmount);
                }
                
                let upgradeAmount = upgrades[i].querySelector(".upgradeAmount");
                upgradeAmount.textContent = parseInt(upgradeAmount.textContent) + 1;

                updateDisplay();
            }
        });
    }
}

function round(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
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
    calculateStats();
}

const buildingValues = {
    farms: 0.5,
    banks: 2,
};

function calculateStats() {
    const stats = document.querySelectorAll(".stat");
    for (let i = 0; i < stats.length; i++) {
        const statText = stats[i].firstElementChild;
        statText.textContent = gameData[statText.id] * buildingValues[statText.id];
    }
}

setInterval(() => {
    gameData.totalAmount = round(gameData.totalAmount +
        gameData.farms * buildingValues.farms +
        gameData.banks * buildingValues.banks
    );

    updateDisplay();
}, 1000);

window.onload = () => {
    updateDisplay();
    addUpgradeListeners();
}
