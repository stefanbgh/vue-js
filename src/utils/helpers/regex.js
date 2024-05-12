const usernameRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fullnameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const onlyNumbers = /^\d+$/;

export { usernameRegex, emailRegex, fullnameRegex, onlyNumbers };
