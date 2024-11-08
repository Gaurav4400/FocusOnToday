let checkboxList = document.querySelectorAll(".check-box");
let inputList = document.querySelectorAll("input");
let progressBar = document.querySelector(".bar");
let inputStatus = JSON.parse(localStorage.getItem("inputStatus")) || {};
let progress = document.querySelector(".progress");
let completedGoals = Object.values(inputStatus).filter((input) => input.completed).length;
let quote=document.querySelector(".motivate-quote");
let resetBtn=document.querySelector(".reset-btn");
let addGoalsBtn=document.querySelector(".add-btn");
progress.style.width = `${(completedGoals / 3) * 100}%`;
progress.firstElementChild.innerText = `${completedGoals}/3 Completed`;
updateQuote();

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    let allInputSet = [...inputList].every((input) => {
      return input.value;
    });
    if (allInputSet) {
      progressBar.classList.remove("show-error");

      let inpId = checkbox.nextElementSibling.dataset.id;
      checkbox.parentElement.classList.toggle("completed");
      inputStatus[`input${inpId}`].completed =!inputStatus[`input${inpId}`].completed;

      completedGoals = Object.values(inputStatus).filter((input) => input.completed).length;
      updateQuote();

      progress.style.width = `${(completedGoals / 3) * 100}%`;
      progress.firstElementChild.innerText = `${completedGoals}/3 Completed`;

      localStorage.setItem("inputStatus", JSON.stringify(inputStatus));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputList.forEach((input) => {
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
});

inputList.forEach((input) => {
  if (inputStatus[`input${input.dataset.id}`]) {
    input.value = inputStatus[`input${input.dataset.id}`].value || "";
    if (inputStatus[`input${input.dataset.id}`].completed) {
      input.parentElement.classList.add("completed");
    }
  }
  input.addEventListener("input", () => {
     if (inputStatus[`input${input.dataset.id}`]?.completed) {
      input.value=inputStatus[`input${input.dataset.id}`].value ;
      return;
    }
    inputStatus[`input${input.dataset.id}`] = {
      value: input.value,
      completed: false,
    };
    localStorage.setItem("inputStatus", JSON.stringify(inputStatus));
  });
});

function updateQuote(){
  completedGoals = Object.values(inputStatus).filter((input) => input.completed).length;
  if(completedGoals==1){
    quote.innerText="Well begun is half done!";
  }else if(completedGoals==2){
    quote.innerText="Just a step away, keep going!";
  }else if(completedGoals==3){
    quote.innerText="All done for today, time to chill!";
  }else{
    quote.innerText="Raise the bar by completing your goals!";
  }
}


resetBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  localStorage.clear();
  location.reload();
})

// future scope
// addGoalsBtn.addEventListener("click",(e)=>{

//   e.preventDefault();
//   const btnContainer=document.querySelector(".button-container");
//     const newInput=document.querySelector(".btn").cloneNode(true);
//     newInput.querySelector("input").value="";
//     newInput.lastElementChild.dataset.id=document.querySelectorAll("input").length
//     btnContainer.appendChild(newInput);
//     localStorage.setItem("totalGoals", JSON.stringify(document.querySelectorAll("input").length));
//     addGoalsBtn.disabled = document.querySelectorAll("input").length>=5;
// })