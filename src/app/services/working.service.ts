import { Injectable } from "@angular/core";
import { Nullable } from "../common";

@Injectable({
  providedIn: 'root'
})
export class WorkingService {
  private readonly keyList: string[] = [];

  isWorking(): boolean;
  isWorking(key: string): boolean;
  isWorking(key?: string): boolean {
    if (typeof(key) === 'string') {
      return this.keyList.includes(key);
    }
    //else
    return this.keyList.length > 0;
  }

  turnOn(key: string) {
    //only proceed if the key is not already on
    if (!this.isWorking(key)) { 
      this.keyList.push(key);
    }
  }

  turnOff(key: string) {
    const index = this.keyList.indexOf(key);
    if (index >= 0) {
      this.keyList.splice(index, 1);
    }
  }

  toggle(key: string, state: Nullable<boolean> = null) {
    if (typeof(state) === 'boolean') {
      this._set(key, state);
    } else {
      this._set(key, !this.isWorking(key));
    }
  }

  protected _set(key: string, state: boolean) {
    state ? this.turnOn(key) : this.turnOff(key);
  }
}
