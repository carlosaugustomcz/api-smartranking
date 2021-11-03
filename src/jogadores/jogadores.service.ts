import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/creiaJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadorEncontrado(email);

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogador(email: string): Promise<Jogador> {
    return this.jogadorEncontrado(email);
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadorEncontrado(email);
    if (!jogadorEncontrado) {
      throw new NotFoundException('Jogador não existe!');
    }

    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }

  private jogadorEncontrado(email: string): Jogador {
    const jogador = this.jogadores.find((jogador) => jogador.email === email);

    return jogador;
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefone } = criarJogadorDto;

    const id = uuidV4();

    const jogador: Jogador = {
      id,
      nome,
      email,
      telefone,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: '',
    };

    this.jogadores.push(jogador);

    this.logger.log(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
