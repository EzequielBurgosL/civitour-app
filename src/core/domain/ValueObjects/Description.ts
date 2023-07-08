import { ValueObject } from '.';

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  private constructor(props: DescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(description: string): Description {
    if (description === undefined || description === null) {
      throw new Error('Description must be defined');
    } else {
      return new Description({ value: description });
    }
  }
}
