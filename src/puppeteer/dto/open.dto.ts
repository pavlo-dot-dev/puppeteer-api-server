import {IsNotEmpty, IsUrl} from "class-validator";

export class OpenDto {
    @IsUrl()
    @IsNotEmpty()
    url: string;
}