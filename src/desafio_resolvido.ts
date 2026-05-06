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


// V2: função para verificar se um array tem valores repetidos (ignorando zeros)
function duplicou(array: number[]): boolean {
  const semzeros = array.filter(x => x !== 0);
  const set = new Set(semzeros);

  const temDuplicados = set.size !== semzeros.length;

  return temDuplicados;
}

export function validar(board: Board): boolean {

  // Validar linhas
  for (let i = 0; i < 9; i++) {
    const linha = board[i];

    // V1: usando Set
    // const linhaSet = new Set(linha);
    // if (linhaSet.size !== 9) {...

    if (duplicou(linha)) {
      return false;
    }
  }

  // Validar colunas
  for (let j = 0; j < 9; j++) {
    // console.log(`  Verificando coluna ${j}...`);
    const coluna = board.map(row => row[j]);

    // V1: usando Set
    // const colunaSet = new Set(coluna);
    // if (colunaSet.size !== 9) {...

    if (duplicou(coluna)) {
      console.log(`    ERRO: Coluna ${j} tem valores repetidos!`);
      return false;
    }
  }

  // Validar quadrantes 3x3
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      // console.log(`  Verificando quadrante (${boxRow}, ${boxCol})...`);
      const boxValues = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          boxValues.push(board[boxRow * 3 + i][boxCol * 3 + j]);
        }
      }

      // V1: usando Set
      // const boxSet = new Set(boxValues);
      // if (boxSet.size !== 9) {...

      if (duplicou(boxValues)) {
        return false;
      }
    }
  }

  return true;
}
