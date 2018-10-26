import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {Shop} from './shop'
import {SubscribableProduct} from './subscribable-product'

export enum Types {Bundle = 'Bundle'}

@Entity({name: 'subscribables'})
export class Subscribable extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Shop, shop => shop.subscribables)
  public shop: Shop

  @Column('enum', {enum: Types})
  public type: string

  @OneToMany(type => SubscribableProduct, product => product.subscribable)
  public products: SubscribableProduct[]
}
