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
    console.log(rotateCard[0] && rotateCard[0].querySelector('.first__card img').src ===rotateCard[1].querySelector('.first__card img').src);

  });
});

function flipCard(card) {
    if (rotateCard.length < 2) {
        card.classList.add("flip");
        rotateCard.push(card);

        if (rotateCard.length === 2) {
            cards.forEach((otherCard) => {
                if (!rotateCard.includes(otherCard)) {
                    otherCard.classList.add("disabled");
                }

                const backImage = rotateCard[0].querySelector('.first__card img').src;
                const backSecondImage = rotateCard[1].querySelector('.first__card img').src;
                const frontImage = rotateCard[0].querySelector('second__image').src
                const frontSecondImage = rotateCard[1].querySelector('second__image').src
                if (backImage === backSecondImage) {
                    console.log(true);
                    frontImage.style.opacity= "0";
                    frontSecondImage.style.opacity= "0";
                    backImage.style.display ,backSecondImage.style.display = "block";
                    backImage.style.transform , backSecondImage.style.transform= "rotateY(0deg)";
                }
            });
          setTimeout(() => {
            rotateCard.forEach((card) => {
              card.classList.remove("flip", "disabled");
            });
            
            rotateCard = [];

            cards.forEach((otherCard) => {
              otherCard.classList.remove("disabled");
            });
          }, 1500);
        }
      }
}
