import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AbstractButtonComponent } from '../abstract-button.component';

@Component({
  selector: 'ngx-wxc-button-cancel',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-cancel.component.html',
  styles: '.ngx-wxc-button-cancel{ width: 100%; margin-block: 2rem;}',
})
export class NgxWxcButtonCancelComponent extends AbstractButtonComponent {
  public onCancel(): void {
    this.btnClick.emit();
  }
}
