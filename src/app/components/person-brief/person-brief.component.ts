import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Nullable } from '@app/common';
import { IPerson } from '@app/models';

@Component({
  selector: 'app-person-brief',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-brief.component.html',
  styleUrl: './person-brief.component.scss'
})
export class PersonBriefComponent {
  @Input()
  person: Nullable<IPerson>;
}
