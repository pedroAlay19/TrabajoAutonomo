import { TicketPartEntity } from "../entities/ticket-part.entity";
import { IRepository } from "./IRepository";

export interface ITicketPartRepository extends IRepository<TicketPartEntity> {}