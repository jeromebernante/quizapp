
const sections = document.querySelectorAll('.section'); //array
const btnPlay = document.getElementById('btn-play');
const btnSkip = document.getElementById('btn-skip');
const btnAnswer = document.getElementById('btn-answer');
const btnNext = document.getElementById('btn-next');
const questionElement = document.getElementById("question");
const explanationElement = document.getElementById("explanation");
const optionsElement = document.getElementById("options");
var inputAnswerElement = document.getElementById("input-answer");
const statusAnswerElement = document.getElementById("status-answer");
const scoreElement = document.getElementById("score");
const imgElement = document.getElementById("img");
const totalQuestion = document.getElementById("p-total-question");



const doneQuestions = [];
let currentSection= 0; 
let previousQuestionIndex = 0;
let currentQuestionIndex = 0
let score = 0;
let yourAnswer = "";
let isChecked = false;

totalQuestion.textContent = questions.length+" Questions";

sections[currentSection].style.display = 'flex';

btnPlay.addEventListener('click', function() {
  currentQuestionIndex = randomNumber();
  goSection(1);
  displayQuestion();
});

btnSkip.addEventListener('click', function() {
  previousQuestionIndex = currentQuestionIndex;
  yourAnswer = "";
  isChecked = false;
  do{
    currentQuestionIndex = randomNumber();
  }while(previousQuestionIndex === currentQuestionIndex || doneQuestions.includes(currentQuestionIndex));

  displayQuestion();
});


btnAnswer.addEventListener("click", () => checkAnswer(yourAnswer));


btnNext.addEventListener("click", function(){
  yourAnswer = "";
  isChecked = false;
  if(doneQuestions.length !== questions.length){
    while(doneQuestions.includes(currentQuestionIndex)){
      currentQuestionIndex = randomNumber();
    }
    displayQuestion();
    btnAnswer.style.display = "block";
    btnSkip.style.display = "block";
    btnNext.style.display = "none";
    statusAnswerElement.style.display = "none";
  }else{
    scoreElement.textContent = score+" / "+ questions.length;
    goSection(2);
  }
  diff = questions.length - doneQuestions.length;
  if (diff === 1){
    btnSkip.style.display = "none";
  }
  
});

// functions ##########################################################

function goSection(index) {
  sections[currentSection].style.display = 'none';
  currentSection = (index) % sections.length;
  sections[currentSection].style.display = 'flex';
}
function randomNumber(){
  let min = 0;
  let max = questions.length-1;
  randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return randomInt;
}

function isPreviousAndCurrentTheSame(){
  if (previousQuestionIndex === currentQuestionIndex){
    return true;
  }else{
    return false;
  }
}

function displayQuestion(){

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  if (currentQuestion.img === null){
    console.log('img-null');
  }
  imgElement.src = currentQuestion.img;
  yourAnswer = ""; //reset
  isChecked = false;

  console.log(currentQuestion.question);
  if(currentQuestion.input === "true"){
    inputAnswerElement.style.display = "block";
  }else{
    inputAnswerElement.style.display = "none";
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => highlightYourAnswer(option));
      optionsElement.appendChild(li);
    });
  }

}

function highlightYourAnswer(option){
  if(!isChecked){
    const liElements = optionsElement.querySelectorAll("li");
    yourAnswer = option;
    liElements.forEach((li) => {
      // Check if the text content of the <li> contains "Option"
      if (li.textContent === option) {
        // Update the text content to something new
        li.style.backgroundColor = "lightgray";
      }else{
        li.style.backgroundColor = "white";
      }
    });
  }
}



function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  var inputAnswerValue = inputAnswerElement.value.trim();
  if (currentQuestion.input === "true") {
    if(inputAnswerValue != ""){
      isChecked = true;
      showButtonNext();
      showStatusAnswer();
      if (inputAnswerValue === currentQuestion.correctAnswer) {
        score++;
        showStatusAnswer("Correct!");
      }else{
        showStatusAnswer("Wrong!");
      }
      doneQuestions.push(currentQuestionIndex);
    }else{
      console.log('input is empty');
    }
  }else{
    if(yourAnswer !== ""){
      isChecked = true;
      showButtonNext();
      highlightCorrectAnswer(currentQuestion.correctAnswer);
      showStatusAnswer();
      if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        showStatusAnswer("Correct!");
      }else{
        showStatusAnswer("Wrong!");
      }
      doneQuestions.push(currentQuestionIndex);
    }
  }

}

function highlightCorrectAnswer(option){
  const liElements = optionsElement.querySelectorAll("li");
  liElements.forEach((li) => {
    if (li.textContent === option) {
      li.style.backgroundColor = "green";
      li.style.color = "white";
    }
  });
}

function showStatusAnswer(text){
  statusAnswerElement.style.display = "block";
  statusAnswerElement.textContent = text;
  if(text == "Correct!"){
    statusAnswerElement.style.backgroundColor = "yellowgreen";
  }
  if(text == "Wrong!"){
    statusAnswerElement.style.backgroundColor = "tomato";
  }
  
}

function showButtonNext() {
  btnAnswer.style.display = "none";
  btnSkip.style.display = "none";
  btnNext.style.display = "block";
}


