import {compare, hash} from 'bcrypt'
import {BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

const SALT_ROUNDS = 10

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
  public token: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.passwordHash = await hash(this.password, SALT_ROUNDS)
    }
  }

  async isPasswordValid(password) {
    return compare(password, this.passwordHash)
  }
}
