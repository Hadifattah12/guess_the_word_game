let inputs = document.querySelector(".inputs");

let divNeeded = 6;
let letterNeeded  = 6;
let current = 1;
let win = false;
let hintbutton = document.querySelector(".hint");

for(let i = 0; i < divNeeded; i++)
{
  let creatediv = document.createElement("div");
  creatediv.className = "inputt";
  let span = document.createElement("span");
  span.textContent = `try ${current}`;
  span.className = "try";
  current++;
  creatediv.appendChild(span);  
  for(let j = 0; j < letterNeeded;j++)
  {
    let smallinput = document.createElement("input");
    smallinput.setAttribute("type", "text");
    smallinput.setAttribute("maxlength", "1");
    smallinput.className = "input";
    smallinput.classList.add(`line${i}-letter${j}`);
    creatediv.appendChild(smallinput);
  }
  if(i !== 0)
  {
    creatediv.classList.add("disable-input");
  }
  inputs.appendChild(creatediv);
  enableArrowNavigation();
}

let firstinput = document.querySelector(".inputt input");
firstinput.focus();

let choosenword  = "";
let arrayOfElement = ["school","planet","silver","garden","castle","banana","danger"];
choosenword = arrayOfElement[Math.floor(Math.random() * arrayOfElement.length)];
console.log(choosenword);

let buttonplayagain = document.createElement("button");
buttonplayagain.className = "play-again";
buttonplayagain.textContent = "play again";


let winlosediv = document.querySelector(".message");
let winlose = document.createElement("div");
winlose.className = "win";

let currentLine = 0;
let allLineExecptCurrent = 0;
let buttoncheck = document.querySelector(".check");
buttoncheck.addEventListener("click", () =>{
  let incomplete = false;
for (let i = 0; i < 6; i++) {
  let input = document.querySelector(`.line${currentLine}-letter${i}`);
  if (!input.value.trim()) {
    incomplete = true;
    break;
  }
}
if (incomplete) {
  alert("Please fill all the letters before checking!");
  return;
}
  let currentLetter = 0;
  let correctanswer = 0;
  while(currentLetter < 6 && document.querySelector(`.line${currentLine}-letter${currentLetter}`))
  {
    let currentInput = document.querySelector(`.line${currentLine}-letter${currentLetter}`);
    console.log(currentInput.value);
    console.log(choosenword[currentLetter]);
    if(currentInput.value === choosenword[currentLetter])
    {
      currentInput.style.backgroundColor = "#f44336";
      currentInput.style.color = "white";
      correctanswer++;
    }
    else if(choosenword.includes(currentInput.value) && currentInput.value !== "")
    {
      currentInput.style.backgroundColor = "green";
      currentInput.style.color = "white";
    }else
    {
      currentInput.style.backgroundColor = "black";
      currentInput.style.color = "white";
    }
    currentInput.setAttribute("disabled", "true");
    currentLetter++;
  }
  if(correctanswer === 6)
  {
   winlose.textContent = `you win the word was ${choosenword}`;
   winlosediv.appendChild(winlose);
   buttoncheck.style.display = "none";
   hintbutton.style.display = "none";
   winlose.appendChild(buttonplayagain);
   buttonplayagain.addEventListener("click", () => {
    location.reload();
  });
   win = true;
  }
  currentLetter = 0;
  let oldLine = document.querySelectorAll(".inputt");
  oldLine[currentLine].classList.add("disable-input");
  currentLine++;
  if(currentLine < 6)
  {
    let newline = document.querySelectorAll(".inputt");
    newline[currentLine].classList.remove("disable-input");
    let newinput = document.querySelector(`.line${currentLine}-letter${currentLetter}`);
    newinput.focus();
  }
  if(currentLine === 6 && !win)
  {
    winlose.textContent = `you lose the word was ${choosenword}`;
    winlosediv.appendChild(winlose);
    buttoncheck.style.display = "none";
    hintbutton.style.display = "none";
    winlose.appendChild(buttonplayagain);
    buttonplayagain.addEventListener("click", () => {
     location.reload();
   });
  }
});

let nbofhint = document.querySelector(".nbofhint");
let nbhint = 2;
let firstchoose;
nbofhint.innerHTML = nbhint;

hintbutton.addEventListener("click", () =>{
  let choosenlettertodisplay = Math.floor(Math.random() * choosenword.length);
  if(nbhint === 2)
    firstchoose = choosenlettertodisplay;
  if(nbhint === 1)
    {
      if(choosenlettertodisplay === firstchoose)
        while(choosenlettertodisplay === firstchoose)
          choosenlettertodisplay = Math.floor(Math.random() * choosenword.length);
    }
  if(nbhint > 0){
    nbhint--;
    nbofhint.textContent = nbhint;
  }
  if(nbhint === 0)
  {
    hintbutton.style.display = "none";
  }
  let chossenforhint = document.querySelector(`.line${currentLine}-letter${choosenlettertodisplay}`);
  chossenforhint.value = choosenword[choosenlettertodisplay];
})


let allinput = document.querySelectorAll(".input");
allinput.forEach((element,index) => {
  index = index % 6;
  index++;
  element.addEventListener("input", () =>{
    if(element.value.length === 1 && index < 6)
    {
      console.log(index);
      let nextinput = document.querySelector(`.line${currentLine}-letter${index}`);
      nextinput.focus();
    }
  })
});

function enableArrowNavigation() {
  const inputs = document.querySelectorAll(".input");
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        let next = inputs[index + 1];
        if (next && !next.parentElement.classList.contains("disable-input")) {
          next.focus();
        }
      } else if (e.key === "ArrowLeft") {
        let prev = inputs[index - 1];
        if (prev && !prev.parentElement.classList.contains("disable-input")) {
          prev.focus();
        }
      }
    });
  });
}

