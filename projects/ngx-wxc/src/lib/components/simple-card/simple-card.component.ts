import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardAppearance, MatCardModule } from '@angular/material/card';

export const CardImageEnum = {
  sm: 'mat-mdc-card-sm-image',
  md: 'mat-mdc-card-md-image',
  lg: 'mat-mdc-card-lg-image',
  xl: 'mat-mdc-card-xl-image',
};

export type CardImage = keyof typeof CardImageEnum;

@Component({
  selector: 'ngx-wxc-simple-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './simple-card.component.html',
  styleUrl: './simple-card.component.scss',
})
export class NgxWxsSimpleCardComponent {
  @Input() public appearance: MatCardAppearance = 'outlined';
  @Input() public base64: boolean = false;
  @Input() public content!: string;
  @Input() public img!: string;
  @Input() public size: CardImage = 'md';
  @Input() public subtitle!: string;
  @Input() public title!: string;

  public getImage(): string {
    if (this.base64) {
      return `data:image/png;base64, ${this.img}`;
    }
    return this.img;
  }

  public getImageSize(): string {
    return CardImageEnum[this.size];
  }
}
