import { injectable, singleton } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';

import { typeormConfig } from '../configs/typeorm.config';

@injectable()
@singleton()
export class DbConnection {
    connection: Connection;

    constructor() {
        this.init();
    }

    init = async () => {
        this.connection = await createConnection(typeormConfig);
    };
}
