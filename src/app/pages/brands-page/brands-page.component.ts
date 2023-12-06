import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '@app/models';
import { BrandService } from '@app/services';
import { CommonModule } from '@angular/common';
import { BrandBriefComponent } from '@app/components';

@Component({
  selector: 'app-brands-page',
  standalone: true,
  imports: [CommonModule, BrandBriefComponent],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.scss'
})
export class BrandsPageComponent {
  brands$: Observable<IBrand[]>;

  constructor(
    protected service: BrandService
  ) {
    this.brands$ = service.load();
  }


  toggleArchived(item: IBrand) {    
    item.archived = !item.archived;
    this.service.update(item);
  }

  addRandom() {
    this.service.addRandom();
  }
}
