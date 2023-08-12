"use strict";

const container = document.querySelector(".container");
const result = document.querySelector(".result");

result.style.display = "none";

const wordarray = [
  "Apple",
  "Mango",
  "Beach",
  "Smile",
  "Tiger",
  "House",
  "Train",
  "Queen",
  "Mouse",
  "Earth",
  "Shoes",
  "Music",
  "Water",
  "Horse",
  "Plant",
  "Paper",
  "River",
  "Fairy",
  "Olive",
  "Carve",
];

let word = wordarray[Math.trunc(Math.random() * 20)].toUpperCase();
const rows = 6;
const columns = 5;

let rowCount = 0;
let columnCount = 0;
let gameOver = false;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let button = document.createElement("span");
    button.id = `${i}-${j}`;
    button.classList.add("button");
    container.appendChild(button);
  }
}

document.addEventListener("keydown", function (e) {
  if (gameOver) return;

  const key = e.key.toUpperCase();

  if (/^[A-Z]$/.test(key)) {
    if (columnCount < columns) {
      let tile = document.getElementById(`${rowCount}-${columnCount}`);
      tile.innerText = key;
      columnCount++;
    }
  } else if (e.code === "Backspace") {
    if (columnCount > 0 && columnCount <= columns) {
      columnCount--;
      let tile = document.getElementById(`${rowCount}-${columnCount}`);
      tile.innerText = "";
    }
  } else if (e.code === "Enter") {
    checking();
    rowCount++;
    columnCount = 0;
  }

  if (!gameOver && rowCount === rows) {
    gameOver = true;
    result.style.display = "block";
    document.querySelector(".word").innerText = word;
  }
});

function checking() {
  let match = "";
  for (let j = 0; j < columns; j++) {
    let tile = document.getElementById(`${rowCount}-${j}`);
    let letter = tile.innerText;
    if (letter === word[j]) {
      tile.classList.add("correct");
      letter += tile.innerText;
    } else if (word.includes(letter)) {
      tile.classList.add("includes");
    } else {
      tile.classList.add("notFound");
    }
  }
  if (match == word) gameOver = true;
}
