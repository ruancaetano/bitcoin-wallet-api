import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTransactionTable1635047989299 implements MigrationInterface {
    name = 'updateTransactionTable1635047989299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "unit_value"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "unit_value" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "quantity" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "unit_value"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "unit_value" integer NOT NULL`);
    }

}
