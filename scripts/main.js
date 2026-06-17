const form = document.querySelector("#transaction-form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    
    const description = document.querySelector('#description').value;
    const amount = document.querySelector('#amount').value;
    const category = document.querySelector('#category').value;
    const date = document.querySelector('#date').value;

    console.log(description, amount, category, date);
});