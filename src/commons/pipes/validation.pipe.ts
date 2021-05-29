import {
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    public constructor(private readonly options?: ValidationPipeOptions) {
        this.options = options;
    }

    async transform(value, metadata: ArgumentMetadata) {
        if (undefined === value) {
            throw new BadRequestException('No data submitted');
        }

        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new UnprocessableEntityException(errors);
        }

        if (this.options && this.options.transform) {
            return object;
        }

        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
