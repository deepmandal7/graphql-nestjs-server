import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Pet {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: Number

    @Column()
    @Field()
    name: String

    @Column({nullable: true})
    @Field({nullable: true})
    type?: String
}