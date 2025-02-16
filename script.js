const btn = document.querySelectorAll(".button");
const numbers = document.querySelector(".number");
const arithmaric = document.querySelector(".arithmaric");
var result;
Array.from(btn).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log(btn.innerHTML.trim());
    // buttonKeyEvent(btn.id);
    // console.log(btn.innerHTML.trim());

    //Input from display
    if (numbers.value === "0") {
      numbers.value = btn.innerHTML;
    } else if (btn.innerHTML.trim() in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
      numbers.value += btn.innerHTML;
    } else if (btn.innerHTML === "CE") {
      numbers.value = "0";
    } else if (btn.innerHTML === "C") {
      arithmaric.value = "";
      numbers.value = "0";
    } else if (btn.innerHTML.trim() === "❌") {
      numbers.value = numbers.value.slice(0, -1);
    } else if (btn.innerHTML.trim() === "." && !numbers.value.includes(".")) {
      numbers.value += btn.innerHTML;
    }
    // Overide sign
    else if (
      btn.innerHTML.trim() === "+" ||
      btn.innerHTML.trim() === "-" ||
      btn.innerHTML.trim() === "×" ||
      btn.innerHTML.trim() === "÷"
    ) {
      arithmaric.value += numbers.value + btn.innerHTML.trim();
      numbers.value = "";
      // console.log(arithmaric.value.slice(0));
      // console.log(arithmaric.value.slice(0, -2));
      // console.log(arithmaric.value.slice(-2, -1));

      if (
        (arithmaric.value.slice(-1) === "+" ||
          arithmaric.value.slice(-1) === "-" ||
          arithmaric.value.slice(-1) === "×" ||
          arithmaric.value.slice(-1) === "÷") &&
        (arithmaric.value.slice(-2, -1) === "+" ||
          arithmaric.value.slice(-2, -1) === "-" ||
          arithmaric.value.slice(-2, -1) === "×" ||
          arithmaric.value.slice(-2, -1) === "÷")
      ) {
        arithmaric.value = arithmaric.value.slice(0, -2);
        arithmaric.value += btn.innerHTML.trim();
      }
    }
    //calculation
    else if (btn.innerHTML.trim() === "+/-") {
      numbers.value = "-" + numbers.value;
    } else if (btn.innerHTML.trim() === "√") {
      arithmaric.value += Math.sqrt(numbers.value);
      numbers.value = "";
    } else if (btn.innerHTML.trim() === "1/x") {
      arithmaric.value += ` 1/(${numbers.value})`;
      numbers.value = "";
    } else if (btn.innerHTML.trim() === "%") {
      // arithmaric.value += numbers.value / 100;
      // numbers.value = "";
    } else if (btn.innerHTML.trim() === "x<sup>2</sup>") {
      arithmaric.value += Math.pow(numbers.value, 2);
      numbers.value = "";
    } else if (
      btn.innerHTML.trim() === "=" &&
      (arithmaric.value.slice(-1) === "+" ||
        arithmaric.value.slice(-1) === "-" ||
        arithmaric.value.slice(-1) === "×" ||
        arithmaric.value.slice(-1) === "÷") &&
      numbers.value === ""
    ) {
      arithmaric.value = arithmaric.value.slice(0, -1);
      const expression = arithmaric.value;
      const modify = expression.replace(/÷/g, "/").replace(/×/g, "*");
      result = eval(modify);
      numbers.value = result;
      arithmaric.value = "";
    } else if (btn.innerHTML.trim() === "=") {
      arithmaric.value = arithmaric.value + numbers.value;
      const expression = arithmaric.value;
      const modify = expression.replace(/÷/g, "/").replace(/×/g, "*");
      result = eval(modify);
      numbers.value = result;
      arithmaric.value = "";
      // console.log("hi");
    }
  });
});

//Input from Keyboard
document.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (
    e.key === "Backspace" ||
    e.key in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "=" ||
    e.key === "." ||
    e.key === "%"
  ) {
    buttonKeyEvent(e.key);
    document.getElementById(e.key).click();
  } else if (e.key == "Enter") {
    document.getElementById("=").click();
  }
});

//onclick Event
const buttonKeyEvent = (event) => {
  document.getElementById(event).classList.add("clicked");
  setTimeout(() => {
    document.getElementById(event).classList.remove("clicked");
  }, 200);
};
