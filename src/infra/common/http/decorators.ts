import HttpStatus from "./status";

export function Status(statusCode: HttpStatus) {
  return (target: any, key: String, descriptor: PropertyDescriptor) => {
    const method: Function = descriptor.value;
    descriptor.value = async function (...args) {
      const result = await method.call(this, ...args);
      return {
        data: result,
        statusCode: statusCode,
      };
    };
  };
}
