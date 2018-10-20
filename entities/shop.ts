import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'shops'})
export class Shop {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public name: string

  @Column()
  public token: string
}
