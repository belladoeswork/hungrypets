let body = document.querySelector("body");
const cardContainer = document.querySelector(".container");
const petCardContainer = document.querySelector("#petCardContainer");


let petCards = [];
let currentEmoji = "";
let currentName = "";
let counter = 0;
let petAlive = true;
let barWidthHunger = 0;
let barWidthLove = 100;
let cardCleared = false;


const animalEmojis = [
    "🦜", "🦆", "🦄", "🐄", "🐏", "🐕", "🐩", "🐈", "🦚", "🦩", "🐁", "🦝", "🦨", "🦥", "🐿️", "🐉", "🦔", "🐇", "🦤", "🦮", "🦒", "🦘", "🐪", "🐫", "🦣", "🦓", "🦧", "🐆", "🐅", "🐊", "🐋", "🐬", "🐳", "🐠", "🐡", "🐟", "🦎", "🐍", "🦖", "🐢", "🦂", "🪲", "🐞", "🐌", "🐛", "🐝", "🐒", "🦅",
    "🐓", "🐥", "🦢", "🦒"
];

const petNames = [
    "Whiskers", "Luna", "Nimbus", "Mochi", "Zephyr",
    "Oliver", "Bimba", "Charlie", "Lucy", "Leo",
    "Coco", "Max", "Milo", "Lily", "Chloe",
    "Simba", "Mia", "Simba", "Mia", "Rocky",
    "Daisy", "Bailey", "Sadie", "Lola", "Tucker",
    "Teddy", "Zoe", "Sophie", "Lily", "Maddie",
    "Finn", "Oscar", "Molly", "Stella", "Ruby",
    "Jax", "Dexter", "Bear", "Luna", "Zoe",
    "Penny", "Winston", "Abby", "Cleo", "Bentley",
    "Zeus", "Cooper", "Rosie", "Jackson", "Lola", "Gobbin", "Pookie"
];

const epitaphs = [
    "Curiosity never rests.", "Gone but still glowing.", "Forever floating in fluffy clouds.",
    "Sweet memories linger.", "Whisked away by the wind.", "Always chasing rainbows.",
    "In a world of their own.", "Dancing through dreams.", "Purr-fectly loved.",
    "Playful and mischievous.", "Bringing joy one paw at a time.", "Loved beyond words.",
    "A friend like no other.", "Wagging tails in the sky.", "Forever in our hearts.",
    "Chirping melodies in the clouds.", "Napping in sunbeams.", "Eternal belly rubs.",
    "Chasing butterflies in paradise.", "Guardian angel with fur.", "Loving you from afar.",
    "Soaring with the stars.", "Always in bloom.", "Chasing shadows and butterflies.",
    "Slumbering in the sun.", "Infinite purrs and cuddles.", "Leaving pawprints on our hearts.",
    "Galloping through meadows of dreams.", "In the embrace of eternal sunsets.",
    "Gentle soul with a playful spirit.", "Whiskers forever twirling.", "Bouncing on clouds of joy.",
    "Always ready for a treat.", "Pawsitively charming.", "Forever paw-sing in peace.",
    "Barking at the moon with joy.", "Loving you to the moon and back.", "Wiggling into our hearts.",
    "Fluttering in fields of dreams.", "A melody of barks in the breeze.", "Cuddling among the stars.",
    "In the garden of eternal play.", "Sailing on a sea of memories.", "Chirps echoing in eternity.",
    "Sprinting through the celestial meadows.", "Always ready for an adventure.", "Snoozing in the lap of forever.",
    "Happily nibbling on stardust.", "Chasing rainbows and treats.", "Pouncing through the universe.",
    "A purr-fect companion for eternity."
];

// INIT

let card = document.querySelector(".pet_card");
body.appendChild(card);
let emojis = document.querySelector(".emoji");
let nameElement = document.querySelector(".name");
let hunger = document.querySelector(".hunger");
let hProgress = document.querySelector("#hunger_progress");
let hungerBar = document.querySelector("#hunger_bar");

let love = document.querySelector(".love");
let lProgress = document.querySelector("#love_progress");
let loveBar = document.querySelector("#love_bar");

let feed = document.querySelector(".feed");
let quotes = document.querySelector(".quotes");


// RANDOM SELECT

function randomEmoji(){
    let emoji = Math.floor(Math.random() * animalEmojis.length);
    currentEmoji = animalEmojis[emoji];
    return currentEmoji;
} 

function randomPetNames(){
    let names = Math.floor(Math.random() * petNames.length);
    currentName = petNames[names];
    return currentName;
} 

function randomEpitaphs(){
    let epiQuotes = Math.floor(Math.random() * epitaphs.length);
    return epitaphs[epiQuotes];
}

function feedPet(){
    if (barWidthHunger > 0) {
        barWidthHunger = 0; // decrement value
        hungerBar.style.width = `${barWidthHunger}%`;
        console.log("Feed button clicked. Bar width decreased.");
    }
}

function lovePet(){
    if (barWidthLove < 100) {
        barWidthLove = 100; // increment value
        loveBar.style.width = `${barWidthLove}%`;
        console.log("Love button clicked. Bar width increased.");
    }
}

function createPetObject() {
    const pet = {
        name: randomPetNames(),
        emoji: randomEmoji(),
        hunger: 0,
        love: 100,
        epitaph : randomEpitaphs(),
        isAlive: true
    }
    return pet;
}

const petArray = [];

petArray.push(createPetObject());

// console.log(petArray);


function render() {
    cardContainer.replaceChildren();
    for (let pet of petArray){
        const petCard = document.createElement("div");
        petCard.className = "cards";

        cardContainer.appendChild(petCard);

        const petEmoji = document.createElement("p");
        petEmoji.className ="emojis";
        petEmoji.textContent = pet.emoji;
        petCard.appendChild(petEmoji);

        const petName = document.createElement("h2");
        petName.className = "names";
        petName.textContent = pet.name;
        petCard.appendChild(petName);

        const hungerLabel = document.createElement("p")
        hungerLabel.className = "hunger-labels";
        hungerLabel.textContent = "Hunger:"
        petCard.appendChild(hungerLabel);

        const hungerMeter = document.createElement("meter")
        hungerMeter.min = 0;
        hungerMeter.max = 100;
        hungerMeter.value = pet.hunger;
        petCard.appendChild(hungerMeter);

        const loveLabel = document.createElement("p")
        loveLabel.className = "love-labels";
        loveLabel.textContent = "love:"
        petCard.appendChild(loveLabel);

        const loveMeter = document.createElement("meter")
        loveMeter.min = 0;
        loveMeter.max = 100;
        loveMeter.value = pet.love;
        petCard.appendChild(loveMeter);


        const feedButton = document.createElement("buttton")
        feedButton.className = "feed-buttons";
        feedButton.textContent = "Feed me 🍞";
        petCard.appendChild(feedButton);

        petCard.addEventListener("click", function() {
            pet.hunger = 0;
            hungerMeter.value = pet.hunger;
        })

        petEmoji.addEventListener("click", function() {
            pet.love = 0;
        })

        if (!pet.isAlive){
            petCard.style.backgroundColor = "red";
            hungerLabel.style.display = "none";
            hungerMeter.style.display = "none";
            loveLabel.style.display = "none";
            loveMeter.style.display = "none";
            feedButton.style.display = "none";
            const petEpitaphs = document.createElement("p");
            petEpitaphs.textContent = pet.epitaph;
            petCard.appendChild(petEpitaphs);
        }

    }

}
render();

const meterChanges = setInterval(() => {
    for (let pet of petArray) {
        pet.hunger += 5;
        pet.love -= 5;
        if (pet.hunger === 100 || pet.love === 0){
            pet.isAlive = false;
            clearInterval(petGeneration);
        }
    }

    render();

}, 1000);

const petGeneration = setInterval(() => {
    petArray.push(createPetObject());
    render();
    
}, 5000);
// setTimeout(function(){
//     clearInterval(petGeneration);
// }, 20000)


// // Create pet card
// function petCard() {

//     emojis.textContent = randomEmoji();
//     nameElement.textContent = randomPetNames();
    
//     card.appendChild(hunger);
//     card.appendChild(hProgress);
//     card.appendChild(love);
//     card.appendChild(lProgress);
//     card.appendChild(feed);


//     feed.addEventListener("click", feedPet);
//     emojis.addEventListener("click", lovePet);

//     return card;
// }


// petCard();

// // animate hunger bar
// function startStatsAnimation(card) {

//     const animateHunger = () => {
//         barWidthHunger += 1;
//         hungerBar.style.width = `${barWidthHunger}%`;
//         // set timeout for death
//         if (barWidthHunger === 100 || barWidthLove === 0) {
//             clearCardContent();
//         }
//     };

//     // animate love bar
//     const animateLove = () => {
//         barWidthLove -= 1;
//         loveBar.style.width = `${barWidthLove}%`;
//         if (barWidthHunger === 100 || barWidthLove === 0) {
//             clearCardContent();
//         }
//     };


//     // Set initial values for the bars
//     hungerBar.style.width = "0%";
//     loveBar.style.width = "100%";

// // Animation starts 1 second after page load
//     setTimeout(() => {
//         let intervalIDHunger = setInterval(() => {
//             if (barWidthHunger === 100) {
//                 clearInterval(intervalIDHunger);
//             } else {
//                 animateHunger();
//             }
//         }, 100); // Speed of the animation

//         let intervalIDLove = setInterval(() => {
//             if (barWidthLove === 0) {
//                 clearInterval(intervalIDLove);
//             } else {
//                 animateLove();
//             }
//         }, 100); // Speed of the animation
//     }, 1000);
// };

// startStatsAnimation();


// // if hungry and not loved
// function clearCardContent() {

//     if (cardCleared) {
//         return; 
//     }
//     petAlive = false;
//     cardCleared = true;

//     emojis.textContent = currentEmoji;
//     nameElement.textContent = currentName;
//     quotes.textContent = randomEpitaphs();

//     // styling
//     card.style.backgroundColor = "red";
//     nameElement.style.color = "white";
//     quotes.style.color = "white";
//     emojis.style.backgroundColor = "black";
//     quotes.style.textAlign = "center";

//     // Hide unnecessary elements
//     hunger.style.display = "none";
//     hProgress.style.display = "none";
//     love.style.display = "none";
//     lProgress.style.display = "none";
//     feed.style.display = "none";
// };

// // generateCards();
// const petCardsArray = [];

// function isPetAlive() {
//     return petAlive;
// }
// // Function to generate a new pet card
// function generateNewPet() {
    
//     let newCard = petCard();

//     petCardContainer.appendChild(newCard);

//     startStatsAnimation(newCard);

//     petCardsArray.push(newCard);

//     // petCardsArray.appendChild(newCard);

//     setTimeout(() => {
//         if (isPetAlive()) {
//             generateNewPet();
//         }
//     }, 10000);

// }
// generateNewPet();
