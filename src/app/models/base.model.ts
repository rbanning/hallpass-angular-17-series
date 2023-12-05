import { Nullable, parsers } from "@app/common";

export interface IBaseModel {
  id: string;
  archived: Nullable<boolean>;
}

export class BaseModel implements IBaseModel {
  id: string = "";
  archived: Nullable<boolean>;

  constructor(obj?: any) {
    if (obj) {
      this.id = parsers.toString(obj.id, null) ?? this.id;
      this.archived = parsers.toBoolean(obj.archived, null);
    }
  }
}