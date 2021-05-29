import { IsEnum, IsNotEmpty } from 'class-validator';
import { Type} from 'class-transformer';

export enum PeriodType {
    First = 7,
    Second = 25,
    Third = 99,
}

export class RateParamDTO {
    @Type(() => Number)
    @IsNotEmpty()
    @IsEnum(PeriodType)
    private period: number;
    
    public getPeriod(): number {
        return this.period;
    }
}


