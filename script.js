let checkboxList = document.querySelectorAll(".check-box");
let inputList = document.querySelectorAll("input");
let errorLabel = document.querySelector(".error");
let progressBar = document.querySelector(".bar");
let inputStatus = JSON.parse(localStorage.getItem("inputStatus")) || {};
let progress = document.querySelector(".progress");
let completedGoals = Object.values(inputStatus).filter((input) => input.completed).length;
progress.style.width = `${(completedGoals / 3) * 100}%`;
progress.firstElementChild.innerText = `${completedGoals}/3 Completed`;

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

  input.addEventListener("change", () => {
    inputStatus[`input${input.dataset.id}`] = {
      value: input.value,
      completed: false,
    };
    localStorage.setItem("inputStatus", JSON.stringify(inputStatus));


    if (input.parentElement.classList.contains("completed")) {
      input.parentElement.classList.remove("completed");
    }
    completedGoals = Object.values(inputStatus).filter((input) => input.completed).length;
    progress.style.width = `${(completedGoals / 3) * 100}%`;
    progress.firstElementChild.innerText = `${completedGoals}/3 Completed`;
  });
});
