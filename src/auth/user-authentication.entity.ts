import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserAuthentication {
    @PrimaryColumn()
    id!: number;

    @Column({ type: 'varchar' })
    public email!: string;

    @Column({ type: 'varchar' })
    public password!: string;
}   
