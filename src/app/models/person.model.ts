import { BaseModel, IBaseModel } from "./base.model";

export interface IPerson extends IBaseModel {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export class Person extends BaseModel implements IPerson {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  avatar: string = "";

  constructor(obj?: any) {
    super(obj);

    if (obj) {
      this.firstName = obj.firstName ?? this.firstName;
      this.lastName = obj.lastName ?? this.lastName;
      this.email = obj.email ?? this.email;
      this.avatar = obj.avatar ?? this.avatar;
    }
  }
}