import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TechnicianEntity {
  @PrimaryColumn()
  technicianId: number;

  @OneToOne(() => UserEntity, user => user.technicianProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column()
  specialty: string;

  @Column({ type: 'int', default: 0})
  experienceYears: number;

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}