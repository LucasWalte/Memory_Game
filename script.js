const gameContainer = document.getElementById("game");

// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];

const IMAGES = [
  "Gifs/gif1.gif", "Gifs/gif1.gif",
  "Gifs/gif2.gif", "Gifs/gif2.gif",
  "Gifs/gif3.gif", "Gifs/gif3.gif",
  "Gifs/gif4.gif", "Gifs/gif4.gif",
  "Gifs/gif5.gif", "Gifs/gif5.gif",
  "Gifs/gif6.gif", "Gifs/gif6.gif",
  "Gifs/gif7.gif", "Gifs/gif7.gif",
  "Gifs/gif8.gif", "Gifs/gif8.gif",
  "Gifs/gif9.gif", "Gifs/gif9.gif",
  "Gifs/gif10.gif", "Gifs/gif10.gif",
  "Gifs/gif11.gif", "Gifs/gif11.gif",
  "Gifs/gif12.gif", "Gifs/gif12.gif"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledImages = shuffle(IMAGES);
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let noClicking = false;

function createDivsForImages(imageArray) {
  for (let i = 0; i < 25; i++) { 
    if (i === 12) { 
      const scoreKeeper = document.createElement("div");
      scoreKeeper.id = "scoreKeeper";
      scoreKeeper.className = "score";
      scoreKeeper.textContent = "0"; 
      gameContainer.append(scoreKeeper);
    } else {
      const imageUrl = imageArray[i < 12 ? i : i - 1]; 
      const newDiv = document.createElement("div");
      const frontFace = document.createElement("div");
      frontFace.classList.add("front");
      const backFace = document.createElement("div");
      backFace.classList.add("back");
      backFace.style.backgroundImage = `url('${imageUrl}')`;
      newDiv.appendChild(frontFace);
      newDiv.appendChild(backFace);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }
}

let score = 0;

function updateScore() {
  score++; 
  const scoreDisplay = document.getElementById("scoreKeeper");
  if (scoreDisplay) {
    scoreDisplay.textContent = score.toString(); 
  }
}


let flippedCards = [];

function handleCardClick(event) {
  if (noClicking || event.target.classList.contains('flipped') || flippedCards.length >= 2) {
    return;
  }

  let currentCard = event.target.parentNode;
  currentCard.classList.add("flipped");
  flippedCards.push(currentCard);

  if (flippedCards.length === 2) {
    noClicking = true;


    updateScore(); 

    let match = flippedCards[0].children[1].style.backgroundImage === flippedCards[1].children[1].style.backgroundImage;

    if (match) {
      cardsFlipped += 2;
      flippedCards = [];
      noClicking = false;

      if (cardsFlipped === IMAGES.length) {
        setTimeout(() => alert("Game Over!"), 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove("flipped"));
        flippedCards = [];
        noClicking = false;
      }, 1000);
    }
  }
}

function resetCards() {
  [firstCard, secondCard, noClicking] = [null, null, false];
}

createDivsForImages(shuffledImages);

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("contentToBlur").style.filter = "blur(8px)"; 
  document.getElementById("gameContainer").style.display = "none"; 
});

document.getElementById("startButton").addEventListener("click", function() {
  document.getElementById("contentToBlur").style.filter = "";
  document.getElementById("gameContainer").style.display = "flex"; 
  this.remove();
});