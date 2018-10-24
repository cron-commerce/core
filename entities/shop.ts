import {BaseEntity, Column, Entity, getManager, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'shops'})
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public name: string

  @Column({nullable: true})
  public stripePublishableKey: string

  @Column({nullable: true})
  public stripeUserId: string

  @Column({nullable: true})
  public accessToken: string

  public static findByName = (name: string): Promise<Shop> => {
    const entityManager = getManager()
    return entityManager.findOne(Shop, {where: {name}})
  }
}
