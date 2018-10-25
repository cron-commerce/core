import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Shop} from './shop'

@Entity({name: 'subscribables'})
export class Subscribable extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Shop, shop => shop.subscribables)
  public shop: Shop
}
