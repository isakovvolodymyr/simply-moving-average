import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';

export enum PeriodType {
    First = '7',
    Second = '25',
    Third = '99',
}

export class RateParamDTO {
    @IsNumberString()
    @IsNotEmpty()
    @IsEnum(PeriodType)
    private period: number;
    
    public getPeriod(): number {
        return this.period;
    }
}


