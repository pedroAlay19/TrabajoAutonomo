import { TicketServiceEntity } from "../entities/ticket-service.entity";
import { IRepository } from "./IRepository";

export interface ITicketServiceRepository extends IRepository<TicketServiceEntity>{}