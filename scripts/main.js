const form = document.querySelector("#transaction-form");

const descriptionPattern = /^\S(?:.*\S)?$/;
const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;        
const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const categoryPattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

form.addEventListener("submit", function(event){
    event.preventDefault();
    
    const description = document.querySelector('#description').value;
    const amount = document.querySelector('#amount').value;
    const category = document.querySelector('#category').value;
    const date = document.querySelector('#date').value;

    const isDescriptionValid = descriptionPattern.test(description);
    const isAmountValid = amountPattern.test(amount);
    const isCategoryValid = categoryPattern.test(category);
    const isDateValid = datePattern.test(date);

    console.log("Description Valid?", isDescriptionValid);
    console.log("Amount Valid?", isAmountValid);
    console.log("Category Valid?", isCategoryValid);
    console.log("Date Valid?", isDateValid);

    if (!isDescriptionValid) {
        document.querySelector('#description-error').textContent = "Description cannot be empty or have leading/trailing spaces.";
    } else {
        document.querySelector('#description-error').textContent = "";
    }

    if (!isAmountValid) {
        document.querySelector('#amount-error').textContent = "Amount cannot be empty or have leading/trailing spaces.";
    } else {
        document.querySelector('#amount-error').textContent = "";
    }

    if (!isCategoryValid) {
        document.querySelector('#category-error').textContent = "Category can only contain letters, spaces, or hyphens (e.g. Food, Self-Care).";
    } else {
        document.querySelector('#category-error').textContent = "";
    }

    if (!isDateValid) {
        document.querySelector('#date-error').textContent = "Please enter a valid date in YYYY-MM-DD format.";
    } else {
        document.querySelector('#date-error').textContent = "";
    }
});