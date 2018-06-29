export const isSet = (val) => {
	if(val == undefined) return false;
	if( val.split(' ').join('') == '') return false;
	return true;
}

export const someFieldsAreEmpty = (values) => {
	for(k of Object.keys(values)) { if(!isSet(values[k])) return true };
	return false;
}

export const stringLengthBetween = (val, min, max) => {
	return (min <= val.length && max >= val.length);
}

export const areEqual = (val1, val2) => {
	return (val1 === val2);
}

export const isEmail = (val) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(val).toLowerCase());
}

export const isNumber = (val) => {
	return (Number(parseFloat(val)) === val);
}

export const isPositiveInt = (val) => {
	var n = Math.floor(Number(val));
    return (n !== Infinity && String(n) === val && n >= 0);
}

export const errors = {
	fieldsEmpty: 'Please fill in all the fields.',
	invalidEmail: 'Please provide a valid email address.',
	firstNameLength: 'The first name value must be between 1 and 100 characters.',
	lastNameLength: 'The last name value must be between 1 and 100 characters.',
	passLength: 'Passwords must be between 6 and 100 characters.',
	passMismatch: 'Please ensure your passwords match.',
	invalidTableNumber: 'Please enter a valid table number.'
}