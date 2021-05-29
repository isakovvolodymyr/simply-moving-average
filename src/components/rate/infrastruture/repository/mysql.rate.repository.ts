import { RateRepository } from '@app/components/rate/domain/repository/rate.repository.interface';
import { Rate } from '@app/components/rate/domain/model/rate.model';
import { getManager } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { ConvertSymbolEnum } from '@app/components/rate/domain/model/convert-symbol.enum';
import { RateCountSqlResponse, RateSumSqlResponse } from '@app/components/rate/infrastruture/response/rate.sql.response';

export default class MysqlRateRepository implements RateRepository {
    public constructor(
        private readonly pool: EntityManager = getManager(),
    ) {
    }

    public async save(rate: Rate): Promise<void> {
        await this.pool.query(`INSERT INTO rates (rate, symbol)
                               VALUES (?, ?)`, [rate.getRate(), rate.getSymbol()]);
    }

    public async count(symbol: ConvertSymbolEnum): Promise<number> {
        const query = `SELECT count(*) as count
                       FROM rates
                       WHERE symbol = ?`;
        const [result]: RateCountSqlResponse[] = await this.pool.query(query, [symbol]);

        return result?.count ? parseInt(result.count) : 0;
    }

    public async getSumByPeriod(period: number, symbol: ConvertSymbolEnum): Promise<number> {
        const query = `SELECT sum(r1.rate) as amount
                       FROM (SELECT rate
                       FROM rates
                       WHERE symbol = ?
                       ORDER BY id DESC LIMIT ${period}) r1`;

        const [result]: RateSumSqlResponse[] = await this.pool.query(query, [symbol]);

        return result?.amount ? parseInt(result.amount) : 0;
    }
}
