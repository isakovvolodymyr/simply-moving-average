import {ApiProperty} from '@nestjs/swagger';

export default class RateAverageViewModel {
    @ApiProperty()
    private readonly amount: number;
    
    public constructor(amount: number) {
        this.amount = amount;
    }
}
