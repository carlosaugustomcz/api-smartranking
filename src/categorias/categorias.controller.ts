import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarCategoriasDto } from './dto/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('categorias')
export class CategoriasController {
  constructor() {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriasDto,
  ): Promise<Categoria> {}
}
