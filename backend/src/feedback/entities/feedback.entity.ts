// feedback.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  rawText: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  productMentioned: string;

  @Column({ nullable: true })
  sentiment: string; // Positive | Negative | Neutral

  @Column({ type: 'text', nullable: true })
  summary: string;

  @CreateDateColumn()
  createdAt: Date;
}
