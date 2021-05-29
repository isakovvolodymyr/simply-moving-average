import {Controller, Get, HttpStatus, Inject, Param} from '@nestjs/common';
import {
    TraderStrategyService,
    TraderStrategyServiceSymbol
} from '@app/components/rate/application/port/trader-strategy.service.interface';
import {RateParamDTO} from '@app/components/rate/ui/rest/request/dto/rate.param.dto';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import {SwaggerErrorResponse} from '@app/commons/swagger/swagger.error.response';
import ApiResponse from '@app/commons/response/api.response';
import RateAverageViewModel from '@app/components/rate/ui/rest/view-model/rate-average.view-model';
import {Item} from '@app/commons/response/item';
import {RateAverageSwaggerResponseDTO} from '@app/components/rate/ui/rest/swagger/rate-average.swagger.response.dto';

@Controller('rates')
@ApiTags('rates')
export class RateController {
    public constructor(
        @Inject(TraderStrategyServiceSymbol)
        private readonly traderStrategyService: TraderStrategyService,
    ) {}

    @Get(':period')
    @ApiParam({ name: 'period', type: Number })
    @ApiOkResponse({ status: HttpStatus.OK, type: RateAverageSwaggerResponseDTO })
    @ApiBadRequestResponse({
        description: 'Bad request exception',
        type: SwaggerErrorResponse,
    })
    @ApiUnprocessableEntityResponse({
        description: 'Validation exception',
        type: SwaggerErrorResponse,
    })
    @ApiInternalServerErrorResponse({
        description: 'Common internal service exception',
        type: SwaggerErrorResponse,
    })
    public async calculateAverage(
        @Param() rateParamDTO: RateParamDTO,
    ): Promise<Item<RateAverageViewModel>> {
        const amount = await this.traderStrategyService.calculate(rateParamDTO.getPeriod());
        
        return ApiResponse.json<RateAverageViewModel>(new RateAverageViewModel(amount));
    }
}
