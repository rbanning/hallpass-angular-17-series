import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { PersonBriefComponent } from '@app/components';
import { IPerson } from '@app/models';
import { PersonService } from '@app/services';

@Component({
  selector: 'app-track-by-page',
  standalone: true,
  imports: [CommonModule, PersonBriefComponent],
  templateUrl: './track-by-page.component.html',
  styleUrl: './track-by-page.component.scss'
})
export class TrackByPageComponent {

  employees$: Observable<IPerson[]>;

  constructor(
    service: PersonService
  ) {
    this.employees$ = service.load();
  }
}
