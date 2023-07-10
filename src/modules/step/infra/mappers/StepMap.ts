import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { Description } from '../../../../core/domain/ValueObjects/Description';
import {
  Coordinates,
  Location,
} from '../../../../core/domain/ValueObjects/Location';
import { Name } from '../../../../core/domain/ValueObjects/Name';
import { Mapper } from '../../../../core/infra/Mapper';
import { Step } from '../../domain/Step';

type rawStep = {
  entityId: string;
  title: string;
  description: string;
  location: Coordinates;
};

export class StepMap implements Mapper<Step, rawStep> {
  toPersistence(step: Step): rawStep {
    return {
      entityId: step.id.toString(),
      title: step.title.value,
      description: step.description.value,
      location: step.location.value,
    };
  }

  toDomain(raw: rawStep): Step {
    const titleOrError = Name.create(raw.title);
    const descriptionOrError = Description.create(raw.description);
    const locationOrError = Location.create(raw.location);

    const StepOrError = Step.create(
      {
        title: titleOrError,
        description: descriptionOrError,
        location: locationOrError,
      },
      new UniqueEntityID(raw.entityId),
    );

    if (!StepOrError.isSuccess) {
      return StepOrError.error as Step;
    }

    return StepOrError.getValue();
  }
}
