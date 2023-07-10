import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Description } from '../../../core/domain/ValueObjects/Description';
import { Location } from '../../../core/domain/ValueObjects/Location';
import { Title } from '../../../core/domain/ValueObjects/Title';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface StepProps {
  title: Title;
  description: Description;
  location: Location;
}

export class Step extends Entity<StepProps> {
  private constructor(props: StepProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get title(): Title {
    return this.props.title;
  }

  get description(): Description {
    return this.props.description;
  }

  get location(): Location {
    return this.props.location;
  }

  public static create(props: StepProps, id?: UniqueEntityID) {
    const stepPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'title', argument: props.title },
      { argumentName: 'description', argument: props.description },
      { argumentName: 'location', argument: props.location },
    ]);

    if (stepPropsResult.isSuccess) {
      return Result.ok<Step>(new Step(props, id));
    }

    return Result.fail<Step>(stepPropsResult.error);
  }
}
