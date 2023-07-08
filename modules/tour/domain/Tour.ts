import { Entity } from '../../../core/domain/Entity';
import { City } from '../../../core/domain/ValueObjects/City';
import { Description } from '../../../core/domain/ValueObjects/Description';
import { MaxParticipants } from '../../../core/domain/ValueObjects/MaxParticipants';
import { Title } from '../../../core/domain/ValueObjects/Title';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import { Step } from '../../step/domain/Step';

interface TourProps {
  title: Title;
  city: City;
  description: Description;
  date: Date;
  maxParticipants: MaxParticipants;
  steps: Step[];
}

export class Tour extends Entity<TourProps> {
  private constructor(props: TourProps) {
    super(props);
  }

  get title(): Title {
    return this.props.title;
  }

  public static create(props: TourProps) {
    const tourPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'title', argument: props.title },
      { argumentName: 'city', argument: props.city },
      { argumentName: 'description', argument: props.description },
      { argumentName: 'date', argument: props.date },
      { argumentName: 'maxParticipants', argument: props.maxParticipants },
      { argumentName: 'steps', argument: props.steps },
    ]);

    if (tourPropsResult.isSuccess) {
      return Result.ok<Tour>(new Tour(props));
    }

    return Result.fail<Tour>(tourPropsResult.error);
  }
}
