import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/creiaJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadorService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadorService.criarAtualizarJogador(criarJogadorDto);
    return JSON.stringify({ message: 'sucess' });
  }

  @Get()
  async consultaJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadorService.consultarJogador(email);
    } else {
      return await this.jogadorService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deletarJogador(@Query('email') email: string) {
    await this.jogadorService.deletarJogador(email);
    return JSON.stringify({ message: 'sucess' });
  }
}
