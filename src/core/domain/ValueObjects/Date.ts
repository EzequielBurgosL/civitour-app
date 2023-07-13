import { ValueObject } from '.';

interface DateProps {
  value: Date;
}

export class DateBase extends ValueObject<DateProps> {
  private constructor(props: DateProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }

  public static create(date: Date): DateBase {
    if (
      date === undefined ||
      date === null
    ) {
      throw new Error();
    } else {
      return new DateBase({ value: date });
    }
  }
}
