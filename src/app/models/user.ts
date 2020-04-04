export class User {
    id: number;
    username: string;
    password: string;
    roles: any;
    type: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    identityNumber: string;
    email:string;
    lastLogin: string;
    isActive: string;
    fullname: string;

    constructor(){
        this.username='';
        this.password='';
        this.roles=[];
        this.type='';
        this.firstName='';
        this.lastName='';
        this.phoneNumber='';
        this.identityNumber='';
        this.email='';
        this.lastLogin='';
        this.fullname='';
    }
}
