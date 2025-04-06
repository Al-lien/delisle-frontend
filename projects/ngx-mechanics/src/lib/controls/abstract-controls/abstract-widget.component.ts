import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Map } from 'ol';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  template: '',
})
export abstract class AbstractWidgetComponent {
  @Input() public map!: Map;
  @Input() public id!: string;

  @HostBinding('style.position') public position = 'absolute';
  @HostBinding('style.z-index') public zIndex = '9999';

  constructor(
    protected _cdr: ChangeDetectorRef,
    protected _sharedDataService: SharedDataService
  ) {}
}
