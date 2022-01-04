import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizarCategoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncotrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncotrada) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
    }

    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async consultarTodasCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel.find().exec();
  }

  async consultarCategoriasId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new BadRequestException(`Categoria não existe!`);
    }

    return categoriaEncontrada;
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ) {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new BadRequestException(`Categoria não existe!`);
    }

    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto })
      .exec();
  }

  async atribuirCategoriaJogador(params: string[]) {
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];

    console.log(categoria);
    console.log(idJogador);

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    //const jogadorEncontrado = await this.

    if (!categoriaEncontrada) {
      throw new BadRequestException(`Categoria não existe!`);
    }

    categoriaEncontrada.jogadores.push(idJogador);

    await this.categoriaModel
      .findByIdAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();
  }
}
