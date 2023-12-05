import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PersonService } from '@app/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    protected service: PersonService
  ) {
    service.fetchAll()
      .subscribe({
        next: (results => console.log("DEBUG: next", results)),
        error: (err => console.log("DEBUG error", err)),
        complete: (() => console.log("DEBUG complete"))
      });
  }
}
