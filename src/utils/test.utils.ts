export const compareStringContent = (s1: string, s2: string): boolean => {
    return removeWhiteSpaces(s1) === removeWhiteSpaces(s2);
};

export const removeWhiteSpaces = (text: string): string => {
    return text &&
        text.replace(/\r?\n([\t ]*)$/, '') // trailing whitespace
            .replace(new RegExp(`\n[\t ]`, 'g'), '') // indentation
            .replace(/^\r?\n/, '') // leading whitespace
            .replace(/  +/g, ''); // any left whitespace;
};
