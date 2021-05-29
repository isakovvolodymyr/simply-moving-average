import { Module } from '@nestjs/common';
import {BitfinexServer} from '@app/components/rate/ui/web-socket/server/bitfinex.server';
import MysqlRateRepository from '@app/components/rate/infrastruture/repository/mysql.rate.repository';
import {RateRepositorySymbol} from '@app/components/rate/domain/repository/rate.repository.interface';
import {EntityManager} from 'typeorm/entity-manager/EntityManager';
import RateService from '@app/components/rate/application/service/rate.service';
import SimpleMovingAverageService from '@app/components/rate/application/strategry/simple-moving-average.service';
import {TraderStrategyServiceSymbol} from '@app/components/rate/application/port/trader-strategy.service.interface';
import {RateController} from '@app/components/rate/ui/rest/controller/rate.controller';

const providers = [BitfinexServer,
  {
    provide: RateRepositorySymbol,
    useFactory: (entityManager: EntityManager) => new MysqlRateRepository(entityManager),
    inject: [EntityManager]
  },
  {
    provide: RateService,
    useFactory: (repository: MysqlRateRepository) => new RateService(repository),
    inject: [RateRepositorySymbol]
  },
  {
    provide: TraderStrategyServiceSymbol,
    useFactory: (rateService: RateService) => new SimpleMovingAverageService(rateService),
    inject: [RateService]
  },
  SimpleMovingAverageService,
];

@Module({
  imports: [],
  controllers: [RateController],
  providers: [...providers],
  exports: [...providers],
})
export class RateModule {}
