const board = document.getElementById("board");
const popup = document.getElementById("winnerPopup");
const winnerText = document.getElementById("winnerText");
const modeMsg = document.getElementById("modeMessage");

let cells=[];
let current="X";
let gameMode="pvp";
let gameActive=true;

const winPatterns=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

function startGame(mode){
gameMode=mode;
modeMsg.innerText =
mode==="pvp"
? "👥 Player vs Player Mode Selected!"
: "🤖 Playing Against Computer!";
resetGame();
}

function createBoard(){
board.innerHTML="";
cells=[];

for(let i=0;i<9;i++){
let cell=document.createElement("div");
cell.classList.add("cell");
cell.addEventListener("click",()=>handleClick(i));
board.appendChild(cell);
cells.push(cell);
}
}

function handleClick(i){
if(!gameActive || cells[i].innerText!=="") return;

cells[i].innerText=current;

if(checkWin()){
showWinner(current==="X"?"Player X":"Player O");
return;
}

current=current==="X"?"O":"X";

if(gameMode==="cpu" && current==="O"){
setTimeout(computerMove,400);
}
}

function computerMove(){
let empty=cells
.map((c,i)=>c.innerText===""?i:null)
.filter(v=>v!==null);

let move=empty[Math.floor(Math.random()*empty.length)];
cells[move].innerText="O";

if(checkWin()){
showWinner("Computer");
return;
}

current="X";
}

function checkWin(){
return winPatterns.some(pattern=>{
let[a,b,c]=pattern;
return(
cells[a].innerText &&
cells[a].innerText===cells[b].innerText &&
cells[a].innerText===cells[c].innerText
);
});
}

function showWinner(name){
gameActive=false;
winnerText.innerText=`🎉 Congratulations ${name}!`;
popup.style.display="block";
startConfetti();
}

function resetGame(){
current="X";
gameActive=true;
popup.style.display="none";
createBoard();
}

/* 🎉 CONFETTI EFFECT */

const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let confetti=[];

function startConfetti(){
confetti=[];
for(let i=0;i<150;i++){
confetti.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height-500,
r:Math.random()*6+2,
d:Math.random()*5+2
});
}
animateConfetti();
}

function animateConfetti(){
ctx.clearRect(0,0,canvas.width,canvas.height);

confetti.forEach(c=>{
ctx.beginPath();
ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
ctx.fill();

c.y+=c.d;
if(c.y>canvas.height) c.y=0;
});

if(!gameActive)
requestAnimationFrame(animateConfetti);
}

createBoard();