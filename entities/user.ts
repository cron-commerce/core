import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public email: string
}
