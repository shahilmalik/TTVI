var currentKey = 0;
var shiftPressed = false;
// textToSpeech("Let's check your finger placements");
// textToSpeech(
//   "if you do not know how to place your fingers. go to finger placement assist tab."
// );
// textToSpeech("Now, you will press the finger being dictated");
// textToSpeech("use shift to hear again");
function textToSpeech(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance();

    utterance.text = text;

    speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported in this browser.");
  }
}

function findIndex(character, keys) {
  for (let rowIndex = 0; rowIndex < keys.length; rowIndex++) {
    for (let colIndex = 0; colIndex < keys[rowIndex].length; colIndex++) {
      if (character === keys[rowIndex][colIndex]) {
        return [rowIndex, colIndex];
      }
    }
  }
  return null;
}
function playWarningSound() {
  // Replace 'path/to/warning-sound.mp3' with the actual path to your sound file
  var audio = new Audio("{% static 'audio/wrong-answer-126515.mp3' %}");
  audio.play();
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
$(document).keydown(function (event) {
  // Check if the pressed key is Shift
  if (event.key === "Shift") {
    shiftPressed = true;
    console.log("Shift key pressed");
    textToSpeech(finKeys[testset[currentKey]]);
  }
});

$(document).keyup(function (event) {
  // Reset the shiftPressed variable when the Shift key is released
  if (event.key === "Shift") {
    shiftPressed = false;
    console.log("Shift key released");
  }
});
function navigate(charPressed, charToFind) {
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  const index1 = findIndex(charPressed, keys);
  const index = findIndex(charToFind, keys);

  const row = index[0] - index1[0];
  const col = index[1] - index1[1];

  let direction = "left";
  let statement = "";

  if (row === 0) {
    statement = "the same row";
  } else if (row < 0) {
    statement = "the upper row";
  } else {
    statement = "the row below";
  }

  if (col > 0) {
    direction = "right";
  }

  console.log(`The index of '${charPressed}' is: [${index1}]`);
  console.log(`${Math.abs(col)} key to the ${direction} in ${statement}`);
  // textToSpeech(`The index of '${charPressed}' is: [${index1}]`);
  textToSpeech(`${Math.abs(col)} key to the ${direction} in ${statement}`);
}

let finKeys = {
  f: "left index",
  d: "left middle ",
  s: "left ring",
  a: "left pinky",
  j: "right index",
  k: "right middle",
  l: "right ring",
  ";": "right pinky",
  " ": "left thumb",
  " ": "right thumb",
};
let keys = Object.keys(finKeys);
const testset = Array(20)
  .fill()
  .map(() => keys[Math.floor(Math.random() * keys.length)]);

// Shuffle the array
shuffleArray(testset);

// Output the shuffled array
console.log(testset);
textToSpeech(finKeys[testset[0]]);
$(document).keypress(function (event) {
  const charPressed = String.fromCharCode(event.which).toLowerCase();
  var charToFind = testset[currentKey];
  var id = charPressed;
  if (id === ";") {
    id = "semi";
  } else if (id === " ") {
    id = "spc";
  }
  var keyElement = document.getElementById(id);
  if (shiftPressed) {
    console.log("Shift key is still pressed");
    // Handle the Shift key behavior here
    return;
  }
  if (currentKey === 20) {
    console.log("done");
    subLevel++;
  }
  if (charPressed === charToFind) {
    keyElement.style.borderColor = "green";
    currentKey++;
    console.log(currentKey);
    console.log(subLevel);
    textToSpeech("goodjob");
    textToSpeech(finKeys[testset[currentKey]]);
  } else {
    keyElement.style.borderColor = "red";
    playWarningSound();
    navigate(charPressed, charToFind);
    console.log(charPressed);
    console.log(charToFind);
  }
});
