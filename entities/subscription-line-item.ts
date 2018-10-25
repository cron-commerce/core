import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Subscription} from './subscription'

@Entity({name: 'subscription_line_items'})
export class SubscriptionLineItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Subscription, subscription => subscription.lineItems)
  public subscription: Subscription
}
