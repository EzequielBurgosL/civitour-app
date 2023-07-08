//  Título, la descripción y la localización donde se produce
import { Entity } from '../../../core/domain/Entity';
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
  private constructor(props: StepProps) {
    super(props);
  }

  get title(): Title {
    return this.props.title;
  }

  public static create(props: StepProps) {
    const stepPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'title', argument: props.title },
      { argumentName: 'description', argument: props.description },
      { argumentName: 'location', argument: props.location },
    ]);

    if (stepPropsResult.isSuccess) {
      return Result.ok<Step>(new Step(props));
    }

    return Result.fail<Step>(stepPropsResult.error);
  }
}
