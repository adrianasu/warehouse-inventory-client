export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';
export const isEqual = (value, allValues) => allValues.password === value ? undefined: `Passwords don't match.`;
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};
export const noSpecialChars = value =>
  /\W/.test(value) ? `Can't contain special characters.`: undefined;

export const isText = value => (typeof value !== "string") ? "letters" : undefined;

export const isNumber = value => (typeof value !== "number") ? 'Must be a number' : undefined;

export const checkType = (value, type) => type === 'text' ? isText(value) : isNumber(value)

// Uses a regular expression (regex) to check whether it looks enough like an
// email address.  Broken down:
// ^ Matches the start the text
// \S+ Matches one or more non-whitespace characters before the @
// @ A literal at sign
// \S+ Matches one or more non-whitespace characters after the @
// $ Matches the end of the text
export const email = value =>
    /^\S+@\S+$/.test(value) ? undefined : 'Must be a valid email address';

