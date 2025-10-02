class User {
  id: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userPassword: string;
  role: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    userEmail: string,
    userPassword: string,
    role: string
  ) {
    this.id = id
    this.firstName = firstName;
    this.lastName = lastName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.role = role
  }
}

export default User;
