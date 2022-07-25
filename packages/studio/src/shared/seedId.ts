var innerSeed = 1;

export function seedId(){
  return (innerSeed ++).toString();
}