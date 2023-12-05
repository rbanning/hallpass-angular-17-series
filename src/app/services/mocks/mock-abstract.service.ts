import { BehaviorSubject, Observable, catchError, finalize, map, switchMap, tap, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NewableModel } from "@app/common";
import { AppEnvironmentService } from "@app/services/app-environment.service";
import { UsesWorkingAbstractService } from "@app/services/uses-working-abstract.service";
import { WorkingService } from "@app/services/working.service";
import { IBaseModel } from "@app/models";


export class MockAbstractService<T extends IBaseModel> extends UsesWorkingAbstractService {
  protected readonly BASE_URL: string;
  protected readonly API_KEY: string;
  protected readonly API_KEY_HEADER: string;
  protected readonly API_SEED: string;
  protected readonly API_SEED_HEADER: string;
  protected readonly targetClass: NewableModel<T>;

  protected readonly store = new BehaviorSubject<T[]>([]);

  constructor(
    key: string,
    workingService: WorkingService,
    envService: AppEnvironmentService,
    targetClass: NewableModel<T>,
    protected http: HttpClient
  ) {
    super(key, workingService);

    this.BASE_URL = `${envService.get('api_base_url')}/${key}`;
    this.API_KEY = `${envService.get('api_key')}`;  
    this.API_KEY_HEADER = `${envService.get('api_key_header')}`;  
    this.API_SEED = `${envService.get('api_seed')}`;
    this.API_SEED_HEADER = `${envService.get('api_seed_header')}`;
    this.targetClass = targetClass;
  }


  load(): Observable<T[]> {
    const url = this.BASE_URL;
    this.setWorking(true);

    return this.http.get(url, { headers: this.buildRequestHeaders() })
      .pipe(
        map((results) => {
          if (Array.isArray(results)) {
            return results.map(m => this.parseObjectToTarget(m));
          }
          //else
          console.warn("Mock fetchAll() return invalid result", {key: this.workingKey, url, results});
          return []; 
        }),
        switchMap((results) => {
          this.store.next(results);
          return this.store.asObservable();
        }),
        catchError((reason) => {
          console.warn("ERROR in Mock fetchAll", {key: this.workingKey, url, reason});
          return throwError(() => `There was a problem fetching ${this.workingKey}`);
        }),
        finalize(() => this.setWorking(false))
      )
  }

  update(item: T) {
    const current = this.peek();
    const index = current.findIndex(m => m.id === item.id);
    const ok = index >= 0;  //found
    if (ok) {
      current[index] = item;
      this.store.next([...current]);
    }

    return ok;
  }

  add(item: T) {
    const current = this.peek();
    const index = current.findIndex(m => m.id === item.id);
    const ok = index < 0; //not found
    if (ok) {
      this.store.next([...current, item]);
    }

    return ok;
  }

  remove(item: string | T) {
    const current = this.peek();
    const id = typeof(item) === 'string' ? item : item.id;    
    this.store.next(current.filter(m => m.id !== id));

    return this.peek().length < current.length;
  }

  protected peek(): T[] {
    return this.store.value;
  }

  protected parseObjectToTarget(obj: any): T {
    return new this.targetClass(obj);
  }

  protected buildRequestHeaders() {
    const headers = new HttpHeaders();
    return headers
      .set(this.API_KEY_HEADER, this.API_KEY)
      .set(this.API_SEED_HEADER, this.API_SEED);
  }
}