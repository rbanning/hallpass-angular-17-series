export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export class Person implements IPerson {
  id: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  avatar: string = "";

  constructor(obj?: any) {
    if (obj) {
      this.id = obj.id ?? this.id;
      this.firstName = obj.firstName ?? this.firstName;
      this.lastName = obj.lastName ?? this.lastName;
      this.email = obj.email ?? this.email;
      this.avatar = obj.avatar ?? this.avatar;
    }
  }
}