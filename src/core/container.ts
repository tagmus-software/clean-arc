type Provider = {
  provider: any & ObjectConstructor;
  value: any;
};

export class Container {
  private static registeredProviders: Array<Provider> = [];

  public static registry(provider: Object): void {
    this.registeredProviders.push({ value: null, provider });
  }

  public static get(_provider: any) {
    const provider = this.registeredProviders.find(
      ({ provider }) => provider.name === _provider.name
    );

    if (!provider) {
      throw new Error(
        `The class ${_provider.name} was not registered as Injectable`
      );
    }

    if (provider.value) {
      return provider.value;
    }

    provider.value = this.buildProviderValue(provider);
    return provider.value;
  }

  private static buildProviderValue(provider: Provider) {
    const constructorArgs: Array<ObjectConstructor> =
      Reflect.getMetadata("design:paramtypes", provider.provider) || [];

    const argumentList = constructorArgs.map((arg) => this.get(arg));
    return Reflect.construct(provider.provider, argumentList);
  }
}

export function Injectable() {
  return (constructor: any) => {
    Container.registry(constructor);
  };
}
