const flashcards = [

{
name:"Eye",
image:"eye.png.jpg",
description:"The eye helps us see the world around us."
},

{
name:"Ear",
image:"ear.png.jpg",
description:"The ear helps us hear sounds."
},

{
name:"Nose",
image:"nose.png.jpg",
description:"The nose helps us smell things."
},

{
name:"Mouth",
image:"mouth.png.jpg",
description:"The mouth helps us eat and speak."
},

{
name:"Hand",
image:"hand.png.jpg",
description:"The hand helps us hold objects."
},

{
name:"Foot",
image:"foot.png.jpg",
description:"The foot helps us walk and run."
}

];

let current = 0;
let score = 0;

const card =
document.getElementById("card");

card.addEventListener("click",()=>{

card.classList.toggle("flip");

});

function loadCard(){

document.getElementById("title").textContent =
flashcards[current].name;

document.getElementById("backTitle").textContent =
flashcards[current].name;

document.getElementById("description").textContent =
flashcards[current].description;

document.getElementById("image").src =
flashcards[current].image;

updateProgress();

}

function updateProgress(){

let percent =
((current+1)/flashcards.length)*100;

document.getElementById("bar").style.width =
percent+"%";

}

function updateScore(){

document.getElementById("score").innerHTML =
`⭐ Score: ${score}`;

}

function speakWord(event){

event.stopPropagation();

speechSynthesis.cancel();

let speech =
new SpeechSynthesisUtterance(
flashcards[current].name
);

speech.lang="en-US";
speech.rate=0.2;

speechSynthesis.speak(speech);

}

function repeatAfterMe(event){

event.stopPropagation();

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

alert("Speech Recognition not supported.");
return;

}

const recognition =
new SpeechRecognition();

recognition.lang="en-US";

document.getElementById("result").innerHTML =
"🎤 Listening...";

recognition.start();

recognition.onresult = function(e){

let spoken =
e.results[0][0].transcript
.toLowerCase()
.trim();

let answer =
flashcards[current].name
.toLowerCase();

if(spoken.includes(answer)){

score += 10;

updateScore();

document.getElementById("result").innerHTML =
"✅ Correct! +10 Points";

}
else{

document.getElementById("result").innerHTML =
`❌ You said "${spoken}"`;

}

};

}

function nextCard(){

current++;

if(current >= flashcards.length){

finishGame();
return;

}

card.classList.remove("flip");

document.getElementById("result").innerHTML = "";

loadCard();

}

function getBadge(){

if(score >= 60){

return "🏆 Expert";

}
else if(score >= 30){

return "🥈 Intermediate";

}
else{

return "🥉 Beginner";

}

}

function finishGame(){

document.querySelector(".container").innerHTML =

`
<div class="final-screen">

<h1>🎉 Congratulations!</h1>

<h2>Final Score</h2>

<h1>${score}</h1>

<div class="badge">
${getBadge()}
</div>

<p>
Great job learning body parts!
</p>

<button class="play-again"
onclick="location.reload()">

Play Again

</button>

</div>
`;

confetti({
particleCount:300,
spread:180,
origin:{y:0.6}
});

setTimeout(()=>{

confetti({
particleCount:300,
spread:180,
origin:{y:0.6}
});

},500);

setTimeout(()=>{

confetti({
particleCount:300,
spread:180,
origin:{y:0.6}
});

},1000);

}

loadCard();
