import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PuppeteerService} from "./puppeteer.service";
import {OpenDto} from "./dto/open.dto";
import {GotoDto} from "./dto/goto.dto";

@Controller('puppeteer')
export class PuppeteerController {
    constructor(private readonly service: PuppeteerService) {
    }

    @Post('/page')
    async open(@Body() dto: OpenDto) {
        const {id, page, response} = await this.service.openPage(dto.url)

        return {
            success: true,
            id,
            url: response.url(),
            content: await page.content(),
            headers: await response.headers(),
            cookies: await page.cookies(),
            status: response.status(),
            statusText: response.statusText(),
        };
    }

    @Get('/page/:id')
    async get(@Param('id') id: string) {
        const page = this.service.pages[id];
        const response = this.service.responses[id];
        if (!page || !response) {
            return {
                success: false,
                message: `Page ${id} not found.`
            };
        }

        return {
            success: true,
            id,
            url: response.url(),
            content: await page.content(),
            headers: await response.headers(),
            cookies: await page.cookies(),
            status: response.status(),
            statusText: response.statusText(),
        };
    }

    @Post('/page/:id/goto')
    async goto(@Param('id') id: string, @Body() dto: GotoDto) {
        const page = this.service.pages[id];
        if (!page) {
            return {
                success: false,
                message: `Page ${id} not found.`
            };
        }

        const response = await page.goto(dto.url);
        this.service.responses[id] = response;

        return {
            success: true,
            id,
            url: response.url(),
            content: await page.content(),
            headers: await response.headers(),
            cookies: await page.cookies(),
            status: response.status(),
            statusText: response.statusText(),
        };
    }

    @Get('/page/:id/close')
    async close(@Param('id') id: string) {
        const page = this.service.pages[id];
        const response = this.service.responses[id];
        if (!page || !response) {
            return {
                success: false,
                message: `Page ${id} not found.`
            };
        }

        await page.close();

        return {
            success: true,
        };
    }
}
