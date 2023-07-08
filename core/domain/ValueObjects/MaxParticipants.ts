import { ValueObject } from '.';

interface MaxParticipantsProps {
  value: number;
}

export class MaxParticipants extends ValueObject<MaxParticipantsProps> {
  static readonly MAX_PARTICIPANTS = 50;

  private constructor(props: MaxParticipantsProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(maxParticipants: number): MaxParticipants {
    if (
      maxParticipants === undefined ||
      maxParticipants === null ||
      maxParticipants > MaxParticipants.MAX_PARTICIPANTS
    ) {
      throw new Error(
        `Maximum number of participants cannot excede ${MaxParticipants.MAX_PARTICIPANTS}`,
      );
    } else {
      return new MaxParticipants({ value: maxParticipants });
    }
  }
}
