var currentKey = 0;

textToSpeech("Let's get your fingers placed properly on the keyboard");
textToSpeech(
  "use your left hand to feel the key on the left side of the keyboard. you will feel a bump somewhere in the middle row. place your left-index over it and press the key"
);
function textToSpeech(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance();

    utterance.text = text;

    speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported in this browser.");
  }
}
function playWarningSound() {
  // Replace 'path/to/warning-sound.mp3' with the actual path to your sound file
  var audio = new Audio("{% static 'audio/wrong-answer-126515.mp3' %}");
  audio.play();
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

$(document).keypress(function (event) {
  window.speechSynthesis.cancel();
  let finKeys = {
    f: "feel the bump and press it",
    d: "place your middle finger on the left adjacent key and press it",
    s: "place your left ring finger on the key left key adjacent to middle finger and press it",
    a: "place your left pinky on the key left to your ringfinger",
    j: "Now, place your right index two keys left to your left index, it also has a bump",
    k: "place your right middle finger on the key adjacent to your right index",
    l: "place your right ring finger on the key adjacent to your right middle finder",
    ";": "place your pinky near your ring finger",
    " ": "finally, place both your thumbs on the longest key in the last row",
  };
  let keys = Object.keys(finKeys);
  const charPressed = String.fromCharCode(event.which).toLowerCase();
  var charToFind = keys[currentKey];
  if (charPressed === charToFind) {
    currentKey++;
    if (currentKey === 9) {
      textToSpeech(" Fingers placement is done. ");
      updateSubLevel(3);
      return;
    }
    textToSpeech("goodjob");
    textToSpeech(`The Key you pressed is    ${keys[currentKey - 1]}`);
    textToSpeech(finKeys[keys[currentKey]]);
  } else {
    navigate(charPressed, charToFind);
    console.log(charPressed);
    console.log(charToFind);
  }
});
