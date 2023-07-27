import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { appRoutes } from './app.routes';
import { IntroduceYourselfDto } from './dto/introduce-yourself.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ViewYourselfDto } from './dto/view-yourself.dto';
import { plainToClass } from 'class-transformer';

@Controller(appRoutes.app)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(`hello-world`)
  getData() {
    return this.appService.getData();
  }

  @ApiResponse({ type: ViewYourselfDto })
  @Post(`introduce-yourself`)
  introduce(@Body() yourself: IntroduceYourselfDto) {
    const result = this.appService.introduceYourself(yourself);
    return plainToClass(ViewYourselfDto, result);
  }
}
