if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env.development'})
}

console.log(process.env.DATABASE_PASSWORD)
module.exports = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
    entities: ['./src/app/modules/**/*.entity.ts'],
    migrations: ['./src/app/database/migrations/*.ts'],
    cli: {
        migrationsDir: './src/app/database/migrations',
    },
} ;
