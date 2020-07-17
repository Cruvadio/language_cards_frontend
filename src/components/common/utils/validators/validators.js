export const required = value => {
    if (value) return undefined;

    return "Field is required.";
}

export const numbersSpecialSymbolsLetters = value => {
    let regexp = /^([a-zA-Z][a-zA-z@.\-_+0-9]*)$/;
    if (regexp.test(value)) return undefined;
    return "Only letters, numbers, and symbols @/./+/-/_.";

}

export const maxLength = length => value => {
    if (value && value.length > length) return `Max length is ${length} symbols`;
    return undefined
}