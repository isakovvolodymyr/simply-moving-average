import { ApiProperty } from '@nestjs/swagger';
import { SwaggerItemResponse } from '@app/commons/swagger/swagger.item.response';
import RateAverageViewModel from '@app/components/rate/ui/rest/view-model/rate-average.view-model';

export class RateAverageSwaggerResponseDTO extends SwaggerItemResponse<RateAverageViewModel> {
    @ApiProperty({
        type: RateAverageViewModel,
    })
    protected data: RateAverageViewModel;
}
