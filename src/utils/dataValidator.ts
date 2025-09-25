export const dataValidator = () => {
  const emailValidator = (userEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userEmail);
  };

  const passwordValidator = (password: string) => {
    const emailRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return emailRegex.test(password);
  };

  return { emailValidator, passwordValidator };
};
