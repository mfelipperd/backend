import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Prisma, Company as CompanyModel } from '@prisma/client';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  create(@Body() company: Prisma.CompanyCreateInput): Promise<CompanyModel> {
    return this.companyService.create(company);
  }

  @Get()
  findAll(): Promise<CompanyModel[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CompanyModel | null> {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() company: Prisma.CompanyUpdateInput,
  ): Promise<CompanyModel> {
    return this.companyService.update(id, company);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<CompanyModel> {
    return this.companyService.remove(id);
  }
}
