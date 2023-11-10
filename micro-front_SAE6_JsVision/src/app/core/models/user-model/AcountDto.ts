import { AttachementDto } from "./AttachementDto"; 
import { Gender } from "./Gender";
import { StateRegion } from "./StateRegion";
export class AccountDto {
    id!: number; 
    username!: string ;
    role!: string ;
    enabled!: boolean;
    code!: string ;
    createdAt!: Date ;
    firstname!: string ;
    lastname!: string ;
    cin!: number; 
    phone!: number;   
    dateOfBirth!: Date ;
    email! : string ;
    linkedIn! : string ;
    github! : string ;
    gender! : Gender;   
    state! : StateRegion;  
    city! : string ;
    zipCode!: number;  
    address! : string ;
    attachementsDto : AttachementDto[]= new Array<AttachementDto>();
}