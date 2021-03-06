import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/creiaJogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizarJoagador.dto';

@Injectable()
export class JogadoresService {
  private logger = new Logger(JogadoresService.name);

  constructor(@InjectModel('Jogador') private jogadorModel: Model<Jogador>) {}

  async CriarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorExist = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorExist) {
      throw new BadRequestException(
        `Jogador com email ${email} já cadastrato!`,
      );
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);

    return await jogadorCriado.save();
  }

  async AtualizarJogador(
    _id,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorExist = await this.buscaJogador(_id);

    if (!jogadorExist) {
      throw new NotFoundException(`Jogador com ${_id} não encontrado!`);
    }
    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.buscaJogador(_id);
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<void> {
    const jogadorExist = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorExist) {
      throw new NotFoundException('Jogador não existe!');
    }

    await this.jogadorModel.deleteOne({ _id }).exec();
  }

  private buscaJogador(_id: string): Promise<Jogador> {
    return this.jogadorModel.findOne({ _id }).exec();
  }
}
