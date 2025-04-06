import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AbstractButtonControlComponent } from './abstract-controls';

@Component({
  selector: 'widget-button-control',
  template: `
    <button
      mat-fab
      class="widget_button"
      (click)="onClick()"
      [ariaLabel]="ariaLabel"
      [matTooltip]="ariaLabel"
      [color]="getButtonColor()"
      matTooltipPosition="right"
    >
      <ng-content></ng-content>
    </button>
  `,
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonControlComponent
  extends AbstractButtonControlComponent
  implements AfterContentInit
{
  @Input() public activatedColor: ThemePalette;
  @Input() public deactivatedColor: ThemePalette;
  @Input() public ariaLabel!: string;

  public onClick(): void {
    // if my button is the active one
    if (this.isActive()) {
      return this.onDeactivate();
    }
    return this.onActivate();
  }

  public isActive(): boolean {
    return this._sharedDataService.isActiveWidget(this.id);
  }

  public getButtonColor(): Exclude<ThemePalette, 'warn' | undefined> {
    if (this.isActive()) {
      return 'accent';
    }
    return 'primary';
  }
}
