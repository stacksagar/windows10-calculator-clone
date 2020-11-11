const navItem = document.querySelectorAll(".item");
const historyMain = document.querySelector(".historyMain");
const history = document.querySelector(".history");
const clearHistory = document.querySelector("#clearHistory");
const memory = document.querySelector(".memory");
navItem.forEach((item, i) => {
  item.addEventListener("click", function () {
    for (let i = 0; i < navItem.length; i++) {
      navItem[i].classList.remove("active");
    }
    this.classList.add("active");
    let th = this.innerText;

    if (th === "Memory") {
      memory.style.visibility = "visible";
      historyMain.style.visibility = "hidden";
    } else if (th === "History") {
      memory.style.visibility = "hidden";
      historyMain.style.visibility = "visible";
    }
  });
});

// Calculator
const previous = document.querySelector(".previous");
const current = document.querySelector(".current");
const allClearButton = document.querySelector(".data-all-clear");
const currentValueClearButton = document.querySelector(".data-current-clear");
const deleteButton = document.querySelector(".data-delete");
const equalButton = document.querySelector(".data-equal");
const actionButtons = document.querySelectorAll(".data-action");
const anotherActionButtons = document.querySelectorAll(".data-action-another");
const numberButtons = document.querySelectorAll(".data-number");

let historyResult = "";
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
        historyResult = `${previousNumber} + ${currentNumber}`;
        break;
      case "-":
        result = previousNumber - currentNumber;
        historyResult = `${previousNumber} - ${currentNumber}`;
        break;
      case "*":
        result = previousNumber * currentNumber;
        historyResult = `${previousNumber} * ${currentNumber}`;
        break;
      case "÷":
        result = previousNumber / currentNumber;
        historyResult = `${previousNumber} / ${currentNumber}`;
        break;
      case "%":
        result = previousNumber % currentNumber;
        historyResult = `${previousNumber} % ${currentNumber}`;
        break;
      default:
        return;
    }

    this.currentValue = result;
    this.previousValue = "";

    if (this.previousValue === "") {
      this.actionType = "";
    }
    createSingleHistory(historyResult, historyResult);
  }
  getAnotherCalculation(value) {
    switch (value) {
      case "√":
        this.previousValue = Math.sqrt(this.currentValue);
        createSingleHistory(
          `√ ( ${this.currentValue} )`,
          Math.sqrt(this.currentValue)
        );
        break;
      case "x2":
        this.previousValue = this.currentValue * this.currentValue;
        createSingleHistory(
          `sqr( ${this.currentValue} )`,
          this.currentValue * this.currentValue
        );
        break;
      case "1/x":
        this.previousValue = 1 / this.currentValue;
        createSingleHistory(
          `1/( ${this.currentValue} )`,
          1 / this.currentValue
        );
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

clearHistory.addEventListener("click", function () {
  history.innerHTML = "";
});

// create HTML code
let allsingleHistory = [];

function createSingleHistory(p1, p2) {
  let singleHistory = document.createElement("div");
  let firstP = document.createElement("p");
  let secondP = document.createElement("p");
  singleHistory.classList.add("singleHistory");
  firstP.innerHTML = p1;
  secondP.innerHTML = `= ${eval(p2)}`;
  singleHistory.appendChild(firstP);
  singleHistory.appendChild(secondP);
  history.appendChild(singleHistory);

  const profileData = {
    first: p1,
    second: p2,
  };
  let formatProfile = `
  <div class="singleHistory"> ${profileData.first} ${profileData.second} </div>
  `;

  if (localStorage.getItem("singleHistory")) {
    allsingleHistory = JSON.parse(localStorage.getItem("singleHistory"));
  }
  allsingleHistory.push(profileData);
  localStorage.setItem("singleHistory", JSON.stringify(allsingleHistory));
}

document.addEventListener("DOMContentLoaded", function () {
  
  const historyStorage = JSON.parse(localStorage.getItem("singleHistory"));

  historyStorage.forEach((item) => {
    let singleHistory = document.createElement("div");
    let firstP = document.createElement("p");
    let secondP = document.createElement("p");
    singleHistory.classList.add("singleHistory");

    firstP.innerHTML = item.first;
    secondP.innerHTML = eval(item.second);
    singleHistory.appendChild(firstP);
    singleHistory.appendChild(secondP);
    history.appendChild(singleHistory);
  });

});


// fixed name link dynamic and everything
const fixedName = document.querySelector(".fixedName");
fixedName.setAttribute("style","position:fixed;right:10px;bottom:10px;background:#00000055;padding:10px 20px;color:#333;border-radius:10px")
let gitUsername = fixedName.classList[1] ? "/"+fixedName.classList[1] : '' ;
fixedName.innerHTML = `<a class="gitLink"> <i id="gitIcon" class="fab fa-github"></i> stacksagar
</a>`
document.addEventListener("DOMContentLoaded", ()=>{ 
 document.querySelectorAll(".gitLink").forEach(item=>{
  item.setAttribute("href", `https://github.com/stacksagar${gitUsername}`)
 })
const fixedNameA = document.querySelector(".fixedName a");  
const gitIcon = document.querySelector("#gitIcon");  
fixedNameA.setAttribute('style','color:#fff;font-size:1.5rem;text-decoration:none')   
})
gitIcon.setAttribute('style','margin-bottom:-2px !important') 

