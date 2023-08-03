import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {PuppeteerService} from "./puppeteer/puppeteer.service";
import { PuppeteerController } from './puppeteer/puppeteer.controller';

@Module({
    imports: [],
    controllers: [AppController, PuppeteerController],
    providers: [PuppeteerService],
})
export class AppModule {
}
