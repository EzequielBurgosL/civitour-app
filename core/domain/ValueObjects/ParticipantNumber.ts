import { ValueObject } from '.';

interface ParticipantNumberProps {
  value: number;
}

export class ParticipantNumber extends ValueObject<ParticipantNumberProps> {
  private constructor(props: ParticipantNumberProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(participantNumber: number): ParticipantNumber {
    if (participantNumber === undefined || participantNumber === null) {
      throw new Error('participantNumber must be defined');
    } else {
      return new ParticipantNumber({ value: participantNumber });
    }
  }
}
