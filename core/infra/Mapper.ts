export interface Mapper<DomainType, PersistenceType> {
  toPersistence(entity: DomainType): PersistenceType;
  toDomain(raw: PersistenceType): DomainType;
  // ToDTO(t: T): DTO;
}
