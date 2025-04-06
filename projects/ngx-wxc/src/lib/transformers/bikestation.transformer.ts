import { BIKE_STATION_SNAPSHOT_DEFAULT } from '../mocks/mock-incident-snapshots';
import { BIKE_STATION_STAT_DEFAULT } from '../mocks/mock-incident-stats';
import { IBIkeStationStat } from '../models';
import {
  ISnapshotBikeStation,
  ISnapshotBikeStationOptions,
  ISnapshotBikeStationSanitized,
} from '../models/bikestation.snapshot.model';

export class BikestationTransformer {
  public static readonly DEFAULT_BIKESTATION_VALUE = {
    DEFAULT_ID: Number(0o000),
    DEFAULT_NAME: 'Station introuvable',
    DEFAULT_COMMUNE: 'Commune introuvable',
    DEFAULT_ADDRESS: 'Adresse introuvable',
    DEFAULT_TOTAL: Number(0),
    DEFAULT_DATE: new Date('00/00/00'),
    DEFAULT_COORD: [45.75690413028127, 4.831724193542966] as [number, number], // center of Lyon
    DEFAULT_STATS: BIKE_STATION_STAT_DEFAULT,
    DEFAULT_SNAPSHOT: BIKE_STATION_SNAPSHOT_DEFAULT,
  };

  constructor() {
    throw new Error(
      'Cannot initialize Bike station statistic sample transformer'
    );
  }

  public static transformToDefaultSanitized(): IBIkeStationStat {
    const {
      DEFAULT_ID,
      DEFAULT_NAME,
      DEFAULT_COMMUNE,
      DEFAULT_ADDRESS,
      DEFAULT_TOTAL,
      DEFAULT_DATE,
      DEFAULT_COORD,
      DEFAULT_STATS,
      DEFAULT_SNAPSHOT,
    } = this.DEFAULT_BIKESTATION_VALUE;

    return {
      id: DEFAULT_ID,
      name: DEFAULT_NAME,
      commune: DEFAULT_COMMUNE,
      address: DEFAULT_ADDRESS,
      totalReports: DEFAULT_TOTAL,
      lastReport: DEFAULT_DATE,
      incidentStats: DEFAULT_STATS,
      incidentSnapshots: DEFAULT_SNAPSHOT,
      lat: DEFAULT_COORD[0],
      lng: DEFAULT_COORD[1],
    };
  }

  public static transformToSnaspshotSanitized(
    station: ISnapshotBikeStation,
    option?: ISnapshotBikeStationOptions
  ): ISnapshotBikeStationSanitized {
    const sanitized: ISnapshotBikeStationSanitized = {
      id: option?.idstation ?? station.idstation,
      nom: option?.nom ?? station.nom,
      adresse1: option?.adresse1 ?? station.adresse1,
      adresse2: option?.adresse2 ?? station.adresse2,
      commune: option?.commune ?? station.commune,
      observation: option?.observation ?? station.observation,
      pole: option?.pole ?? station.pole,
      ouverte: option?.ouverte ?? station.ouverte,
    };

    return sanitized;
  }
}
