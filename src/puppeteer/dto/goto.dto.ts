import {IsNotEmpty, IsUrl} from "class-validator";

export class GotoDto {
    @IsUrl()
    @IsNotEmpty()
    url: string;
}