import { Email } from "./email.vo";
import { Password } from "./password.vo";

type UserProps = {
  id: string;
  name: string;
  email: Email;
  password: Password;
}

type UserPropsCreate = {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  private _name: string;
  private _email: Email;
  private _password: Password;

  private constructor(props: UserProps) {
    this._id = props.id;
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    // TODO: Criar o validade
  };

  public static create(props: UserPropsCreate): User {
    const email = Email.create(props.email);
    const hashedPassword = Password.create(props.password);
    return new User({
      id: '123',
      name: props.name,
      email: email,
      password: hashedPassword
    })
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get password(): Password {
    return this._password;
  }

  get email(): Email {
    return this._email;
  }
}