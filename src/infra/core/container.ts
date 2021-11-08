import dependencies from "../config/dependencies";

export type Provider = {
  provider: any;
  value: any;
};
export class Container {
  private static dependencies: Array<Provider> = [];

  public static register() {
    this.dependencies = [...dependencies].map((dependency) => ({
      provider: dependency,
      value: null,
    }));
  }

  public static get(target: any) {
    if (!Reflect.hasMetadata("injectable", target)) {
      return null;
    }

    const provider = this.dependencies.find(
      ({ provider }) => provider.name === target.name
    );

    if (!provider) {
      throw new Error(
        `The class ${target.name} was not registered as Injectable`
      );
    }

    if (provider.value) {
      return provider.value;
    }

    provider.value = this.buildProviderValue(provider);
    return provider.value;
  }

  private static buildProviderValue(provider: Provider) {
    const constructorArgs: Array<Object> =
      Reflect.getMetadata("design:paramtypes", provider.provider) || [];
    const argumentList = constructorArgs
      .map((arg) => this.get(arg))
      .filter((arg) => arg !== null);

    return Reflect.construct(provider.provider, argumentList);
  }
}
