import { Response } from 'express';
import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello( @Res() response: Response ) {
    const pdfDoc = this.basicReportsService.helloworld();

    response.setHeader('content-type', 'application/pdf');
    pdfDoc.info.Title = 'Hola Mundo';
    pdfDoc.info.Author = 'Greg';
    pdfDoc.info.Subject = 'Primer PDF';

    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter( @Res() response: Response ) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('content-type', 'application/pdf');
    pdfDoc.info.Title = 'Hola Mundo';

    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById( 
    @Res() response: Response, 
    @Param('employeeId', ParseIntPipe) employeeId: number 
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(employeeId);

    response.setHeader('content-type', 'application/pdf');
    pdfDoc.info.Title = 'Hola Mundo';

    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
