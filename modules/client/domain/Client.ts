import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Name } from '../../../core/domain/ValueObjects/Name';
import { ParticipantNumber } from '../../../core/domain/ValueObjects/ParticipantNumber';
import { PhoneNumber } from '../../../core/domain/ValueObjects/PhoneNumber';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface ClientProps {
  name: Name;
  phoneNumber: PhoneNumber;
  participantNumber: ParticipantNumber;
}

export class Client extends Entity<ClientProps> {
  private constructor(props: ClientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): Name {
    return this.props.name;
  }

  get phoneNumber(): PhoneNumber {
    return this.props.phoneNumber;
  }

  get participantNumber(): ParticipantNumber {
    return this.props.participantNumber;
  }

  public static create(
    props: ClientProps,
    id?: UniqueEntityID,
  ): Result<Client> {
    const clientPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'name', argument: props.name },
      { argumentName: 'phoneNumber', argument: props.phoneNumber },
      { argumentName: 'participantNumber', argument: props.participantNumber },
    ]);

    if (clientPropsResult.isSuccess) {
      return Result.ok<Client>(new Client(props, id));
    }

    return Result.fail<Client>(clientPropsResult.error);
  }
}
