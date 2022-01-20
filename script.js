var number; //number from [1,9] chosen by player
var matrix = Array(9)
  .fill(null)
  .map(() => Array(9).fill(0)); //matrix for numbers in gameboard
//console.log(matrix);

createGameboard();
selectSquare();
selectNumber();

function createGameboard() {
  var gameboard = document.getElementById("gameboard");
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var button = document.createElement("button");
      button.id = i + "-" + j;
      button.className = "white";
      if (i == 2 || i == 5) {
        setAttribute(button, "border-bottom", "4px solid #8e7dbe");
      }
      if (j == 2 || j == 5) {
        setAttribute(button, "border-right", "4px solid #8e7dbe");
      }
      if (
        (i == 2 && j == 2) ||
        (i == 5 && j == 5) ||
        (i == 2 && j == 5) ||
        (i == 5 && j == 2)
      ) {
        setAttribute(button, "border-right", "4px solid #8e7dbe");
        setAttribute(button, "border-bottom", "4px solid #8e7dbe");
      }
      gameboard.appendChild(button);
    }
  }
}

function setAttribute(element, key, value) {
  element.style[key] = value;
}

function selectSquare() {
  var buttons = document.querySelectorAll(".gameboard button");
  for (btn of buttons) {
    btn.onclick = function () {
      changeColor(this);
    };
  }
}

function changeColor(btn) {
  var blueButton = document.querySelectorAll(".blue")[0];
  if (btn.className == "white") {
    if (blueButton) {
      blueButton.className = "white";
    }
    btn.className = "blue";
  }
}

function selectNumber() {
  var numbers = document.querySelectorAll(".numbers button");
  for (btn of numbers) {
    btn.onclick = function () {
      var blueButton = document.querySelector(".blue");
      numberClicked(this.id);
      addNumberonGameboard(blueButton, number);
      addNumberInMatrix(blueButton, number);
    };
  }
}

function addNumberonGameboard(btnClicked, nr) {
  //put in gameboard the number chosen
  btnClicked.innerText = nr;
}

function numberClicked(idNrClicked) {
  //return the number chosen by click
  number = document.getElementById(idNrClicked).innerHTML;
  return number;
}

function newGame() {
  location.reload();
}

function addNumberInMatrix(btn, nr) {
  var i = btn.id.charAt(0),
    j = btn.id.charAt(2);
  matrix[i][j] = nr;
}
