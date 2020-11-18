export default function mergeObjectsInUnique<T>(array: T[], property: any): T[] {

  const newArray = new Map();

  array.forEach((item: T) => {
    const propertyValue = item[property];
    newArray.has(propertyValue) ? newArray.set(propertyValue, { ...item, ...newArray.get(propertyValue) }) : newArray.set(propertyValue, item);
  });

  return Array.from(newArray.values());
}
