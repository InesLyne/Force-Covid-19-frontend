import { Allocation } from 'src/app/models/allocation';
export class Beneficiaire {
    id: number;
    firstName:string;
    lastName: string;
    mobileNumber: string;
    monthlyIncome: number;
    numberOfChildren: number;
    numberOfElderly: number;
    numberOfPeopleInCharge: number;
    address: string;
    latitude: number;
    longitude: number;
    allocations: Allocation[];
    subdivision: string;
    
    constructor(){};

}
