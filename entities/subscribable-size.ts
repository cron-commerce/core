import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Subscribable} from './subscribable'

@Entity({name: 'subscribable_sizes'})
export class SubscribableSize extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Subscribable, subscribable => subscribable.sizes)
  public subscribable: Subscribable[]

  @Column()
  public numVariants: number

  @Column('decimal', {precision: 15, scale: 2})
  public price: number
}
