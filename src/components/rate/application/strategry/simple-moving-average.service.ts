import {TraderStrategyService} from '@app/components/rate/application/port/trader-strategy.service.interface';
import RateService from '@app/components/rate/application/service/rate.service';
import {ConvertSymbolEnum} from '@app/components/rate/domain/model/convert-symbol.enum';
import { BadRequestException } from '@nestjs/common';

export default class SimpleMovingAverageService implements TraderStrategyService {
    public constructor(private readonly rateService: RateService) {
    }
    
    public async calculate(period: number): Promise<number> {
        const countRates = await this.rateService.count();
        if (countRates < period) {
            throw new BadRequestException(`Not enough data, count: ${countRates}, period: ${period}`);
        }

        const sum = await this.rateService.getSumByPeriod(period, ConvertSymbolEnum.BTC_TO_USD);
        
        return sum/period;
    }
}
