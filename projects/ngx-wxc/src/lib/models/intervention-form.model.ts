import { FormControl, FormGroup } from '@angular/forms';
import { ITimelapse } from './intervention.model';
import { TechnicianType } from './user.model';

export enum FormEnum {
  TECHNICIAN = 'technician',
  TIMELAPSE = 'timelapse',
  OPERATION = 'operation',
  IS_SELECTED = 'isSelected',
  OPERATIONS = 'operations',
  COMMENT = 'comment',
  STARTS_AT = 'startsAt',
  ENDS_AT = 'endsAt',
}

export interface TInterventionForm {
  technician: FormControl<string | null>;
  timelapse: FormGroup<{
    startsAt: FormControl<Date | null>;
    endsAt: FormControl<Date | null>;
  }>;
  operations: FormGroup<{}>;
  comment: FormControl<string | null>;
}

export interface IInterventionForm {
  technician: TechnicianType;
  timelapse: ITimelapse;
  operations: Operations;
  comment: string;
}

export type Operations = Record<string, boolean>;
