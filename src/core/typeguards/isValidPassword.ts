const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%.,_*?&-]{8,}$/;

export const isValidPassword = (value: string) => PASSWORD_REGEX.test(value);

export default isValidPassword;
