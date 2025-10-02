export const dataValidator = () => {
  const nameValidator = (username: string) => {
    const nameRegex = /^[A-Za-z]{3,}$/;
    return nameRegex.test(username);
  };

  const emailValidator = (userEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userEmail);
  };

  const passwordValidator = (password: string) => {
    const emailRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return emailRegex.test(password);
  };

  return { emailValidator, passwordValidator, nameValidator };
};
