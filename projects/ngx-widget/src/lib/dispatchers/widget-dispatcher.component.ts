import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { IWidget, IWidgetDispatcher } from '../models';
import {
  NgxWidgetAreaMeasure,
  NgxWidgetBoxSelection,
  NgxWidgetClickSelection,
  NgxWidgetInfoTooltip,
  NgxWidgetLengthMeasure,
  NgxWidgetMousePosition,
} from '../widgets';

@Component({
  selector: 'app-widget-dispatcher',
  template: `
    <ng-content>
      <ng-container #dynamicWidgetHost></ng-container>
    </ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class NgxWidgetDispatcher implements IWidgetDispatcher, OnInit {
  @ViewChild('dynamicWidgetHost', { read: ViewContainerRef, static: true })
  public dynamicWidgetHostVCR!: ViewContainerRef;

  @HostBinding('style.position') public position = 'absolute';
  @HostBinding('style.width.%') public width = '100';
  @HostBinding('style.height.%') public height = '100';

  @Input() public map!: Map;
  @Input() public newLayer!: VectorLayer;

  public readonly WIDGETS_GROUP: IWidget[] = [
    {
      id: '4ce7d410-6ca0-4eca-8beb-c2035339b724',
      name: 'MOUSE_POSITION',
      type: 'SERVICE',
      component: NgxWidgetMousePosition,
      options: {
        position: {
          top: '',
          right: '5px',
          bottom: '5px',
          left: '',
        },
      },
    },
    {
      id: '8a4c0827-5902-4ad8-98fe-0dfb9cd4a3fa',
      name: 'INFO_TOOLTIP',
      type: 'SERVICE',
      component: NgxWidgetInfoTooltip,
    },
    {
      id: 'da7f0025-64a5-4f4f-bcc4-a274c5c453ad',
      name: 'CLICK_SELECTION',
      type: 'BUTTON_CONTROL',
      component: NgxWidgetClickSelection,
      options: {
        position: {
          top: '',
          right: '',
          bottom: '65%',
          left: '5px',
        },
      },
    },
    {
      id: 'c0bb7c80-7e75-4691-b40c-0a7b8a25a611',
      name: 'BOX_SELECTION',
      type: 'BUTTON_CONTROL',
      component: NgxWidgetBoxSelection,
      options: {
        position: {
          top: '',
          right: '',
          bottom: '75%',
          left: '5px',
        },
      },
    },
    {
      id: '5967c299-266b-4b5b-8bbb-343c5d2deb73',
      name: 'AREA_MEASURE',
      type: 'BUTTON_CONTROL',
      component: NgxWidgetAreaMeasure,
      options: {
        position: {
          top: '',
          right: '',
          bottom: '55%',
          left: '5px',
        },
      },
    },
    {
      id: '33c01319-cad3-4203-9a80-92137881db6c',
      name: 'LENGTH_MEASURE',
      type: 'BUTTON_CONTROL',
      component: NgxWidgetLengthMeasure,
      options: {
        position: {
          top: '',
          right: '',
          bottom: '45%',
          left: '5px',
        },
      },
    },
  ];

  ngOnInit(): void {
    this.dynamicWidgetHostVCR.clear();
    this.loadWidgets();
  }

  public loadWidgets(): void {
    this.WIDGETS_GROUP.forEach((wgt: IWidget) => {
      const provider = this.dynamicWidgetHostVCR.createComponent(wgt.component);
      const providerComponent = provider.instance;
      providerComponent.map = this.map;
      providerComponent.id = wgt.id;
    });
  }
}
