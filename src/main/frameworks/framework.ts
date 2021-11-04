import { InjectedController } from "../../types/injected_controller";

export interface Framework {
  listen(port: number): Promise<void>;

  bindRoutes(controllers: InjectedController[]): void;
}
