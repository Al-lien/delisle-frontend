export interface IStationCard {
  id: number | string;
  title: string;
  subtitle: string;
  totalReport: number;
  details: IStationCardDetails[];
}

export interface IStationCardDetails {
  title: string;
  date: Date;
}
