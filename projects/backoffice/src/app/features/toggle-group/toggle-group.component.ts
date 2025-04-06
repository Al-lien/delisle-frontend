import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toggle-group',
  templateUrl: './toggle-group.component.html',
  styleUrl: './toggle-group.component.scss',
})
// EXPORT
export class ToggleGroupComponent {
  @Input() public group!: FormGroup;
  @Input() public displayFormControlName!: (control: string) => string;

  public controls!: string[];

  ngOnInit(): void {
    if (!this.group) {
      this.group = this.group || new FormGroup({});
    }
  }

  public getFormControlsArray(formGroup: FormGroup): FormControl[] {
    return Object.values(formGroup.controls) as FormControl[];
  }

  public displayControlValue(control: any): unknown {
    if (control.value) {
      return '';
    }
    return this.group ? this.group.controls[control] : this.group;
  }

  public getControlNameFromFormControl(control: FormControl): string {
    for (const name in this.group.controls) {
      if (this.group.controls[name] === control) {
        return this.displayFormControlName(name);
      }
    }
    return '';
  }
}
