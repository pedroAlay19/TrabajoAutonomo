import { ServiceEntity } from "../entities/service.entity";
import { IRepository } from "./IRepository";

export interface IServiceRepository extends IRepository<ServiceEntity> {
    
}