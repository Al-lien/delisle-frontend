import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  constructor(private readonly _location: Location) {}

  public goBack(): void {
    this._location.historyGo(-2);
  }
}
