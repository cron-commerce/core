import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

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
  public shopifyAccessToken: string
}
