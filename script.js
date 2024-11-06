let checkboxList = document.querySelectorAll(".check-box");
let errorp=document.querySelector(".error");
let input = document.querySelectorAll("input");


checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    let input = document.querySelectorAll("input");
    let inputEmpty = false;
    input.forEach((inp) => {
        console.log(inp.value);
        if (inp.value.length == 0) {
          inputEmpty = true;
        }
      });

    if (inputEmpty) {
      errorp.style.display = "block";
    } else {
        errorp.style.display = "none";
      checkbox.parentElement.classList.toggle("completed");
    }
  });
});

input.forEach((inp) => {
  inp.addEventListener("input", (e) => {
        if(inp.value.length==0){
            checkboxList.forEach((checkbox) => {
                checkbox.parentElement.classList.remove("completed");
            })
        }
    });
});
 
