import { User } from './user';
export class Distributeur {
    id: number;
    storageCapacity: string;
    geographicalArea: any[];
    address: string;
    latitude: number;
    longitude: number;
    manager: User;

    constructor(){
        this.geographicalArea=[];
        this.manager= new User();
    }
}
