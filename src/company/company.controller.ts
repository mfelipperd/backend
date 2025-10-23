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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Company as CompanyModel } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'CNPJ já existe' })
  create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  @ApiResponse({ status: 200, description: 'Lista de empresas retornada com sucesso' })
  findAll(): Promise<CompanyModel[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa', type: 'number' })
  @ApiResponse({ status: 200, description: 'Empresa encontrada' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CompanyModel | null> {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar empresa' })
  @ApiParam({ name: 'id', description: 'ID da empresa', type: 'number' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: 'Empresa atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCompanyDto) {
    return this.companyService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar empresa' })
  @ApiParam({ name: 'id', description: 'ID da empresa', type: 'number' })
  @ApiResponse({ status: 200, description: 'Empresa deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<CompanyModel> {
    return this.companyService.remove(id);
  }
}
