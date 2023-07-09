import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Name } from '../../../core/domain/ValueObjects/Name';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface GuideProps {
  name: Name;
}

export class Guide extends Entity<GuideProps> {
  private constructor(props: GuideProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): Name {
    return this.props.name;
  }

  public static create(props: GuideProps, id?: UniqueEntityID) {
    const guidePropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'name', argument: props.name },
    ]);

    if (guidePropsResult.isSuccess) {
      return Result.ok<Guide>(new Guide(props, id));
    }

    return Result.fail<Guide>(guidePropsResult.error);
  }
}
