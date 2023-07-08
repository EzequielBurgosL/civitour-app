import { ValueObject } from '.';

interface TitleProps {
  value: string;
}

export class Title extends ValueObject<TitleProps> {
  static readonly MAX_LENGTH = 60;

  private constructor(props: TitleProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(title: string): Title {
    if (
      title === undefined ||
      title === null ||
      title.length > Title.MAX_LENGTH
    ) {
      throw new Error(
        `Title must be less than ${Title.MAX_LENGTH} characters.`,
      );
    } else {
      return new Title({ value: title });
    }
  }
}
