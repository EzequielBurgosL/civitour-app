export interface Repository<DomainType> {
  exists(entity: DomainType): Promise<boolean>;
  save(entity: DomainType): Promise<void>;
  findById(entity: DomainType): Promise<DomainType>;
}
