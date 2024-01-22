let cardsContainer = document.querySelector(".cards");
let cards = document.querySelectorAll(".card");
let timer = document.querySelector(".time");
let reset = document.querySelector(".reset");
var minute = 0;
var second = 0;
let endValue;

let setTime = function () {
  second++;
  if (second === 60) {
    second = 0;
    minute++;
  }
  const newMinute = minute<10 ? `0${minute}` : minute;
  const newSecond = second<10 ? `0${second}` : second;
  endValue = `${newMinute}:${newSecond}`;
  timer.innerHTML = endValue;
};
const intervalId = setInterval(() => {
  setTime();
}, 100);
reset.addEventListener("click",()=>{
  clearInterval(setTime)
},2000)
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
cards.forEach((card, index) => {
  let firstCard = document.createElement("div");
  let secondCard = document.createElement("div");
  let image = document.createElement("img");

  firstCard.className = "first__card";
  secondCard.className = "second__card";
  image.src = uniqueImage[index];
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

    if (rotateCard.length === 2) {
      const backImageSrc = rotateCard[0].querySelector(".first__card img").src;
      const backSecondImageSrc =
        rotateCard[1].querySelector(".first__card img").src;

      if (backImageSrc === backSecondImageSrc) {
        console.log(true);
        setTimeout(() => {
          rotateCard.forEach((card) => {
            card.classList.add("disabled");
            card.classList.remove("flip");
            card.querySelector(".second__card").style.zIndex = "-1";

            card.querySelector(".second__card").style.opacity = "0";
            card.querySelector(".first__card").style.transform =
              "rotateY(0deg)";
            card.querySelector(".first__card").style.visibility = "inherit";
            card.querySelector(".first__card").style.opacity = "0.7";
            card.querySelector(".first__card").style.transition = "1s";
          });

          rotateCard = [];

          cards.forEach((otherCard) => {
            otherCard.classList.remove("disabled");
          });
        }, 1500);
      } else {
        setTimeout(() => {
          rotateCard.forEach((card) => {
            card.classList.remove("flip", "disabled");
            card.querySelector(".second__card").style.display = "block";
            card.querySelector(".second__card").style.display = "flex";
            card.querySelector(".second__card").style.justifyContent = "center";
            card.querySelector(".second__card").style.alignItems = "center";
          });
          rotateCard = [];
          cards.forEach((otherCard) => {
            otherCard.classList.remove("disabled");
          });
        }, 1200);
      }
    }
  }
}
