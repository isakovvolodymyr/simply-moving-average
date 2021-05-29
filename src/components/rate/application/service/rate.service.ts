import CreateRateDTO from '@app/components/rate/application/dto/create-rate.dto';
import { RateRepository } from '@app/components/rate/domain/repository/rate.repository.interface';
import { Rate } from '@app/components/rate/domain/model/rate.model';
import { ConvertSymbolEnum } from '@app/components/rate/domain/model/convert-symbol.enum';

export default class RateService {
    constructor(private readonly rateRepository: RateRepository) {}

    public async save(createRateDTO: CreateRateDTO): Promise<void> {
        await this.rateRepository.save(
            new Rate(
                createRateDTO.getRate(),
                createRateDTO.getSymbol(),
            )
        )
    }
    
    public async count(): Promise<number> {
        return await this.rateRepository.count(ConvertSymbolEnum.BTC_TO_USD);
    }
    
    public async getSumByPeriod(period: number, symbol: ConvertSymbolEnum): Promise<number> {
        return await this.rateRepository.getSumByPeriod(period, symbol);
    }
}
