export interface ISnapshotBikeStation {
  geometry: Geometry;
  idstation: number;
  nom: string;
  adresse1: string;
  adresse2: string;
  commune: string;
  numdansarrondissement: number;
  nbbornettes: number;
  stationbonus: null;
  pole: string;
  ouverte: boolean;
  achevement: string;
  observation: string;
  validite: string;
  gid: number;
  code_insee: string;
}

export interface Geometry {
  disposed: boolean;
  pendingRemovals_: null;
  dispatching_: null;
  listeners_: Listeners;
  revision_: number;
  ol_uid: string;
  values_: null;
  extent_: number[];
  extentRevision_: number;
  simplifiedGeometryMaxMinSquaredTolerance: number;
  simplifiedGeometryRevision: number;
  layout: string;
  stride: number;
  flatCoordinates: number[];
}

export interface Listeners {
  change: null[];
}

export type ISnapshotBikeStationOptions = ISnapshotBikeStation;

export interface ISnapshotBikeStationSanitized {
  id: number;
  nom: string;
  adresse1: string;
  adresse2: string | null;
  commune: string;
  observation: string | null;
  pole: string;
  ouverte: boolean;
}
