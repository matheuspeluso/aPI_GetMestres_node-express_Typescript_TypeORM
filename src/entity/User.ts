import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntity } from "./BaseEntity";

@Entity({name: "User"})
export class User extends BaseEntity{ //não usar o import de baseentity do typeorm 

   @Column({type: 'varchar', length: 100})
   name: string;

   @Column({type: 'varchar', length: 100})
   photo: string;

   @Column({type: 'varchar', length: 100})
   email: string;

   @Column({default: false})
   isRoot: boolean;

   @Column({type: 'varchar', length: 100})
   password: string;
   
}
