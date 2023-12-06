import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppEnvironmentService } from '@app/services/app-environment.service';
import { WorkingService } from '@app/services/working.service';
import { IBrand, Brand } from '@app/models';
import { MockAbstractService } from "./mock-abstract.service";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends MockAbstractService<IBrand> {

  constructor(
    workingService: WorkingService,
    envService: AppEnvironmentService,
    http: HttpClient
  ) {
    super("brand", workingService, envService, Brand, http);
  }
}
