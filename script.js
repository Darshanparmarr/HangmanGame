const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll(".figure-part");
const words = [
  "algorithm", "array", "boolean", "bug", "class", "closure", "compile", "constant",
  "constructor", "data", "database", "debug", "dependency", "encapsulation", "exception",
  "framework", "function", "inheritance", "input", "interface", "iteration", "library",
  "loop", "method", "module", "namespace", "object", "operator", "parameter", "polymorphism",
  "prototype", "recursion", "refactor", "repository", "return", "runtime", "scope", "server",
  "singleton", "source", "statement", "string", "syntax", "thread", "variable", "vector",
  "websocket", "abstraction", "api", "asynchronous", "backend", "binary", "bitwise", "callback",
  "client", "compiler", "concurrency", "constructor", "context", "control", "daemon", "database",
  "design", "dynamic", "encryption", "frontend", "garbage", "hash", "heap", "implementation",
  "inheritance", "json", "key", "lambda", "linux", "middleware", "mutable", "node", "null",
  "oop", "package", "pipeline", "pointer", "protocol", "queue", "recursive", "regex", "repository",
  "rest", "schema", "shell", "stack", "token", "typescript", "unit", "virtual", "yield"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetter = [];
const wrongLetter = [];

// Show hidden word
function displayWord(){
  wordEl.innerHTML=`
  ${selectedWord
    .split('')
    .map(letter =>`
      <span class="letter">
      ${correctLetter.includes(letter) ? letter : ''}
      </span>
      `).join('')
  }
  `;

  const innerWord = wordEl.innerText.replace(/\n/g,'');

  if(innerWord === selectedWord){
    finalMessage.innerText = 'Congratulations! You Won! 🥳';
    popup.style.display = 'flex';
  }
}

// Update the wrong letters
function updateWrongLetterEl(){
  // Display wrong letters
  wrongLetterEl.innerHTML = `
    ${wrongLetter.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetter.map(letter => `<span> ${letter}</span>`) }
  `;

  //Display Figure Parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetter.length;
    if(index < errors){
      part.style.display = 'block';
    }else{
      part.style.display = 'none';
    }
  });

  // Check if lost
  if(wrongLetter.length === figureParts.length){
    finalMessage.innerText = "Unfortunately you lost. ☹️";
    popup.style.display = 'flex';
  }

}

// Show Notification
function showNotification(){
  notification.classList.add('show');
  setTimeout(()=>{
    notification.classList.remove('show');
  }, 2000)
}

// Keydown Letter Press
window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90){
  const letter = e.key;
    if(selectedWord.includes(letter)){
      if(!correctLetter.includes(letter)){
        correctLetter.push(letter);
        displayWord();
      } else{
        showNotification();
      }
    } else{
      if(!wrongLetter.includes(letter)){
      wrongLetter.push(letter);

      updateWrongLetterEl();
    }else{
      showNotification();
      }
    }
  } 
});

// Restart Game and Play Again

playAgainBtn.addEventListener('click', ()=> {
  //Empty array
  correctLetter.splice(0);
  wrongLetter.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetterEl();
  popup.style.display = 'none';
})

displayWord()