import { IncidentTypeEnum, TIncidentType } from '../enums';
import { IInterventionForm, IInterventionSanitized } from '../models';

export class InterventionFormTransformer {
  constructor() {
    throw new Error('Cannot initialize intervention form transformer');
  }

  public static transformToSanitizedForm(
    interventionForm: IInterventionForm
  ): IInterventionSanitized {
    /**
     * Create the sanitized array of incident as expected from the backend.
     *
     * @description => The type guard {@code ```key is TIncidentType```} ensures that key is actually one of the valid keys from @see IncidentTypeEnum
     * @description => The {@code ```key in IncidentTypeEnum```} check verifies that key is a valid enum key before filtering and mapping.
     *
     * @param operations : object of @see IncidentTypeEnum keys where the values is a boolean.
     * @returns an array of enum if value is true.
     */
    function getIncidentTypes(
      operations: Record<string, boolean>
    ): TIncidentType[] {
      return Object.keys(operations)
        .filter(
          (key): key is TIncidentType =>
            key in IncidentTypeEnum && operations[key]
        )
        .map((key) => key);
    }

    return {
      technicianId: interventionForm.technician.id.toString(),
      problems: getIncidentTypes(interventionForm.operations),
      startsAt: interventionForm.timelapse.startsAt.toISOString().split('T')[0],
      endsAt: interventionForm.timelapse.endsAt.toISOString().split('T')[0],
      comment: [interventionForm.comment],
    };
  }
}
