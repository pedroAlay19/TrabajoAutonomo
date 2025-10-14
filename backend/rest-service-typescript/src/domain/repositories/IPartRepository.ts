import { PartEntity } from "../entities/part.entity";
import { IRepository } from "./IRepository";

export interface IPartRepository extends IRepository<PartEntity> {}