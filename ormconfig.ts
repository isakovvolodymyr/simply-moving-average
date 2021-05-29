
require("dotenv").config();

export = {
    type: process.env.DEFAULT_TYPEORM_TYPE,
    host: process.env.DEFAULT_TYPEORM_HOST,
    port: process.env.DEFAULT_TYPEORM_PORT,
    username: process.env.DEFAULT_TYPEORM_USERNAME,
    password: process.env.DEFAULT_TYPEORM_PASSWORD,
    database: process.env.DEFAULT_TYPEORM_DATABASE,
    migrations: ["resources/migrations/*.ts"],
    cli: {
        "migrationsDir": "resources/migrations"
    },
    migrationsRun: true,
    logging: true,
    synchronize: false,
    entities: []
};
