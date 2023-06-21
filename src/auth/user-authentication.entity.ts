import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserAuthentication {
    @PrimaryGeneratedColumn('identity', {
        name: 'id',
        type: 'int8'
    })
    id!: number;

    @Column({ type: 'varchar' })
    public email!: string;

    @Column({ type: 'varchar' })
    public password!: string;
}   
