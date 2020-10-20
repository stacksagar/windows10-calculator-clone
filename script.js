const previous = document.querySelector(".previous");
const current = document.querySelector(".current");
const allClearButton = document.querySelector(".data-all-clear");
const currentValueClearButton = document.querySelector(".data-current-clear");
const deleteButton = document.querySelector(".data-delete");
const equalButton = document.querySelector(".data-equal");
const actionButtons = document.querySelectorAll(".data-action");
const anotherActionButtons = document.querySelectorAll(".data-action-another");
const numberButtons = document.querySelectorAll(".data-number");

class myClaculator {
  constructor(current, previous) {
    this.dataCurrent = current;
    this.dataPrevious = previous;
    this.allClear();
  }

  getNumber(value) {
    if (value === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue + value;
  }
  getAction(value) {
    if (this.currentValue === "") return;
    if (this.previousValue !== "") {
      this.getCalculation();
    }
    this.actionType = value;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }
  getCalculation() {
    const currentNumber = parseFloat(this.currentValue);
    const previousNumber = parseFloat(this.previousValue);
    let result;
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;
    switch (this.actionType) {
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "—":
        result = previousNumber - currentNumber;
        break;
      case "*":
        result = previousNumber * currentNumber;
        break;
      case "÷":
        result = previousNumber / currentNumber;
        break;
      case "%":
        result = previousNumber % currentNumber;
        break;
      default:
        return;
    }
    this.currentValue = result;
    this.previousValue = "";

    if (this.previousValue === "") {
      this.actionType = "";
    }
  }
  getAnotherCalculation(value) {
    switch (value) {
      case "√":
        this.previousValue = Math.sqrt(this.currentValue);
        break;
      case "x2":
        this.previousValue = this.currentValue * this.currentValue;
        break;
      case "1/x":
        this.previousValue = 1 / this.currentValue;
        break;
      default:
        return;
    }
    this.currentValue = "";
  }

  allClear() {
    this.currentValue = "";
    this.previousValue = "";
    this.actionType = "";
  }
  clearCurrentValue() {
    this.currentValue = "";
  }
  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  updateOutput(value) {
    const formatted = parseFloat(value.toString());
    if (isNaN(formatted)) {
      return "";
    } else {
      return formatted.toLocaleString();
    }
  }
  getOutput() {
    this.dataCurrent.innerText = this.updateOutput(this.currentValue);
    this.dataPrevious.innerText = `${this.updateOutput(this.previousValue)} ${
      this.actionType
    }`;
  }
}
// End class function

const calculator = new myClaculator(current, previous);

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.getNumber(this.innerText);
    calculator.getOutput();
  });
});
actionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.getAction(this.innerText);
    calculator.getOutput();
  });
});
anotherActionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.getAnotherCalculation(this.innerText);
    calculator.getOutput();
  });
});
equalButton.addEventListener("click", () => {
  calculator.getCalculation();
  calculator.getOutput();
});

allClearButton.addEventListener("click", () => {
  calculator.allClear();
  calculator.getOutput();
});
currentValueClearButton.addEventListener("click", () => {
  calculator.clearCurrentValue();
  calculator.getOutput();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.getOutput();
});
