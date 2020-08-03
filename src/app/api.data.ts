import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DataExample implements InMemoryDbService {
    createDb() {
        const users = [
            { id: 1, name: 'Carlos', lastName: 'Galeano', email: 'galeanocarlosd@gmail.com', GitHub: 'MisterCG' }
        ];
        return {users};
    }
    genIdDefault() {}
}