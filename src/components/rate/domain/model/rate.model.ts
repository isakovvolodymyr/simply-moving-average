import { ConvertSymbolEnum } from '@app/components/rate/domain/model/convert-symbol.enum';

export class Rate {
    public constructor(
        private readonly rate: number,
        private readonly symbol: ConvertSymbolEnum,
    ) {
    }

    public getRate(): number {
        return this.rate;
    }

    public getSymbol(): ConvertSymbolEnum {
        return this.symbol;
    }
}
