export interface IInterventionTimespan {
  daysPassed: number;
  daysLeft: number;
  remainingTimePercentage: number;
}

export class Utils {
  public static getRemainingTimePercentage(
    startsDate: Date,
    endDate: Date
  ): IInterventionTimespan {
    let daysPassed = this._roundedTime(
      new Date().getTime() - startsDate.getTime()
    );
    const daysLeft = this._roundedTime(
      endDate.getTime() - new Date().getTime()
    );

    daysPassed = daysPassed < 0 ? 0 : daysPassed;

    const remainingTimePercentage =
      (Number(daysPassed) * 100) / (daysPassed + daysLeft);

    return {
      daysPassed,
      daysLeft,
      remainingTimePercentage,
    };
  }

  private static _roundedTime(value: number): number {
    return Number(
      Math.round(value / (1000 * 3600 * 24))
        .toFixed(0)
        .replace('-0', '0')
    );
  }
}
