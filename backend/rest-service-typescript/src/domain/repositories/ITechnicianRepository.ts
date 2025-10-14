import { TechnicianEntity } from "../entities/technician.entity";
import { IRepository } from "./IRepository";

export interface ITechnicianRepository extends IRepository<TechnicianEntity> {}