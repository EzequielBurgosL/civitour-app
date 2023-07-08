import { ValueObject } from '.';

interface PhoneNumberProps {
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  static readonly spanishPhoneNumberRegex = /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/;

  private constructor(props: PhoneNumberProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(phoneNumber: string): PhoneNumber {
    if (
      phoneNumber === undefined ||
      phoneNumber === null ||
      PhoneNumber.spanishPhoneNumberRegex.test(phoneNumber)
    ) {
      throw new Error('Must be a spanish phone number');
    } else {
      return new PhoneNumber({ value: phoneNumber });
    }
  }
}
