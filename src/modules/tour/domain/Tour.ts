import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { City } from '../../../core/domain/ValueObjects/City';
import { DateBase } from '../../../core/domain/ValueObjects/Date';
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
  date: DateBase;
  maxParticipants: MaxParticipants;
  steps: Step[];
}

export class Tour extends Entity<TourProps> {
  private constructor(props: TourProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get title(): Title {
    return this.props.title;
  }

  get city(): City {
    return this.props.city;
  }

  get description(): Description {
    return this.props.title;
  }

  get maxParticipants(): MaxParticipants {
    return this.props.maxParticipants;
  }

  get date(): DateBase {
    return this.props.date;
  }

  get steps(): Step[] {
    return this.props.steps;
  }

  public static create(props: TourProps, id?: UniqueEntityID) {
    const tourPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'title', argument: props.title },
      { argumentName: 'city', argument: props.city },
      { argumentName: 'description', argument: props.description },
      { argumentName: 'date', argument: props.date },
      { argumentName: 'maxParticipants', argument: props.maxParticipants },
      { argumentName: 'steps', argument: props.steps },
    ]);

    if (tourPropsResult.isSuccess) {
      return Result.ok<Tour>(new Tour(props, id));
    }

    return Result.fail<Tour>(tourPropsResult.error);
  }
}
