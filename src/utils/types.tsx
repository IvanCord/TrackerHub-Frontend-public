export type Coord = {
  x: number;
  y: number;
};

export type Blocker = {
  id: number;
  init: Date;
  fin: Date;
  coords: Coord[];
};

export type Vehicle = {
  id: string;
  type: string;
  state: number;
  initIncident?: Date;
  finIncident?: Date;
  orders: Order[];
  coord: Coord;
  plannedPath: Coord[];
  tasks: Task[];
  breakdownType: number;
};

export type Task = {
  clientId: number;
  dateLimit: Date;
  destination: Coord;
  numPackages: number;
};

export type Order = {
  id: string;
  coord: Coord;
  numPaq: number;
  hoursLimit: number;
};

export type GeneralConfig = {
  simulationType: number;
  tunerTime: number;
  started: boolean;
  date: Date;
  // simulSeconds: number
};

export type Data = {
  autos: Map<string, Vehicle>;
  motos: Map<string, Vehicle>;
  blockers: Blocker[];
};

export type VehicleBack = {
  id: string;
  type: string;
  state: string;
  coord: Coord;
  plannedPath: Coord[];
  tasks: Task[];
  breakdownType: number;
};

export type BlockerBack = {
  init: string;
  fin: string;
  coords: Coord[];
};

export type Breakdown = {
  vehicleId: string;
  type: number;
};
