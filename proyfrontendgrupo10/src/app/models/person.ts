export class Person {
  _id!: string;
  firstName!: string;
  lastName!: string;
  legajo!: string;
  dni!: number;
  email!: string;
  password!: string;
  infoArea!: [
    {
      area: string;
      roles: string[];
    }
  ];
}
