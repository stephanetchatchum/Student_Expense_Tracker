export const descriptionPattern = /^\S(?:.*\S)?$/;
export const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;        
export const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const categoryPattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
export const duplicateWordPattern = /\b(\w+)\s+\1\b/i;