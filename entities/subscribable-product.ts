import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Subscribable} from './subscribable'

@Entity({name: 'subscribable_products'})
export class SubscribableProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Subscribable, subscribable => subscribable.products)
  public subscribable: Subscribable
}
