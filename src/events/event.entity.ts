import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Anttendee } from './attendee.entity';

@Entity()
export class Event {
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

  @OneToMany(() => Anttendee, (anttendee) => anttendee.event,{
    // eager: true,
    cascade: true,

  })
  anttendees: Anttendee[];
}
