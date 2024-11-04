import { Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Anttendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;

  @ManyToOne(() => Event, (event) => event.anttendees,{
    nullable: true,

  })
  @JoinColumn({
    name: 'event_id',
  })

  event: Event;
}
