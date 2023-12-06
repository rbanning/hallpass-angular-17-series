import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { Nullable } from '@app/common';
import { IBrand } from '@app/models';

@Component({
  selector: 'app-brand-brief',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-brief.component.html',
  styleUrl: './brand-brief.component.scss'
})
export class BrandBriefComponent {
  @Input()
  brand: Nullable<IBrand>;

  @HostBinding('class.archived') 
  get cssArchived() {
    return this.brand?.archived === true;
  }

}
