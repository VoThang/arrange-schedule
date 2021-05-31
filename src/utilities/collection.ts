import { BaseEntity } from "../domain/entity/base-entity";

function groupBy<T extends BaseEntity>(
  list: T[],
  getKeyProp: (item: {}) => string
): Map<string, T[]> {
  const map = new Map();
  list.forEach(item => {
    const keyProp = getKeyProp(item);
    const collection = map.get(keyProp);
    if (!collection) {
      map.set(keyProp, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function tranforms<T extends BaseEntity>(datas: T[]): T[] {
  return datas.reduce((_: T[], current: T, currentIndex: number) => {
    current.id = currentIndex + "";
    current["type"] = "Origin";
    _.push(current);
    return _;
  }, [] as T[]);
}

export { groupBy, tranforms };
