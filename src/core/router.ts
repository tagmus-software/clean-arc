import { Container } from "./container";
import { HttpMethod } from "./http";
import { InjectedController } from "../types/injected_controller";

export class Router {
  public static controller(prefix: string = "") {
    return (constructor: any) => {
      Reflect.defineMetadata("route:prefix", prefix, constructor);
      Container.registry(constructor);
    };
  }

  public static get(path: string = "") {
    return this.registry(path, HttpMethod.GET);
  }

  public static post(path: string = "") {
    return this.registry(path, HttpMethod.POST);
  }

  public static patch(path: string = "") {
    return this.registry(path, HttpMethod.PATCH);
  }

  public static delete(path: string = "") {
    return this.registry(path, HttpMethod.DELETE);
  }

  public static getRoutesWithHandler(controller: InjectedController) {
    const prefix = Reflect.getMetadata("route:prefix", controller.class);
    const handlers = Object.getOwnPropertyDescriptors(
      controller.class.prototype
    );

    const routesWithHandler = Object.entries(handlers)
      .filter(([key, descriptor]: [string, PropertyDescriptor]) =>
        Reflect.hasMetadata("route:information", descriptor.value)
      )
      .map(([key, descriptor]: [string, PropertyDescriptor]) => {
        const information: Record<string, string> = Reflect.getMetadata(
          "route:information",
          descriptor.value
        );
        return {
          information,
          handler: descriptor,
        };
      });

    return {
      prefix,
      routesWithHandler,
    };
  }
  private static registry(path: string, httpMethod: HttpMethod) {
    return (target: object, key: string, descriptor: PropertyDescriptor) => {
      Reflect.defineMetadata(
        "route:information",
        {
          path,
          httpMethod,
        },
        descriptor.value
      );
      return descriptor;
    };
  }
}
