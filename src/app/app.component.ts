import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PersonService } from '@app/services';
import { FooterComponent, HeaderComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    protected service: PersonService
  ) {
    service.load()
      .subscribe({
        next: (results => console.log("DEBUG: next", results)),
        error: (err => console.log("DEBUG error", err)),
        complete: (() => console.log("DEBUG complete"))
      });
  }
}
