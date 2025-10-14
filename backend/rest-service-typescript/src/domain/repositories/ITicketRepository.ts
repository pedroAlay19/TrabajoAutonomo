import { TicketEntity } from "../entities/ticket.entity";
import { IRepository } from "./IRepository";

export interface ITicketRepository extends IRepository<TicketEntity>  {
    
}