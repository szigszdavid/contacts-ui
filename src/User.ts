export class User {
    username = "";
    password : string;
    fullName : string = "";
    privileges : {
        id : number,
        name : string
    }[]
}