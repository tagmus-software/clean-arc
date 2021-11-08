export function Injectable() {
  return (target: any) => {
    Reflect.defineMetadata("injectable", true, target);
  };
}
