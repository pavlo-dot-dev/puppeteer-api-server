import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/')
    index() {
        return {
            success: true,
            version: '1.0.0',
        }
    }
}
