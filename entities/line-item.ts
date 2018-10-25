import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Subscription} from './subscription'

@Entity({name: 'lineItems'})
export class LineItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Subscription, subscription => subscription.lineItems)
  public subscription: Subscription
}
