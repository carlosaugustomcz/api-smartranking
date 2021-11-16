import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty()
  telefone: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  nome: string;
}
