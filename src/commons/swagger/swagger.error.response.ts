import { ApiProperty } from '@nestjs/swagger';

export class SwaggerErrorResponse {
    @ApiProperty()
    protected statusCode: number;

    @ApiProperty()
    protected message: string;

    @ApiProperty({
        default: '2021-03-12T12:24:58.584Z',
    })
    protected timestamp: string;

    @ApiProperty()
    protected path: string;
}
