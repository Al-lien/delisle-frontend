import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AbstractButtonComponent } from '../abstract-button.component';

@Component({
  selector: 'ngx-wxc-button-submit',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-submit.component.html',
  styles: '.ngx-wxc-button-submit{ width: 100%; margin-block: 2rem;}',
})
export class NgxWxcButtonSubmitComponent extends AbstractButtonComponent {
  public onSubmit(): void {
    this.btnClick.emit();
  }
}
