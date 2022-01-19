function createGameboard() {
  var gameboard = document.getElementById("gameboard");
  console.log("creating buttons");
  for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
      var button = document.createElement("button");
      button.id = "cell " + i + "-" + j;
      button.className = "buttons";
      button.innerHTML = "cell " + i + "-" + j;
      if (i == 3 || i == 6) {
        button.setAttribute("style", "border-bottom: 4px solid black");
      }
      if (j == 3 || j == 6) {
        button.setAttribute("style", "border-right: 4px solid black");
      }
      if (
        (i == 3 && j == 3) ||
        (i == 6 && j == 6) ||
        (i == 3 && j == 6) ||
        (i == 6 && j == 3)
      ) {
        console.log("3 si 6");
        setAttribute(button, "border-right", "4px solid black");
        setAttribute(button, "border-bottom", "4px solid black");
      }
      gameboard.appendChild(button);
    }
  }
}
window.onload = createGameboard();

function setAttribute(element, key, value) {
  element.style[key] = value;
}
