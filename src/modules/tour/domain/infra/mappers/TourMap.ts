import { UniqueEntityID } from '../../../../../core/domain/UniqueEntityID';
import { City } from '../../../../../core/domain/ValueObjects/City';
import { DateBase } from '../../../../../core/domain/ValueObjects/Date';
import { Description } from '../../../../../core/domain/ValueObjects/Description';
import { Coordinates, Location } from '../../../../../core/domain/ValueObjects/Location';
import { MaxParticipants } from '../../../../../core/domain/ValueObjects/MaxParticipants';
import { Title } from '../../../../../core/domain/ValueObjects/Title';
import { Mapper } from '../../../../../core/infra/Mapper';
import { Step } from '../../../../step/domain/Step';
import { Tour } from '../../Tour';

type rawTour = {
  entityId: string;
  title: string;
  city: string;
  description: string;
  maxParticipants: number;
  date: string;
  steps: {
    title: string;
    description: string;
    location: Coordinates;
  }[];
};

export class TourMap implements Mapper<Tour, rawTour> {
  toPersistence(tour: Tour): rawTour {
    return {
      entityId: tour.id.toString(),
      title: tour.title.value,
      city: tour.city.value,
      description: tour.description.value,
      maxParticipants: tour.maxParticipants.value,
      date: tour.date.value.toString(),
      steps: tour.steps.map(step => ({
        title: step.title.value,
        description: step.description.value,
        location: step.location.value,
      })),
    };
  }

  toDomain(raw: rawTour): Tour {
    const titleOrError = Title.create(raw.title);
    const cityOrError = City.create(raw.city);
    const descriptionOrError = Description.create(raw.description);
    const maxParticipantsOrError = MaxParticipants.create(raw.maxParticipants);
    const dateOrError = DateBase.create(new Date(raw.date));
    const stepsOrError = raw.steps.map(step => Step.create({
      title: Title.create(step.title),
      description: Description.create(step.description),
      location: Location.create(step.location),
    }).getValue());

    const TourOrError = Tour.create(
      {
        title: titleOrError,
        city: cityOrError,
        description: descriptionOrError,
        maxParticipants: maxParticipantsOrError,
        steps: stepsOrError,
        date: dateOrError,
      },
      new UniqueEntityID(raw.entityId),
    );

    if (!TourOrError.isSuccess) {
      throw new Error(TourOrError.error);
    }

    return TourOrError.getValue();
  }
}
