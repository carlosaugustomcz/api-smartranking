import { Document } from 'mongoose';

export interface Jogador extends Document {
  telefone: string;
  email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
