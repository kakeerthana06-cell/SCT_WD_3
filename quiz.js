const quiz=[

{q:"ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಸ್ಥಾಪಕರು ಯಾರು?",
o:["ಕೃಷ್ಣದೇವರಾಯ","ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕ","ಸದಾಶಿವರಾಯ","ಅಚ್ಯುತದೇವರಾಯ"],
a:1},

{q:"ತಾಳಿಕೋಟೆ ಕದನ ನಡೆದ ವರ್ಷ?",
o:["1526","1556","1565","1576"],
a:2},

{q:"ಗೋಲ್ ಗುಂಬಜ್ ನಿರ್ಮಿಸಿದವರು?",
o:["ಇಬ್ರಾಹಿಂ ಆದಿಲ್ ಶಾ","ಮೊಹಮ್ಮದ್ ಆದಿಲ್ ಶಾ","ಯೂಸುಫ್ ಆದಿಲ್ ಶಾ","ಅಲಿ ಆದಿಲ್ ಶಾ"],
a:1},

{q:"ಹೊಯ್ಸಳರ ರಾಜಧಾನಿ?",
o:["ಬಾದಾಮಿ","ಹಳೇಬೀಡು","ಬನವಾಸಿ","ಕಲ್ಯಾಣಿ"],
a:1},

{q:"ರಾಣಿ ಚೆನ್ನಮ್ಮ ಯಾರ ವಿರುದ್ಧ ಹೋರಾಡಿದರು?",
o:["ಫ್ರೆಂಚರು","ಡಚ್ಚರು","ಬ್ರಿಟಿಷರು","ಪೋರ್ಚುಗೀಸರು"],
a:2},

{q:"ಗುಲಾಮಗಿರಿ ರದ್ದು ಮಾಡಿದ ಅಧ್ಯಕ್ಷ?",
o:["ವಾಷಿಂಗ್ಟನ್","ಅಬ್ರಹಾಂ ಲಿಂಕನ್","ಕೆನಡಿ","ರೂಸ್ವೆಲ್ಟ್"],
a:1},

{q:"ವಾಟರ್ಲೂ ಯುದ್ಧದಲ್ಲಿ ಸೋತವರು?",
o:["ನೆಪೋಲಿಯನ್","ಹಿಟ್ಲರ್","ಮುಸ್ಸೋಲಿನಿ","ವಿಲಿಯಂ"],
a:0},

{q:"ಇಂಗ್ಲೆಂಡ್ ಮೊದಲ ಮಹಿಳಾ ಪ್ರಧಾನಿ?",
o:["ವಿಕ್ಟೋರಿಯಾ","ಮಾರ್ಗರೆಟ್ ಥ್ಯಾಚರ್","ಡಯಾನಾ","ಎಲಿಜಬೆತ್"],
a:1},

{q:"ಭಾರತ ಸ್ವಾತಂತ್ರ್ಯ ಪಡೆದ ವರ್ಷ?",
o:["1942","1945","1947","1950"],
a:2},

{q:"ಭಾರತ ಸಂವಿಧಾನ ಜಾರಿಗೆ ಬಂದ ವರ್ಷ?",
o:["1947","1948","1950","1952"],
a:2}

];

let current=0;
let userAnswers=new Array(quiz.length).fill(null);

const question=document.getElementById("question");
const options=document.getElementById("options");
const result=document.getElementById("result");

function loadQuestion(){

question.innerText=
`Q${current+1}. ${quiz[current].q}`;

options.innerHTML="";

quiz[current].o.forEach((opt,i)=>{
let div=document.createElement("div");
div.className="option";
div.innerText=opt;

if(userAnswers[current]===i)
div.classList.add("selected");

div.onclick=()=>{
userAnswers[current]=i;
loadQuestion();
};

options.appendChild(div);
});
}

function nextQuestion(){
if(current<quiz.length-1){
current++;
loadQuestion();
}else{
showResult();
}
}

function prevQuestion(){
if(current>0){
current--;
loadQuestion();
}
}

function showResult(){

document.querySelector(".quiz-box").style.display="none";
result.style.display="block";

let score=0;
let html="<h2>📊 ಫಲಿತಾಂಶ</h2>";

quiz.forEach((q,i)=>{

let correct=q.a;
let user=userAnswers[i];

if(user===correct) score++;

html+=`
<p><b>Q${i+1}: ${q.q}</b><br>
ನಿಮ್ಮ ಉತ್ತರ: 
<span class="${user===correct?'correct':'wrong'}">
${user!=null?q.o[user]:"ಉತ್ತರ ನೀಡಿಲ್ಲ"}
</span><br>
ಸರಿಯಾದ ಉತ್ತರ:
<span class="correct">${q.o[correct]}</span>
</p><hr>`;
});

html+=`<h2>🎉 ನಿಮ್ಮ ಅಂಕ: ${score}/${quiz.length}</h2>`;

result.innerHTML=html;
}

loadQuestion();