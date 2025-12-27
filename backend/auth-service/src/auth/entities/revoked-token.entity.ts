import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('revoked_tokens')
export class RevokedToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index() // Índice para búsquedas rápidas
  jti: string; // JWT ID único del token

  @Column()
  userId: string;

  @Column({ type: 'datetime' })
  @Index() // Índice para limpieza automática
  expiresAt: Date;

  @Column({ default: 'logout' })
  reason: string; // 'logout', 'admin_revoke', 'suspicious_activity'

  @CreateDateColumn()
  revokedAt: Date;
}