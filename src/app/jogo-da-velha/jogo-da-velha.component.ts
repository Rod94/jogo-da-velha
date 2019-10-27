import { Component, OnInit } from '@angular/core';
import { JogoDaVelhaService } from './shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent implements OnInit {
    public jogador1="";
    public jogador2="";
    public resultado1 = 0;
    public resultado2 = 0;
  
  constructor(private jogoDaVelhaService: JogoDaVelhaService) { }

  montarJogador1(jogador1:string){
    this.jogador1 = jogador1;

  }
  montarJogador2(jogador2:string){
    this.jogador2 = jogador2;
  }

  montarResultado1(resultado1:number){
    this.resultado1 = resultado1;
  }
  montarResultado2(resultado2:number){
    this.resultado2 = resultado2;
  }
  ngOnInit() {
    this.jogoDaVelhaService.inicializar();
  }
  
 
  
  
  
  /**
   * retorna se a tela de inicio deve ser exibida.
   * 
   * @return boolean
   */
   get showInicio():boolean{
    return this.jogoDaVelhaService.showInicio;
    /**
   * retorna se o tabuleiro deve ser exibida.
   * 
   * @return boolean
   */
  }
   get showTabuleiro():boolean {
    return this.jogoDaVelhaService.showTabuleiro;
  }
    /**
   * retorna se a tela de fim de jogo deve ser exibida.
   * 
   * @return boolean
   */
    get showFinal():boolean{
      return this.jogoDaVelhaService.showFinal;

      }
  /**
   * inicializa os dados de um novo jogo.
   * 
   * @return void
   */
  iniciarJogo():void {
    this.jogoDaVelhaService.iniciarJogo();
  }  
/**
 * realiza uma jogada ao clicar um local no tabuleiro.
 * 
 * @param number posX
 * @param number posY
 * @return void
 * 
 */
  jogar(posX: number, posY: number): void{
    this.jogoDaVelhaService.jogar(posX, posY);
  }
  jogarO(posX: number, posY: number): void{
    this.jogoDaVelhaService.jogarO(posX, posY);
  }
/**
 * 
 * retrona se a peça x deve ser exibida para 
 * coordena informada.
 * 
 * @param number posX
 * @param number posY
 * @return boolena
 * 
 */
  exibirX(posX:number, posY:number):boolean {
   return this.jogoDaVelhaService.exibirX(posX, posY);
  }
/**
 * 
 * retorna se a peça O deve ser exibida para a
 * cordenada informada
 * 
 * @param number posX
 * @param number posY
 * @return  boolena
*/
exibirO(posX: number, posY: number): boolean{
  return this.jogoDaVelhaService.exibirO(posX, posY);

} 
exibirVitoria(posX: number, posY: number): boolean{
  return this.jogoDaVelhaService.exibirVitoria(posX, posY);
}

get jogador(): number {
  return this.jogoDaVelhaService.jogador;
}
novoJogo(): void {
  this.jogoDaVelhaService.novoJogo();
}
}
