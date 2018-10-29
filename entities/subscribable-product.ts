import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Subscribable} from './subscribable'

@Entity({name: 'subscribable_products'})
export class SubscribableProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('bigint')
  public shopifyProductId: number

  @ManyToOne(type => Subscribable, subscribable => subscribable.products)
  public subscribable: Subscribable
}
