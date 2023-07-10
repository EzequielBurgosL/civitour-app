import { UniqueEntityID } from '../../../../core/domain/UniqueEntityID';
import { Name } from '../../../../core/domain/ValueObjects/Name';
import { Mapper } from '../../../../core/infra/Mapper';
import { Guide } from '../../domain/Guide';

type rawGuide = {
  entityId: string;
  name: string;
};

export class GuideMap implements Mapper<Guide, rawGuide> {
  toPersistence(guide: Guide): rawGuide {
    return {
      entityId: guide.id.toString(),
      name: guide.name.value,
    };
  }

  toDomain(raw: rawGuide): Guide {
    const nameOrError = Name.create(raw.name);

    const GuideOrError = Guide.create(
      {
        name: nameOrError,
      },
      new UniqueEntityID(raw.entityId),
    );

    if (!GuideOrError.isSuccess) {
      throw new Error(GuideOrError.error);
    }

    return GuideOrError.getValue();
  }
}
