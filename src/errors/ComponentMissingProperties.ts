export class ComponentMissingProperties extends Error {
  constructor(public message: string) {
    super();
  }
}
