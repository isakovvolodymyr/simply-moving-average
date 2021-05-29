import {ConvertSymbolEnum} from '@app/components/rate/domain/model/convert-symbol.enum';

export default class CreateRateDTO {
    private constructor(private readonly rate: number, private readonly symbol: ConvertSymbolEnum) {
    }
    
    public static create(rate: number, symbol: ConvertSymbolEnum) {
        return new CreateRateDTO(rate, symbol);
    }
    
    public getRate(): number {
        return this.rate;
    }
    
    public getSymbol(): ConvertSymbolEnum {
        return this.symbol;
    }
}
