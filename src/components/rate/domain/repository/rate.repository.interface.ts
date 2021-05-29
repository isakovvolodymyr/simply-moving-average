import { Rate } from '@app/components/rate/domain/model/rate.model';
import { ConvertSymbolEnum } from '@app/components/rate/domain/model/convert-symbol.enum';

export const RateRepositorySymbol = Symbol('RateRepository');

export interface RateRepository {
   save(rate: Rate): Promise<void>;
   count(symbol: ConvertSymbolEnum): Promise<number>;
   getSumByPeriod(period: number, symbol: ConvertSymbolEnum): Promise<number>;
} 
