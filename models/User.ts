export default class User {
  name: string;
  code: number;

  constructor(name: string, code: number) {
    this.name = name;
    this.code = code;
  }
  static allUsers: User[] = [];

  static valideExists(code: number) {
    let userExists = User.allUsers.find((user) => user.code === code);

    if (userExists !== undefined) {
      return false;
    }
    return true;
  }

  static save(user: User) {
    User.allUsers.push(user);
  }
}
