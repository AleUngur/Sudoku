var number; //number from [1,9] chosen by player
var matrix = deleteRandomNumbers(); //matrix for numbers in gameboard
var frequency = Array(9).fill(0);

createGameboard();
selectSquare();
selectNumber();
displayEmptyMatrix();

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
      colorInBlue(this);
    };
  }
}

function colorInBlue(btn) {
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
      numberClicked(this.id);
      var blueButton = document.querySelector(".blue");
      addNumberOnGameboard(blueButton, number);
      addNumberInMatrix(blueButton, number);
      displayMessage(blueButton);
    };
  }
}

function addNumberOnGameboard(btnClicked, nr) {
  //put in gameboard the number chosen
  btnClicked.innerHTML = nr;
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
  matrix[i][j] = nr; //in care matrice adauga? trebuie in cea generata random
}

function resetFrequency() {
  frequency = Array(9).fill(0);
}

function checkInMatrix(line, col) {
  var ok = 1;
  //iterating through the elements on the line to check for doubles
  for (var j = 0; j < 9 && ok == 1; ++j) {
    if (matrix[line][j] != 0) {
      ++frequency[matrix[line][j]];
    }
    if (frequency[matrix[line][j]] > 1) {
      ok = 0;
    }
  }
  resetFrequency();
  //iterating through the elements on the column to check for doubles
  for (var i = 0; i < 9 && ok == 1; ++i) {
    if (matrix[i][col] != 0) {
      ++frequency[matrix[i][col]];
    }
    if (frequency[matrix[i][col]] > 1) {
      ok = 0;
    }
  }
  resetFrequency();
  //selecting the 3x3 square to look into
  var x1, y1, x2, y2;
  if (line >= 0 && line <= 2) {
    x1 = 0;
    x2 = 2;
  } else if (line >= 3 && line <= 5) {
    x1 = 3;
    x2 = 5;
  } else if (line >= 6 && line <= 8) {
    x1 = 6;
    x2 = 8;
  }
  if (col >= 0 && col <= 2) {
    y1 = 0;
    y2 = 2;
  } else if (col >= 3 && col <= 5) {
    y1 = 3;
    y2 = 5;
  } else if (col >= 6 && col <= 8) {
    y1 = 6;
    y2 = 8;
  }
  //iterating through the elements of the square to check for doubles
  for (var i = x1; i <= x2 && ok == 1; ++i) {
    for (var j = y1; j <= y2 && ok == 1; ++j) {
      if (matrix[i][j] != 0) {
        ++frequency[matrix[i][j]];
      }
      if (frequency[matrix[i][j]] > 1) {
        ok = 0;
      }
    }
  }
  resetFrequency();
  if (ok == 1) {
    console.log("corect");
    return true; //the element is placed correctly
  } else {
    console.log("incorect");
    return false; //the element is placed incorrectly
  }
}

function deleteNumber() {
  var blueButton = document.querySelector(".blue");
  var line = blueButton.id.charAt(0),
    col = blueButton.id.charAt(2);
  blueButton.innerHTML = ""; //deleting element from gameboard
  matrix[line][col] = 0; //deleting element from matrix
}

function displayMessage(blueButton) {
  //this should be tested more because it doesn't work how I wanted it to
  var msg = document.getElementById("msg");
  var i = blueButton.id.charAt(0),
    j = blueButton.id.charAt(2);
  if (!checkInMatrix(i, j)) {
    msg.innerHTML = "You addded a number in a wrong spot!";
  } else {
    msg.innerHTML = "Keep going! You're doing great!";
  }
}

function generateMatrix() {
  var v = generateArray();
  var m = [];
  m[0] = v;
  m[1] = shiftArray(m[0], 3);
  m[2] = shiftArray(m[1], 3);
  m[3] = shiftArray(m[2], 1);
  m[4] = shiftArray(m[3], 3);
  m[5] = shiftArray(m[4], 3);
  m[6] = shiftArray(m[5], 1);
  m[7] = shiftArray(m[6], 3);
  m[8] = shiftArray(m[7], 3);
  return m;
}

function generateArray() {
  var min = 1;
  var max = 9;
  var stop = 9;
  var numbers = [];
  for (let i = 0; i < stop; i++) {
    var n = Math.floor(Math.random() * max) + min;
    var check = numbers.includes(n);
    if (check === false) {
      numbers.push(n);
    } else {
      while (check === true) {
        n = Math.floor(Math.random() * max) + min;
        check = numbers.includes(n);
        if (check === false) {
          numbers.push(n);
        }
      }
    }
  }
  return numbers;
}

function shiftArray(arr, nr) {
  //array = array.concat(array.splice(0, nr));
  arr = arr.map((_, b) => arr[(b + nr) % arr.length]); // shift left by nr
  return arr;
}

function deleteRandomNumbers(amountToHide) {
  var m = generateMatrix();
  console.log("matrice initiala: ", m);
  console.log("amountToHide: ", amountToHide);
  for (let i = 0; i < amountToHide; ) {
    let randomX = Math.floor(Math.random() * 8);
    console.log("randX: ", randomX);
    let randomY = Math.floor(Math.random() * 8);
    console.log("randY: ", randomY);
    if (m[randomX][randomY] != 0) {
      m[randomX][randomY] = 0;
      i++;
    }
  }
  console.log("matrice mai golita: ", m);
  return m;
}

function displayEmptyMatrix() {
  var m = deleteRandomNumbers(25); //leveeeeeeeeeeeeeeeeelsssssssssss
  var gameboard = document.getElementById("gameboard");
  var buttons = document.querySelectorAll(".gameboard button");
  for (btn of buttons) {
    var line = btn.id.charAt(0);
    var col = btn.id.charAt(2);
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (m[i][j] != 0 && line == i && col == j) {
          btn.innerHTML = m[i][j];
          setAttribute(btn, "color", "#8e7dbe");
          setAttribute(btn, "backgroundColor", "#f1e3d3");
        }
      }
    }
  }
}

function gameOver() {
  //daca matricea e full si e buna afisez mesaj de WIN
  //daca matricea e plina, dar nu e buna afisez mesaj: "Ai greseli pe tabla! Modifica si incearca sa castigi!"
}
