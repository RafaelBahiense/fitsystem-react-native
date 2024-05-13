import { Gender } from "./Gender";

type ClientParams = {
  id?: number;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  address: string;
  user: string;
  created_at?: Date;
};

export class Client {
  readonly id?: number;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  address: string;
  readonly user?: string;
  readonly created_at?: Date;

  constructor(params: ClientParams) {
    if (params.id) this.id = params.id;
    if (params.created_at) this.created_at = params.created_at;
    if (params.user) this.user = params.user;

    this.name = params.name;
    this.age = params.age;
    this.gender = params.gender;
    this.phone = params.phone;
    this.address = params.address;
    this.user = params.user;
  }
}
