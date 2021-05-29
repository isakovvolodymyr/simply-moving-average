import {Module} from '@nestjs/common';
import {RateModule} from '@app/components/rate/infrastruture/rate.module';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            keepConnectionAlive: true
        }),
        ConfigModule.forRoot(
        {
            isGlobal: true,
        }),
        RateModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
