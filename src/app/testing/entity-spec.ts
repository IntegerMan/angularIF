export class EntitySpec {

  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public shouldNotBeGettable(): EntitySpec {
    return this;
  }

  public shouldBeGettable(): EntitySpec {
    return this;
  }

  public shouldRespondToVerbWith(verb: string, ...containedPhrases: string[]): EntitySpec {
    return this;
  }

  public shouldResolveFrom(text: string): EntitySpec {
    return this;
  }

  public shouldDescribeWithRoom(): EntitySpec {
    return this;
  }

  public shouldNotDescribeWithRoom(): EntitySpec {
    return this;
  }

  public validate(): string {
    return null;
  }

}
