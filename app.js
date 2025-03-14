let gameSeq = []; // Stores the game sequence
let userSeq = []; // Stores the user sequence

let btns = ["red", "green", "yellow", "purple"]; // Available button colors

let started = false; // Track game start state
let level = 0; // Track current level

let h2 = document.querySelector('h2'); // Selects the h2 element to update the game status

// Start the game when a key is pressed
document.addEventListener('keypress', function () {
    if (!started) {
        console.log('Game started');
        started = true;
        levelUp();
    }
});

// Flash effect for the game sequence
function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove("flash"), 250);
} 

// Flash effect for the user click
function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(() => btn.classList.remove("userFlash"), 250);
} 

// Increment the level and add a new random color to the game sequence
function levelUp() {
    userSeq = []; // Reset user sequence
    level++; // Increment level
    h2.innerText = `Level ${level}`; // Update the level text

    let randIndex = Math.floor(Math.random() * 4); // Random index from 0 to 3
    let randColor = btns[randIndex]; // Get a random color
    let randbtn = document.querySelector(`.${randColor}`); // Select the corresponding button

    gameSeq.push(randColor); // Add the color to the game sequence

    gameFlash(randbtn); // Flash the button
}

// Check the user's sequence against the game sequence
function checkSeq(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Move to the next level after a short delay
        }
    } else {
        let beep = new Audio('beep.mp3'); // Play beep sound for wrong button
        beep.play();

        // If the user clicks the wrong button, show game over and play beep sound
        h2.innerHTML = `Game Over! Your score is <b>${level}</b><br>Press any key to start`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => document.querySelector("body").style.backgroundColor = "white", 150);

        reset(); // Reset the game
    }
}

// Handle button click events
function btnPress() {
    let btn = this; // Get the clicked button
    userFlash(btn); // Flash the button

    let userColor = btn.getAttribute("id"); // Get the color of the clicked button
    userSeq.push(userColor); // Add the color to the user's sequence

    checkSeq(userSeq.length - 1); // Check the user's input against the game sequence
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset the game state
function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
