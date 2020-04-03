import { UtilisateursModule } from '../components/utilisateurs/utilisateurs.module';

export class Distributeur {
    id: number;
    storageCapacity: string;
    geographicalArea: string;
    address: string;
    latitude: number;
    longitude: number;
    manager: UtilisateursModule;

    constructor(){}
}
