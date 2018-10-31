import {BaseEntity, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {Shop} from './shop'
import {SubscribableProduct} from './subscribable-product'
import {SubscribableSize} from './subscribable-size'

export enum Types {Bundle = 'Bundle', Single = 'Single'}

@Entity({name: 'subscribables'})
@Index(['shop', 'handle'], {unique: true})
export class Subscribable extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public handle: string

  @ManyToOne(type => Shop, shop => shop.subscribables)
  public shop: Shop

  @Column('enum', {enum: Types})
  public type: string

  @OneToMany(type => SubscribableProduct, product => product.subscribable, {cascade: true, eager: true})
  public products: SubscribableProduct[]

  @OneToMany(type => SubscribableSize, size => size.subscribable, {cascade: true, eager: true})
  public sizes: SubscribableSize[]
}
