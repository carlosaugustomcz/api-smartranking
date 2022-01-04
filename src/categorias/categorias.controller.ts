import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizarCategoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategorias(): Promise<Categoria[]> {
    return await this.categoriasService.consultarTodasCategorias();
  }

  @Get('/:categoria')
  async consultarCategoriasId(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return await this.categoriasService.consultarCategoriasId(categoria);
  }

  @Put('/:_id')
  async atualizarCategoriaId(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string,
  ): Promise<void> {
    await this.categoriasService.atualizarCategoria(_id, atualizarCategoriaDto);
  }

  @Post('/:categoria/jogadores/:idJogador')
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
    return await this.categoriasService.atribuirCategoriaJogador(params);
  }
}
