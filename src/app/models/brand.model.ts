import { BaseModel, IBaseModel } from "./base.model";

export interface IBrand extends IBaseModel {
  name: string;
  industry: string;
  color: string;
}

export class Brand extends BaseModel implements IBrand {
  name: string = "";
  industry: string = "";
  color: string = "";

  constructor(obj?: any) {
    super(obj);

    if (obj) {
      this.name = obj.name ?? this.name;
      this.industry = obj.industry ?? this.industry;
      this.color = obj.color ?? this.color;
    }
  }
}