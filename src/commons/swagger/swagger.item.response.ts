import { ApiProperty } from '@nestjs/swagger';

export class SwaggerItemResponse<ViewModel> {
    @ApiProperty()
    protected data: ViewModel;
}
