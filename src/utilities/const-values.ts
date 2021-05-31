export enum OverlapType {
  None = -1,
  StartInRange,
  EndInRange,
  ContainedInRange,
  ContainsRange,
  RangeEqual
}

export type OverlapTypeName = keyof typeof OverlapType;

class OverlapEnum {
  public parse(name: OverlapTypeName): OverlapType {
    return OverlapType[name];
  }
}

const overlapEnum = new OverlapEnum();
export { overlapEnum };
