const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 18;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;


function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      timer_element.classList.remove("active");//show the timer
      showText();
      info_box.classList.add("activeInfo");
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  console.log(timeLeft);
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  let rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  let circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
function reset(){
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  timerInterval = null;
  document
  .getElementById("base-timer-path-remaining")
  .classList.remove("red");
document
  .getElementById("base-timer-path-remaining")
  .classList.add("green");
}
//getting all the required elements
//.start_btn button the button is an element inside the class of .start_btn
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const timer_element=document.querySelector("#app");

//If Start Quiz Button Clicked
let count=0
start_btn.onclick= () =>{
    timer_element.classList.add("active");//show the timer
    start_btn.classList.add("remove"); //hide the start button
    startTimer();
}

//If Exit Button Clicked
exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    start_btn.classList.remove("remove");
    count=0;
    reset();
}

//If Continue Button Clicked
continue_btn.onclick=()=>{
  if (count>4){
    count=0;
  }
  info_box.classList.remove("activeInfo");
  timer_element.classList.add("active");//show the timer
  reset();
  startTimer();
}
function showText(){
  const text=info_box.querySelector(".outer");
  let text_tag='<div class="info"><p>'+ questions[count]+'</div>';
  text.innerHTML=text_tag;
  count++;
}


let questions = [
  "Please Wait Again for Happiness",
"Maybe you'll be happier with another partner",
"Is the waiting worth it?",
"Be patient, One more time",
"My friend Lin waited a long time also. For love, life, freedom, happiness, and his marriage"]