import { WorkingService } from "./working.service";

export abstract class UsesWorkingAbstractService {
  protected readonly workingKey: string;

  constructor(
    workingKey: string, 
    protected workingService: WorkingService
  ) {
    this.workingKey = workingKey;
  }

  isWorking(): boolean { return this.workingService.isWorking(this.workingKey); }
  setWorking(state: boolean) {
    this.workingService.toggle(this.workingKey, state);
  }
}