export const required = (value : string) => {
    if (value) return undefined;

    return "Field is required.";
}

export const numbersSpecialSymbolsLetters = (value : string) => {
    let regexp = /^([a-zA-Z][a-zA-z@.\-_+0-9]*)$/;
    if (regexp.test(value)) return undefined;
    return "Only letters, numbers, and symbols @/./+/-/_.";

}

export const maxLength = (length : number) => (value : string) => {
    if (value && value.length > length) return `Max length is ${length} symbols`;
    return undefined
}