export class CreateInputDto {

}
export class AddTagDto {
    tag : string;
}
export class AddMatDto {
    matricule : string;
    image_url : string;
    in_time : Date;
}

export class OutputTagDto {
    tag : string;
}
export class OutputMatDto {
    matricule : string;
}
export class UserDto {
    phone: string;
    first_name: string;
    last_name:string;
    user_id: number;
    username:string;
    email: string;      
}
