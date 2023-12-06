import { tap } from 'rxjs';
import { map } from 'rxjs';
import { Component } from '@angular/core';
import { IBrand } from '@app/models';
import { BrandService } from '@app/services';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colors-page.component.html',
  styleUrl: './colors-page.component.scss'
})
export class ColorsPageComponent {
  colors$: Observable<string[]>;

  constructor(
    protected service: BrandService
  ) {
    this.colors$ = service.load()
      .pipe(
        map((brands) => brands.map(m => m.color)),
        tap(colors => console.log("DEBUG: colors", colors)),
      );
  }

  addRandom() {
    this.service.addRandom();
  }
}
