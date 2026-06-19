const form = document.querySelector("#transaction-form");

let currentSearchRegex = null;
const descriptionPattern = /^\S(?:.*\S)?$/;
const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;        
const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const categoryPattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
const duplicateWordPattern = /\b(\w+)\s+\1\b/i;


let transactions = [];

let editingID = null;

function renderTransactions(list){
        const tbody = document.querySelector("#records-tbody");

        if (list.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No transactions yet. Add one to get started!</td></tr>';
            return;
        }

        tbody.innerHTML = "";

        list.forEach(function(transaction) {
            const row = document.createElement("tr");
            const highlightedDescription = currentSearchRegex 
                ? transaction.description.replace(currentSearchRegex, match => `<mark>${match}</mark>`)
                : transaction.description;


            row.innerHTML = `<td>${highlightedDescription}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>${transaction.category}</td>
                <td>${transaction.date}</td>
                <td>
                    <button class="btn btn-secondary edit-btn" data-id="${transaction.id}">Edit</button>
                    <button class="btn btn-secondary delete-btn" data-id="${transaction.id}">Delete</button>
                </td>
            `;

            tbody.appendChild(row);
        });
}

function saveTransaction() {
    localStorage.setItem("transaction", JSON.stringify(transactions));
}

function updatedDashboard() {
    const total = transactions.reduce(function(sum, transaction) {
        return sum + transaction.amount;
    }, 0);

    document.querySelector("#stat-total").textContent = total.toFixed(2) + " RWF";
    document.querySelector("#stat-count").textContent = transactions.length;

    const categoryCounts = {};

    transactions.forEach(function(transaction) {
        if (categoryCounts[transaction.category]) {
            categoryCounts[transaction.category]++;
        } else {
            categoryCounts[transaction.category] = 1;
        }
    });

    let topCategory = "-";
    let maxCount = 0;

    for (const category in categoryCounts) {
        if (categoryCounts[category] > maxCount) {
            maxCount = categoryCounts[category];
            topCategory = category;
        }
    }

    document.querySelector("#stat-top-category").textContent = topCategory;


    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        const budgetCap = parseFloat(settings.budgetCap);

        if (budgetCap > 0) {
            const percentage = Math.min((total / budgetCap) * 100, 100);
            const remaining = budgetCap - total;
            const budgetStatus = document.querySelector("#budget-status");
            const budgetProgress = document.querySelector("#budget-progress");

            budgetProgress.style.width = percentage + "%";

            if (total > budgetCap) {
                budgetProgress.style.background = "var(--danger)";
                budgetStatus.setAttribute("aria-live", "assertive");
                budgetStatus.textContent = "Over budget by " + Math.abs(remaining).toFixed(2) + " RWF!";
            } else {
                budgetProgress.style.background = "var(--primary)";
                budgetStatus.setAttribute("aria-live", "polite");
                budgetStatus.textContent = remaining.toFixed(2) + " RWF remaining of " + budgetCap.toFixed(2) + " RWF budget";
            }
        }
    }
}

const tbody = document.querySelector("#records-tbody");

tbody.addEventListener("click", function(event){
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;
        console.log("Delelte cliked for id:", id)

        const confirmed = confirm("Are you sure you want to delete this transaction?");
        if (confirmed) {
            transactions = transactions.filter(function(transaction){
                return transaction.id !== id;
            });

            saveTransaction();
            updatedDashboard();

            renderTransactions(transactions);
        }
    } else if (event.target.classList.contains("edit-btn")){
        const id = event.target.dataset.id;

        const transaction = transactions.find(function(t){
            return t.id === id;
        });

        document.querySelector("#description").value = transaction.description;
        document.querySelector("#amount").value = transaction.amount;
        document.querySelector("#category").value = transaction.category;
        document.querySelector("#date").value = transaction.date;
        
        editingID = id;

        sections.forEach(function(section){
            section.classList.remove("active");
        });
        document.querySelector("#add").classList.add("active");
    }
});

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

    if (editingID === null){
        if (allValid) {
            const newTransaction = {
                id: "txn_" + Date.now(),
                description: description,
                amount: parseFloat(amount),
                category: category,
                date: date,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            transactions.push(newTransaction);

            saveTransaction();
            updatedDashboard();

            renderTransactions(transactions);
            console.log("Saved successfully");

            form.reset();
            document.querySelector("#form-status").textContent = "Transaction saved Successfully";
        }
    } else if (editingID != null){
        if(allValid){
            const existingTransaction = transactions.find(function(t) {
                return t.id === editingID;
            });

            existingTransaction.description = description;
            existingTransaction.amount = parseFloat(amount);
            existingTransaction.category = category;
            existingTransaction.date = date;
            existingTransaction.updatedAt = new Date().toISOString();

            saveTransaction();
            updatedDashboard();

            renderTransactions(transactions);
            console.log("Saved successfully");

            form.reset();
            document.querySelector("#form-status").textContent = "Transaction Edited Successfully";
            editingID = null;
        }
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

const exportBtn = document.querySelector("#export-btn");

exportBtn.addEventListener("click", function() {
    const dataStr = JSON.stringify(transactions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.json";
    link.click();

    URL.revokeObjectURL(url);
});

const importInput = document.querySelector("#import-file");

importInput.addEventListener("change", function() {
    const file = importInput.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        try {
            const importedData = JSON.parse(reader.result);

            if (Array.isArray(importedData)) {
                transactions = importedData;
                saveTransaction();
                renderTransactions(transactions);
                console.log("Import successful!");
            } else {
                alert("Invalid file format: expected an array of transactions.");
            }
        } catch (error) {
            alert("Could not read file: invalid JSON.");
        }
    };

    reader.readAsText(file);
});

const sortSelect = document.querySelector("#sort-select");

sortSelect.addEventListener("change", function(){
    const sortBy = sortSelect.value;
    let sorted = [...transactions];

    if (sortBy === "date-asc") {
        sorted.sort(function(a,b){
            return a.date.localeCompare(b.date);
        });
    } else if (sortBy === "description-asc"){
        sorted.sort(function(a,b){
            return a.description.localeCompare(b.description);
        });
    } else if (sortBy === "amount-asc"){
        sorted.sort(function(a, b) {
            return a.amount - b.amount;
        });
    }

    renderTransactions(sorted);
});

const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", function(){
    const query = searchInput.value;

    let regex;
    try {
        regex = query ? new RegExp(query, "i") : null;
    } catch (error) {
        regex = null;
    }

    currentSearchRegex = regex;
    let filtered = transactions;

    if (regex) {
        filtered = transactions.filter(function(transaction){
            return regex.test(transaction.description);
        });
    }

    renderTransactions(filtered);

    document.querySelector("#search-status").textContent = filtered.length + " result(s) found";
});

function loadSettings() {
    const stared = localStorage.getItem("settings");
    if (stared) {
        const settings = JSON.parse(stared);
        document.querySelector("#rate-usd").value = settings.rateUsd;
        document.querySelector("#rate-xaf").value = settings.rateXaf;
        document.querySelector("#budget-cap").value = settings.budgetCap;
    }
}

loadSettings();

function loadTransactions(){
    const stored = localStorage.getItem("transaction");
    if (stored){
        transactions = JSON.parse(stored);
    }
}

loadTransactions();
renderTransactions(transactions);

updatedDashboard();

const saveSettingsBtn = document.querySelector("#save-settings-btn");

saveSettingsBtn.addEventListener("click", function(){
    const settings = {
        rateUsd: document.querySelector("#rate-usd").value,
        rateXaf: document.querySelector("#rate-xaf").value,
        budgetCap: document.querySelector("#budget-cap").value
    };

    localStorage.setItem("settings", JSON.stringify(settings));
    updatedDashboard();
    alert("Settings saved!");
});
