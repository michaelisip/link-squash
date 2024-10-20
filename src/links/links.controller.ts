import { Body, Controller, Get, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { LinksService } from './links.service';
import { Response } from 'express';

@Controller()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('/links/generate')
  generate(@Body() body: any) {
    return this.linksService.generate(body.target);
  }

  @Get(':hash')
  async visit(@Param() params: any, @Res() res: Response) {
    const link = await this.linksService.findByHash(params.hash)

    if (link) {
      res.redirect(link.target)
    }

    throw new NotFoundException();
  }

  @Get('/links/get-all')
  async getAll() {
    return await this.linksService.findAll()
  }
}
