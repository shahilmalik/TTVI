function playWarningSound() {
  // Replace 'path/to/warning-sound.mp3' with the actual path to your sound file
  //   var audio = new Audio("{% static 'audio/wrong-answer-126515.mp3' %}");
  audio.play();
}
function speakText(text) {
  var speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

let spaceKeyPressCount = 0;
let spaceKeyDown = false;
let spaceKeyTimeout;
let npage = false;

const SPACE_KEY_CODE = 32; // Key code for the space key

function handleSpaceKeyPress() {
  // Check the number of space key presses
  if (spaceKeyPressCount >= 2 && npage) {
    // Double space pressed, trigger "Retake"
    console.log("Double space pressed - Retake");
    window.location.href = "/finger_placement_assist";
  }
  // Reset the space key press count
  spaceKeyPressCount = 0;
}
speakText("The longest key in the middle of the last row is 'space'.");
speakText("Press 'space' to go further in the lecture");
let spcPressed = false;
let spcCount = 0;
var shiftPressed = false;
let olElement = document.getElementById("dynamicList");
let shiftCount = 0;

let bgDict = {
  0: "Every page has 5 options in the navbar, Lessons, Test, Check Position, Placement Assist",
  1: "The bottom-left most key in your keyboard is 'control'.",
  2: "Press 'Control' to hear options.",
  3: "The key right above the control is your 'shift key'",
  4: "Press 'Shift' to repeat. Note that, Shift will not repeat the options in the navbar",
  5: "Hold down 'control' and press 'space' to select the option you heard.",
  6: "Repeated shift keys can take you back to previous utterance.",
};
let bgContent = Object.keys(bgDict);
var flag = false;

document.addEventListener("keydown", function (event) {
  if (event.keyCode === SPACE_KEY_CODE && !spaceKeyDown) {
    spaceKeyDown = true;
    spaceKeyPressCount++;

    // Clear any existing timeout
    clearTimeout(spaceKeyTimeout);

    // Set a new timeout after 1 second
    spaceKeyTimeout = setTimeout(function () {
      handleSpaceKeyPress();
    }, 1000);
  }
  if (event.keyCode === 32) {
    window.speechSynthesis.cancel();

    flag = false;
    shiftCount = 0;
    spcPressed = true;
    if (spcCount === 7) {
      speakText("End of Beginner Guide");
      npage = true;
      speakText("Press Space twice to learn finger placement ");
    } else {
      console.log(spcCount);
      console.log(bgDict[bgContent[spcCount % 7]]);
      let listItem = document.createElement("li");

      listItem.textContent = bgDict[bgContent[spcCount % 7]];

      olElement.appendChild(listItem);

      speakText(bgDict[bgContent[spcCount % 7]]);
      spcCount++;
    }
  }
  if (event.key === "Shift") {
    window.speechSynthesis.cancel();

    if (flag) {
      playWarningSound();
    } else if (spcCount === 0) {
      playWarningSound();
      spcCount = 0;
      flag = true;
    } else {
      shiftCount++;
      shiftPressed = true;
      console.log("Shift key pressed");
      if (shiftCount > 1 && spcCount > 0) {
        if (spcCount > 0) {
          spcCount--;
        }
        console.log(spcCount % 7);
        olElement.removeChild(olElement.children[spcCount % 7]);
        console.log("removed :", olElement.children[spcCount % 7]);
      }

      speakText(bgDict[bgContent[(spcCount % 8) - 1]]);
    }
  }
});

document.addEventListener("keyup", function (event) {
  if (event.keyCode === SPACE_KEY_CODE) {
    spaceKeyDown = false;
  }
  if (event.keyCode === 32) {
    spcPressed = false;
  }
  if (event.key === "Shift") {
    shiftPressed = false;
    console.log("Shift key released");
  }
});
