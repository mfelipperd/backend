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
import { Company as CompanyModel } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
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
    @Body() dto: Partial<CreateCompanyDto>,
  ) {
    return this.companyService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<CompanyModel> {
    return this.companyService.remove(id);
  }
}
