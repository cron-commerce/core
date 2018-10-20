import {Column, Entity, getManager, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'shops'})
export class Shop {
  public static findByName = (name: string): Promise<Shop> => {
    const entityManager = getManager()
    return entityManager.findOne(Shop, {where: {name}})
  }

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public name: string

  @Column()
  public token: string
}
