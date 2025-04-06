import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNil } from 'lodash-es';
import { Map } from 'ol';
import { IInteraction } from '../models';
import { InteractionService, SharedDataService } from '../services';
import { IDrawInteractionOptions } from './draw';
import { ISelectInteractionOption } from './select';

@Component({
  template: '',
})
export abstract class AbstractInteractionComponent<InteractionEvent>
  implements OnInit
{
  @Input() public id!: string;
  @Input() public interaction!: IInteraction | null;
  @Input() public olMap!: Map;

  @Output() public interactionActivate: EventEmitter<void>;
  @Output() public interactionDeactivate: EventEmitter<void>;
  @Output() public interactionEnd: EventEmitter<InteractionEvent>;
  @Output() public interactionStart: EventEmitter<InteractionEvent>;

  constructor(
    protected _interactionService: InteractionService,
    protected _sharedDataService: SharedDataService
  ) {
    this.interactionActivate = new EventEmitter<void>();
    this.interactionDeactivate = new EventEmitter<void>();
    this.interactionEnd = new EventEmitter<InteractionEvent>();
    this.interactionStart = new EventEmitter<InteractionEvent>();

    this._sharedDataService.subjects.subscribe((subject) => {
      if (
        subject.activated &&
        !isNil(this.interaction) &&
        subject.id === this.id
      ) {
        this.interactionActivate.emit();
      } else if (!subject.activated && !isNil(this.interaction)) {
        this.interactionDeactivate.emit();
      }
    });
  }

  ngOnInit(): void {
    this.interaction = this._interactionService.provide(
      this.getInteractionOptions_()
    );
  }

  protected abstract getInteractionOptions_():
    | IDrawInteractionOptions
    | ISelectInteractionOption;
}
