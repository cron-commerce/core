import {hash} from 'bcrypt'
import {BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public email: string

  @Column()
  public passwordHash: string

  public password: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword () {
    if (this.password) {
      this.passwordHash = await hash(this.password, 10)
    }
  }
}
