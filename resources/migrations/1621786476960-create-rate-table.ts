import {MigrationInterface, QueryRunner} from "typeorm";

export class createRateTable1621786476960 implements MigrationInterface {
    name = 'createRateTable1621786476960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `exchange_app`.`rates` (`id` int unsigned NOT NULL AUTO_INCREMENT, `rate` decimal(12, 5) unsigned NOT NULL, `symbol` varchar(255) NOT NULL, `created_at` datetime NOT NULL DEFAULT NOW(), PRIMARY KEY (`id`)) ENGINE=InnoDB;");
        await queryRunner.query("CREATE INDEX idx_symbol ON `exchange_app`.`rates`(symbol)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `exchange_app`.`rates`");
    }

}
