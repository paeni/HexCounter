const hexValue = document.getElementById("hexValue");
const decimalValue = document.getElementById("decimalValue");
const valueForm = document.getElementById("valueForm");
const valueInput = document.getElementById("valueInput");
const errorMessage = document.getElementById("errorMessage");

let count = 0;

function updateDisplay() {
  const sign = count < 0 ? "-" : "";
  const absoluteValue = Math.abs(count);
  const hex = absoluteValue.toString(16).toUpperCase().padStart(2, "0");

  hexValue.textContent = `${sign}0x${hex}`;
  decimalValue.textContent = `10進数: ${count}`;
}

function changeCount(amount) {
  count += amount;
  errorMessage.textContent = "";
  updateDisplay();
}

function parseInput(value) {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return null;
  }

  if (/^-?0x[0-9a-f]+$/i.test(trimmedValue)) {
    const isNegative = trimmedValue.startsWith("-");
    const hexPart = trimmedValue.replace(/^-?0x/i, "");
    const parsed = Number.parseInt(hexPart, 16);
    return isNegative ? -parsed : parsed;
  }

  if (/^-?[0-9]+$/.test(trimmedValue)) {
    return Number.parseInt(trimmedValue, 10);
  }

  if (/^-?[0-9a-f]+$/i.test(trimmedValue)) {
    const isNegative = trimmedValue.startsWith("-");
    const hexPart = trimmedValue.replace(/^-/, "");
    const parsed = Number.parseInt(hexPart, 16);
    return isNegative ? -parsed : parsed;
  }

  return null;
}

document.getElementById("incrementButton").addEventListener("click", () => {
  changeCount(1);
});

document.getElementById("decrementButton").addEventListener("click", () => {
  changeCount(-1);
});

document.getElementById("increment16Button").addEventListener("click", () => {
  changeCount(0x10);
});

document.getElementById("decrement16Button").addEventListener("click", () => {
  changeCount(-0x10);
});

document.getElementById("resetButton").addEventListener("click", () => {
  count = 0;
  valueInput.value = "";
  errorMessage.textContent = "";
  updateDisplay();
});

valueForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const parsedValue = parseInput(valueInput.value);

  if (parsedValue === null || !Number.isSafeInteger(parsedValue)) {
    errorMessage.textContent = "有効な16進数または10進数を入力してください。";
    return;
  }

  count = parsedValue;
  errorMessage.textContent = "";
  updateDisplay();
});

document.addEventListener("keydown", (event) => {
  if (document.activeElement === valueInput) {
    return;
  }

  if (event.key === "ArrowUp" || event.key === "+") {
    changeCount(1);
  }

  if (event.key === "ArrowDown" || event.key === "-") {
    changeCount(-1);
  }
});

updateDisplay();
