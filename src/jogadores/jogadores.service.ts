import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/creiaJogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private logger = new Logger(JogadoresService.name);

  constructor(@InjectModel('Jogador') private jogadorModel: Model<Jogador>) {}

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorExist = this.jogadorModel.findOne({ email }).exec();
    console.log(jogadorExist);

    if (!jogadorExist) {
      this.criar(criarJogadorDto);
    } else {
      this.atualizar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogador(email: string): Promise<Jogador> {
    return await this.jogadorEncontrado(email);
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadorEncontrado(email);
    if (!jogadorEncontrado) {
      throw new NotFoundException('Jogador não existe!');
    }

    await this.jogadorModel.remove({ email }).exec();
  }

  private async jogadorEncontrado(email: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ email }).exec();

    return jogador;
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    console.log(jogadorCriado);
    await jogadorCriado.save();
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<void> {
    await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }
}
