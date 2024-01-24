let cardsContainer = document.querySelector(".cards");
let cards = document.querySelectorAll(".card");
let timer = document.querySelector(".time");
let reset = document.querySelector(".reset");
let close = document.querySelector(".modal__close")
var minute = 0;
var second = 0;
var score = 0;
let endValue;
let initialValue = [];
let startAudio = new Audio("./Audio/start.mp3")
console.log(startAudio);
let finishAudio = new Audio("./Audio/final.mp3")
reset.addEventListener("click",startAudio.play())

let trueAudio = new Audio("./Audio/true.mp3")
let falseAudio = new Audio("./Audio/false.mp3")
cards.forEach(() => {
  initialValue.push(false);
});
let matchCount = 0;
function flippedCard() {
  return initialValue.every((e) => e) && rotateCard.length === 0;
}
cards.forEach(() => {});
const setTime = function () {
  second++;
  if (second === 60) {
    second = 0;
    minute++;
  }
  const newMinute = minute < 10 ? `0${minute}` : minute;
  const newSecond = second < 10 ? `0${second}` : second;
  endValue = `${newMinute}:${newSecond}`;
  timer.innerHTML = endValue;
};
const intervalId = setInterval(() => {
  setTime();
}, 1000);
reset.addEventListener(
  "click",
  () => {
    clearInterval(intervalId);
  },
  2000
);
// console.log(intervalId);
let images = [
  "./Img/card1.png",
  "./Img/card2.png",
  "./Img/card3.png",
  "./Img/card4.png",
  "/Img/card5.png",
  "/Img/card6.png",
  "./Img/card1.png",
  "./Img/card2.png",
  "./Img/card3.png",
  "./Img/card4.png",
  "/Img/card5.png",
  "/Img/card6.png",
];

function randomImage(array) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

let uniqueImage = randomImage(images);

let rotateCard = [];
cards.forEach((card, i) => {
  let firstCard = document.createElement("div");
  let secondCard = document.createElement("div");
  let image = document.createElement("img");

  firstCard.className = "first__card";
  secondCard.className = "second__card";
  image.src = uniqueImage[i];
  card.appendChild(firstCard);
  card.appendChild(secondCard);
  firstCard.appendChild(image);
  secondCard.innerHTML = "?";
  card.addEventListener("click", () => {
    flipCard(card);
  });
});
function flipCard(clickedCard) {
  if (rotateCard.length < 2) {
    clickedCard.classList.add("flip");
    rotateCard.push(clickedCard);
    const cardIndex = Array.from(cards).indexOf(clickedCard);
    initialValue[cardIndex] = true;

    if (rotateCard.length === 2) {
      const backImageSrc = rotateCard[0].querySelector(".first__card img").src;
      const backSecondImageSrc =
        rotateCard[1].querySelector(".first__card img").src;

      setTimeout(() => {
        rotateCard.forEach((card) => {
          card.classList.remove("flip");
          card.querySelector(".second__card").style.display = "block";
          card.querySelector(".second__card").style.display = "flex";
          card.querySelector(".second__card").style.justifyContent = "center";
          card.querySelector(".second__card").style.alignItems = "center";
        });

        if (backImageSrc === backSecondImageSrc) {
          rotateCard.forEach((card) => {
            card.classList.add("disabled");
            card.querySelector(".second__card").style.zIndex = "-1";
            card.querySelector(".second__card").style.opacity = "0";
            card.querySelector(".first__card").style.transform =
              "rotateY(0deg)";
            card.querySelector(".first__card").style.visibility = "inherit";
            card.querySelector(".first__card").style.opacity = "0.7";
            card.querySelector(".first__card").style.transition = "1s";
            score+=20
            document.querySelector(".total").innerHTML=score
            trueAudio.play()
          });
          rotateCard = [];
          matchCount++;
          cards.forEach((otherCard) => {
            otherCard.classList.remove("disabled");
          });

          if (matchCount === cards.length / 2) {
            finishAudio.play()
            document.querySelector(".modal").style.opacity = 1;
            document.querySelector(".modal").style.visibility = "inherit";
            document.querySelector(".modal").style.display = "flex";
            document.querySelector(".modal").style.justifyContent = "center";
            document.querySelector(".modal").style.alignItems = "center";
            document.querySelector(".modal__close").addEventListener("click",()=>{document.querySelector(".modal").style.display="none"})
            clearInterval(intervalId);
            document.querySelector(".finish__time").innerHTML=endValue
            document.querySelector(".finish__score").innerHTML=score
            document.querySelector(".restart").addEventListener("click",()=>{
              window.location.reload()
            })
          }
        } else {
          rotateCard.forEach((card) => {
            card.classList.remove("flip", "disabled");
            falseAudio.play()
          });
          rotateCard = [];
          cards.forEach((otherCard) => {
            otherCard.classList.remove("disabled");
          });
        }
      }, 1200);
    }
  }
}
