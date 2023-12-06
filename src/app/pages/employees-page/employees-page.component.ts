import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonBriefComponent } from '@app/components';
import { IPerson } from '@app/models';
import { PersonService } from '@app/services';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [CommonModule, PersonBriefComponent],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss'
})
export class EmployeesPageComponent {
  employees$: Observable<IPerson[]>;

  constructor(
    protected service: PersonService
  ) {
    this.employees$ = service.load();
  }


  toggleArchived(item: IPerson) {    
    item.archived = !item.archived;
    this.service.update(item);
  }

  addRandom() {
    this.service.addRandom();
  }
}
