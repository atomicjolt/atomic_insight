type ObjectWithKey = { key: number | string };

export function findByKey<ObjectType extends ObjectWithKey>(obj: ObjectType[], key?: number): ObjectType | undefined {
  return obj.find((m) => m.key === key);
}
