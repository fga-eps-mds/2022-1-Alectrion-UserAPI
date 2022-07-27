import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Job } from "./userEnum/job";
import { Role } from "./userEnum/role";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    username: string

    @Column({
        type: "enum",
        enum: Job,
        default: Job.GENERIC
    })
    job: Job

    @Column({
        type: "enum",
        enum: Role,
        default: Role.DEFAULT
    })
    role: Role

    @Column()
    password: string

    @Column({default: ()=> 'NOW()'})
    createdAt: Date

    @Column({default: ()=> 'NOW()'})
    @UpdateDateColumn()
    updatedAt: Date
}