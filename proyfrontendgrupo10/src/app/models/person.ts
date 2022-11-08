import { Area } from './area';

export class Person {
  _id!: string;
  firstName!: string;
  lastName!: string;
  legajo!: string;
  dni!: number;
  email!: string;
  password!: string;
  infoAreas!: [
    {
      area: Area;
      userRoles: string[];
      status: string;
    }
  ];
  role!: number
}
