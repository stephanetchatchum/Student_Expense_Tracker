const form = document.querySelector("#transaction-form");

const descriptionPattern = /^\S(?:.*\S)?$/;
const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;        
const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const categoryPattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
const duplicateWordPattern = /\b(\w+)\s+\1\b/i;

let transactions = [];

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

    const isDescriptionCorrect = duplicateWordPattern.test(description);

    console.log("Description Valid?", isDescriptionValid);
    console.log("Amount Valid?", isAmountValid);
    console.log("Category Valid?", isCategoryValid);
    console.log("Date Valid?", isDateValid);

    if (!isDescriptionValid) {
        document.querySelector('#description-error').textContent = "Description cannot be empty or have leading/trailing spaces.";
    } else if (isDescriptionCorrect){
        document.querySelector('#description-error').textContent = "You repeated a word in the description";
    }
    else {
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

    const allValid = isDescriptionValid && isAmountValid && isCategoryValid && isDateValid;

    if (allValid) {
        console.log("All fields valid, ready to save!");
    }
});

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");

navLinks.forEach(function(link){
    link.addEventListener("click", function(event){
        event.preventDefault();

        const targetId = link.dataset.section;

        sections.forEach(function(section){
            section.classList.remove("active");
        });

        document.querySelector("#" + targetId).classList.add("active");
    });

});
