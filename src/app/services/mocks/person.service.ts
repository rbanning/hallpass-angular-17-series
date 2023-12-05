import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppEnvironmentService } from '@app/services/app-environment.service';
import { WorkingService } from '@app/services/working.service';
import { IPerson, Person } from '@app/models';
import { MockAbstractService } from "./mock-abstract.service";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends MockAbstractService<IPerson> {

  constructor(
    workingService: WorkingService,
    envService: AppEnvironmentService,
    http: HttpClient
  ) {
    super("person", workingService, envService, Person, http);
  }
}
