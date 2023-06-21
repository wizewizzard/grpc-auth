import { DataSource, EntityRepository, Repository } from "typeorm";
import { UserAuthentication } from "./user-authentication.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserAuthenticationRepository extends Repository<UserAuthentication>{
    constructor(private dataSource: DataSource)
    {
        super(UserAuthentication, dataSource.createEntityManager());
    }
}