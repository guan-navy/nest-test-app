import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Anttendee {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;

  @ManyToOne(() => Event, (event) => event.anttendees)
  event: Event;
}
