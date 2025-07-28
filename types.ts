
export enum CoilMaterial {
  Kapton = 'KS',
  Aluminium = 'AL',
  TILL = 'TL',
}

export interface CoilParameters {
  material: CoilMaterial;
  internalDiameter: number;
  coilHeight: number;
  windingHeight: number;
  impedance: number;
  numberOfLayers: number;
}
