import { Injectable } from '@nestjs/common';
import { BaseWebSocketServer } from '@app/components/rate/ui/web-socket/server/base.web-socket.server';
import CreateRateDTO from '@app/components/rate/application/dto/create-rate.dto';
import { ConvertSymbolEnum } from '@app/components/rate/domain/model/convert-symbol.enum';
import { SymbolEnum } from '@app/components/rate/ui/web-socket/constant/symbol.enum';
import RateService from '@app/components/rate/application/service/rate.service';

@Injectable()
export class BitfinexServer extends BaseWebSocketServer {
    private static readonly API_URL = 'wss://api-pub.bitfinex.com/ws/2';
    
    public constructor(private readonly rateService: RateService) {
        super(BitfinexServer.API_URL, BitfinexServer.makeOpenMessage())
    }

    protected async handleMessage(message: any): Promise<void> {
        console.log('Received message from BitfinexServer: ', message);
        const data = JSON.parse(message as string);

        if (BitfinexServer.isDataValidForSave(data)) {
            await this.rateService.save(
                CreateRateDTO.create(
                    data[1][6],
                    ConvertSymbolEnum.BTC_TO_USD
                )
            );
        }
    }
    
    private static isDataValidForSave(data: any): boolean {
        if (!Array.isArray(data) || !Array.isArray(data[1]) || undefined === data[1][6]) {
            return false;
        }
        
       return true;
    }
    
    private static makeOpenMessage(): string {
        return JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: SymbolEnum.BITFINEX_BTC_TO_USD
        });
    }
}
