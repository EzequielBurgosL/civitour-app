import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

export interface DomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): UniqueEntityID;
}
