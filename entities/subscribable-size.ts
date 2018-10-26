import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Subscribable} from './subscribable'

@Entity({name: 'subscribable_sizes'})
export class SubscribableSize extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Subscribable, subscribable => subscribable.sizes)
  public subscribable: Subscribable[]
}
