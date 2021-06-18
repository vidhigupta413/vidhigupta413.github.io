var questionCount = 0;
var Element1Score = 0;
var Element2Score = 0;
var Element3Score = 0;
var Element4Score = 0;

var q1a1 = document.getElementById("q1a1");
var q1a2 = document.getElementById("q1a2");
var q1a3 = document.getElementById("q1a3");
var q1a4 = document.getElementById("q1a4");
var q2a1 = document.getElementById("q2a1");
var q2a2 = document.getElementById("q2a2");
var q2a3 = document.getElementById("q2a3");
var q2a4 = document.getElementById("q2a4");
var q3a1 = document.getElementById("q3a1");
var q3a2 = document.getElementById("q3a2");
var q3a3 = document.getElementById("q3a3");
var q3a4 = document.getElementById("q3a4");
var q4a1 = document.getElementById("q4a1");
var q4a2 = document.getElementById("q4a2");
var q4a3 = document.getElementById("q4a3");
var q4a4 = document.getElementById("q4a4");
var result = document.getElementById("result");

q1a1.addEventListener("click", Fire);
q1a2.addEventListener("click", Air);
q1a3.addEventListener("click", Water);
q1a4.addEventListener("click", Earth);
q2a1.addEventListener("click", Fire);
q2a2.addEventListener("click", Air);
q2a3.addEventListener("click", Water);
q2a4.addEventListener("click", Earth);
q3a1.addEventListener("click", Fire);
q3a2.addEventListener("click", Air);
q3a3.addEventListener("click", Water);
q3a4.addEventListener("click", Earth);
q4a1.addEventListener("click", Fire);
q4a2.addEventListener("click", Air);
q4a3.addEventListener("click", Water);
q4a4.addEventListener("click", Earth);

function Fire() {
  Element1Score += 1;
  questionCount += 1;
  if (questionCount >= 4) {
    updateResult();
  }
}

function Air() {
  Element2Score += 1;
  questionCount += 1;
  if (questionCount >= 4) {
    updateResult();
  }
}

function Water() {
  Element3Score += 1;
  questionCount += 1;
  if (questionCount >= 4) {
    updateResult();
  }
}

function Earth() {
  Element4Score += 1;
  questionCount += 1;
  if (questionCount >= 4) {
    updateResult();
  }
}

function updateResult() {
  if (Element1Score >= 3) {
    result.innerHTML =
      "Woah, your energy and passion makes you fit for Fire Nation! Best firebenders: Zuko, Azula, Uncle Iroh";
  } else if (Element2Score >= 3) {
    result.innerHTML =
      "Your ability stay calm but also sly makes you perfect for the Air Nation... Best airbenders: Aang, Jinora, Tenzin";
  } else if (Element3Score >= 3) {
    result.innerHTML =
      "Wow, you probably have a really good sense of control and you can go with the flow: Water Tribe it is! Best Waterbenders: Katara, Korra";
  } else if (Element4Score >= 3) {
    result.innerHTML =
      "You must be a tough and strong-minded person! Definitely Earth Kingdom! Best Earthbenders: Toph, Bolin, Chief Beifong";
  } else {
    result.innerHTML =
      "Wow...you are all-rounded and have the ability to master all four elements! You must be the Avatar!";
  }
}
