/**
 * =============================================================
 *  Desafio — Validador de Sudoku
 *  Workshop de Lógica · Sistemas de Informação
 * =============================================================
 *
 *  Objetivo: implementar a função `validar` abaixo para que TODOS
 *  os testes em ./tests.ts passem (fiquem verdes).
 *
 *  Para rodar os testes:
 *    npm test
 *
 *  Fluxo TDD recomendado:
 *    1. Rode os testes. Veja o que falha.
 *    2. Implemente o suficiente para passar nos testes Bronze.
 *    3. Os testes Prata vão te dizer o que falta. Implemente.
 *    4. Os testes Ouro vão pedir ainda mais. Implemente.
 *    5. Quando tudo estiver verde, refatore.
 *
 *  Cada nível dos testes desafia uma CAPACIDADE da função:
 *    Bronze → validar linhas e colunas
 *    Prata  → validar quadrantes 3x3
 *    Ouro   → aceitar tabuleiros incompletos (com zeros)
 *
 *  Regras do Sudoku (lembrete):
 *    - Cada linha contém os dígitos 1..9 sem repetição
 *    - Cada coluna contém os dígitos 1..9 sem repetição
 *    - Cada quadrante 3x3 contém os dígitos 1..9 sem repetição
 *    - Casas com 0 representam células vazias (Ouro)
 * =============================================================
 */

// Um tabuleiro é uma matriz 9x9 de inteiros (0 = casa vazia, 1..9 = preenchida)
export type Board = number[][];

/**
 * Retorna true se o tabuleiro é um Sudoku válido, false caso contrário.
 *
 * Um tabuleiro é válido quando nenhuma regra do Sudoku é quebrada nas
 * células já preenchidas. Casas vazias (0) são ignoradas.
 */
export function validar(board: Board): boolean {
  // TODO: implementar
  return false;
}
