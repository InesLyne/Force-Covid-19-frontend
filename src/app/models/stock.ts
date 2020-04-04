import { Bien } from './bien';
import { UtilisateursModule } from '../components/utilisateurs/utilisateurs.module';

export class Stock {
    constructor(
        public id?: number,
        public user?: UtilisateursModule,
        public welfare: Bien = new Bien(),
        public quantity?: number,
        public created?: string,
        public updated?: string,
        ){}

}
