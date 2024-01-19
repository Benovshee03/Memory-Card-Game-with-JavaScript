let cardsContainer = document.querySelector(".cards");
let cards = document.querySelectorAll(".card");

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

let rotateCard = [];
cards.forEach((card) => {
  let firstCard = document.createElement("div");
  let secondCard = document.createElement("div");
  let image = document.createElement("img");

  firstCard.className = "first__card";
  secondCard.className = "second__card";
  let randomSetImage = images[Math.floor(Math.random() * images.length)];
  image.src = randomSetImage;
  card.appendChild(firstCard);
  card.appendChild(secondCard);
  firstCard.appendChild(image);
  secondCard.innerHTML = "?";
  card.addEventListener("click", () => {
    flipCard(card);
    console.log(
      rotateCard[0] &&
        rotateCard[0].querySelector(".first__card img").src ===
          rotateCard[1].querySelector(".first__card img").src
    );
  });
});

function flipCard(clickedCard) {
  if (rotateCard.length < 2) {
    clickedCard.classList.add("flip");
    rotateCard.push(clickedCard);

    if (rotateCard.length === 2) {
      const backImageSrc = rotateCard[0].querySelector(".first__card img").src;
      const backSecondImageSrc = rotateCard[1].querySelector(".first__card img").src;

      if (backImageSrc === backSecondImageSrc) {
        console.log(true);
        setTimeout(() => {
          rotateCard.forEach((card) => {
            card.classList.add("disabled");
            card.classList.remove("flip");
            card.querySelector(".second__card").style.zIndex = "-1";
            card.querySelector(".second__card").style.opacity = "0";
            card.querySelector('.first__card').style.transform = 'rotateY(0deg)';
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
            card.querySelector(".second__card").style.display = 'block';
          });

          rotateCard = [];

          cards.forEach((otherCard) => {
            otherCard.classList.remove("disabled");
          });
        }, 1500);
      }
    }
  }
}

