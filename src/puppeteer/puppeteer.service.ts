import {Injectable, OnModuleInit} from '@nestjs/common';
import puppeteer, {Browser, HTTPResponse, Page} from "puppeteer";
import {v4 as uuid_v4} from 'uuid';

@Injectable()
export class PuppeteerService implements OnModuleInit {
    public browser: Browser;
    public pages: Record<string, Page> = {};
    public responses: Record<string, HTTPResponse> = {};

    async onModuleInit() {
        this.browser = await puppeteer.connect({
            browserURL: 'http://localhost:9222'
        })
    }

    async openPage(url: string) {
        const id: string = uuid_v4();
        const page = await this.browser.newPage();
        this.pages[id] = page;
        const response = await page.goto(url);
        this.responses[id] = response;

        return {id, page, response};
    }
}
