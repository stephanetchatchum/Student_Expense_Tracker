export let transactions = [];
export let editingID = null;
export let currentSearchRegex = null;

export function setTransactions(newTransactions) {
    transactions = newTransactions;
}

export function setEditingID(id) {
    editingID = id;
}

export function setCurrentSearchRegex(regex) {
    currentSearchRegex = regex;
}