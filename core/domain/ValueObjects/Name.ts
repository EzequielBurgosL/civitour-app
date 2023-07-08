import { ValueObject } from '.';

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  static readonly MIN_LENGTH = 3;
  static readonly MAX_LENGTH = 25;

  private constructor(props: NameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(name: string): Name {
    if (
      name === undefined ||
      name === null ||
      name.length <= Name.MIN_LENGTH ||
      name.length > Name.MAX_LENGTH
    ) {
      throw new Error(
        `Name must be greater than ${Name.MIN_LENGTH} chars and less than ${Name.MAX_LENGTH}.`,
      );
    } else {
      return new Name({ value: name });
    }
  }
}
