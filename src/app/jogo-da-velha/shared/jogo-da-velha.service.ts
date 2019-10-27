import { Injectable } from '@angular/core';

@Injectable()
export class JogoDaVelhaService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly VAZIO: number = 0;

  private tabuleiro: any;
  private numMovimentos: number;
  private vitoria: any;
  private resultado1: any;
  private resultado2: any;


  private _jogador: number;
  private _showInicio: boolean;
  private _showTabuleiro: boolean;
  private _showFinal: boolean;


  constructor() { }
  /** 
  *inicializer o jogo. Define exibição de tela Incial*
  /** 
   * @return void
   */
  inicializar(): void {
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numMovimentos = 0;
    this._jogador = this.X;
    this.vitoria = false;
    this.resultado1 = 0;
    this.resultado2 = 0;
    this.inicializarTabuleiro();

  }

  /**
   * inicializa o tabuleiro do jogo com vaio para todas
   * as posições
   * 
   * @return void 
   */

  inicializarTabuleiro(): void {
    this.tabuleiro = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO];
    }
  }
  /**
   * retorna se a tela de inicio deve ser exibida.
   * @return boolean
   */


  get showInicio(): boolean {
    return this._showInicio;
  }
  /**
   * retorna se o tabuleiro deve ser exibido.
   * 
   * @return boolean
   */
  get showTabuleiro(): boolean {
    return this._showTabuleiro;
  }
  /**
 * retorna se a tela de fim de jogo deve ser exibida.
 * 
 * @return boolean
 */
  get showFinal(): boolean {
    return this._showFinal;
  }
  /**
 * retorna o número do jogador a jogar.
 * 
 * @return boolean
 */
  get jogador(): number {
    return this._jogador;

  }
  /**
   * Exibe o tabuleiro.
   * 
   * @return boolean
   */
  iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;

  }
  /**
 * realiza uma jogada dado as coordenadas do tabuleiro.
 * 
 * @param number posX
 *  @param number posY
 * @return void
 */
  jogar(posX: number, posY: number): void {
    // jogada invalida
    if (this.tabuleiro[posX][posY] !== this.VAZIO ||
      this.vitoria) {
      return;
    }
    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimentos++;
    this.vitoria = this.fimJogo(posX, posY,
      this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.X) ? this.O : this.X;


    if (!this.vitoria && this.numMovimentos < 9) {
      this.jogarO(posX, posY);
    }
    //houve vitoria
    if (this.vitoria !== false) {
      this._showFinal = true;
      this.resultado1 = this.resultado1 + 1;
    }
    // empate
    if (!this.vitoria && this.numMovimentos === 9) {
      this._jogador = 0;
      this._showFinal = true;
    }
  }

  jogarO(posX: number, posY: number): void {
    // jogada invalida
    if (this.tabuleiro[posX][posY] !== this.VAZIO ||
      this.vitoria) {
      return;
    }
    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimentos++;
    this.vitoria = this.fimJogo(posX, posY,
      this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.O) ? this.X : this.O;


    if (!this.vitoria && this.numMovimentos < 9) {
      this.jogar(posX, posY);
    }
    //houve vitoria
    if (this.vitoria !== false) {
      this._showFinal = true;
      this.resultado2 = this.resultado2 + 1;
    }
    // empate
    if (!this.vitoria && this.numMovimentos === 9) {
      this._jogador = 0;
      this._showFinal = true;
    }
  }
  /**
   * 
   * @param number linha
   * @param number coluna
   * @param any tabuleiro
   * @param number jogador
   * @retrun array
   * 
   */
  fimJogo(linha: number, coluna: number,
    tabuleiro: any, jogador: number) {
    let fim: any = false;
    // valida a linha
    if (tabuleiro[linha][0] === jogador &&
      tabuleiro[linha][1] === jogador &&
      tabuleiro[linha][2] === jogador) {
      fim = [[linha, 0], [linha, 1], [linha, 2]];
    }
    // valida a coluna 
    if (tabuleiro[0][coluna] === jogador &&
      tabuleiro[1][coluna] === jogador &&
      tabuleiro[2][coluna] === jogador) {
      fim = [[0, coluna], [1, coluna], [2, coluna]];
    }

    // valida a diagonais 
    if (tabuleiro[0][0] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][2] === jogador) {
      fim = [[0, 0], [1, 1], [2, 2]];
    }

    // valida a diagonais 
    if (tabuleiro[0][2] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][0] === jogador) {
      fim = [[0, 2], [1, 1], [2, 0]];
    }
    return fim;
  }
  /**
   * obtem uma jogada valida para vitoria de um jogador.
   * 
   * @param number jogador
   * @retrun nomber[]
   * 
   */
  obterJogada(jogador: number): number[] {
    let tab = this.tabuleiro;
    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.VAZIO) {
          continue;
        }
        tab[lin][col] = jogador;
        if (this.fimJogo(lin, col, tab, jogador)) {
          return [lin, col];
        }
        tab[lin][col] = this.VAZIO;
      }
    }
    return [];
  }

  /**
   * retorma se a peça x deve ser exibida para 
   * coordena informada.
   * 
   * @param number posX
   * @param number posY
   * @return boolean
   * 
   */
  exibirX(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.X;

  }
  /**
   * retorna se a peça O deve ser exebida para a 
   * coordena informada.
   * 
   * @param number posX
   * @param number posY
   * @return boolean
   */

  exibirO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.O;

  }
  /**
     * retorna se a peça O deve ser exebida para a 
     * coordena informada.
     * 
     * @param number posX
     * @param number posY
     * @return boolean
     */
  exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
      return exibirVitoria;
    }
    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }
    return exibirVitoria;

  }

  /**
   * inicaliza um novo jogo, assim como exibe o tabuleiro.
   * 
   * @return void
  

   */
  novoJogo(): void {
    this.inicializar();
    this._showFinal = false;
    this._showInicio = false;
    this._showTabuleiro = true;

  }
}
