const form = document.querySelector("#transaction-form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("Form sumbmitted!");
});