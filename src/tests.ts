/**
 * =============================================================
 *  Testes do Desafio — Validador de Sudoku
 * =============================================================
 *
 *  Não edite este arquivo. Implemente a função `validar` em
 *  ./desafio.ts e rode `npm test` para ver os resultados.
 *
 *  Os testes estão agrupados por NÍVEL (Bronze, Prata, Ouro).
 *  Cada nível desafia uma capacidade adicional da sua função:
 *    Bronze → linhas e colunas
 *    Prata  → quadrantes 3x3
 *    Ouro   → tabuleiros incompletos (com zeros)
 * =============================================================
 */

import { validar, type Board } from "./desafio.ts";

// -------------------------------------------------------------
//  Mini test runner (sem dependências externas)
// -------------------------------------------------------------

const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  red:    "\x1b[31m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  cyan:   "\x1b[36m",
  gray:   "\x1b[90m",
};

type TestResult = { nome: string; passou: boolean; erro?: string };
const resultadosPorSecao: Record<string, TestResult[]> = {};
let secaoAtual = "Geral";

function section(nome: string): void {
  secaoAtual = nome;
  if (!resultadosPorSecao[nome]) resultadosPorSecao[nome] = [];
  console.log(`\n${c.bold}${c.cyan}${"━".repeat(60)}${c.reset}`);
  console.log(`${c.bold}${c.cyan}  ${nome}${c.reset}`);
  console.log(`${c.bold}${c.cyan}${"━".repeat(60)}${c.reset}`);
}

function test(nome: string, fn: () => void): void {
  try {
    fn();
    resultadosPorSecao[secaoAtual].push({ nome, passou: true });
    console.log(`  ${c.green}✓${c.reset} ${nome}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    resultadosPorSecao[secaoAtual].push({ nome, passou: false, erro: msg });
    console.log(`  ${c.red}✗${c.reset} ${nome}`);
    console.log(`    ${c.dim}${msg}${c.reset}`);
  }
}

function expect<T>(actual: T) {
  return {
    toBe(expected: T): void {
      if (actual !== expected) {
        throw new Error(
          `Esperado ${c.green}${JSON.stringify(expected)}${c.reset}, ` +
          `recebido ${c.red}${JSON.stringify(actual)}${c.reset}`
        );
      }
    },
  };
}

// -------------------------------------------------------------
//  Casos de teste (tabuleiros)
// -------------------------------------------------------------

// CASO 01 — Tabuleiro completo válido
const caso01: Board = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

// CASO 02 — Linhas com repetição (linha 0 e linha 7)
const caso02: Board = [
  [5, 3, 4, 6, 7, 8, 9, 1, 5], // dois 5s
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 2], // dois 2s
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

// CASO 03 — Coluna com repetição (última coluna tem dois 5s)
const caso03: Board = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 5],
];

// CASO 04 — Tabuleiro incompleto e válido
const caso04: Board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// CASO 05 — Tabuleiro incompleto e inválido (coluna 0 com dois 5s)
const caso05: Board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [5, 0, 0, 0, 8, 0, 0, 7, 9],
];

// CASO 06 — Quadrado latino: linhas e colunas válidas, quadrantes inválidos
// Pega quem só validou linhas e colunas e esqueceu dos quadrantes.
const caso06: Board = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
];

// -------------------------------------------------------------
//  EXECUÇÃO DOS TESTES
// -------------------------------------------------------------

console.log(`\n${c.bold}${c.yellow}╔════════════════════════════════════════════════════════════╗${c.reset}`);
console.log(`${c.bold}${c.yellow}║  DESAFIO — VALIDADOR DE SUDOKU                             ║${c.reset}`);
console.log(`${c.bold}${c.yellow}║  Workshop de Desenvolvimento · Sistemas de Informação      ║${c.reset}`);
console.log(`${c.bold}${c.yellow}╚════════════════════════════════════════════════════════════╝${c.reset}`);

// ====== BRONZE — linhas e colunas ======
section("NÍVEL BRONZE — Linhas e colunas (30 pts)");

test("Caso 01 — tabuleiro completo válido", () => {
  expect(validar(caso01)).toBe(true);
});

test("Caso 02 — linhas com repetição", () => {
  expect(validar(caso02)).toBe(false);
});

test("Caso 03 — coluna com repetição", () => {
  expect(validar(caso03)).toBe(false);
});

// ====== PRATA — quadrantes 3x3 ======
section("NÍVEL PRATA — Quadrantes 3x3 (30 pts)");

test("Caso 06 — linhas e colunas ok, mas quadrantes inválidos", () => {
  expect(validar(caso06)).toBe(false);
});

// ====== OURO — tabuleiros incompletos ======
section("NÍVEL OURO — Tabuleiros incompletos com zeros (40 pts)");

test("Caso 04 — incompleto e válido", () => {
  expect(validar(caso04)).toBe(true);
});

test("Caso 05 — incompleto com violação", () => {
  expect(validar(caso05)).toBe(false);
});

// -------------------------------------------------------------
//  RELATÓRIO FINAL
// -------------------------------------------------------------

console.log(`\n${c.bold}${c.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
console.log(`${c.bold}${c.yellow}  RESUMO${c.reset}`);
console.log(`${c.bold}${c.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);

let totalPassou = 0;
let totalFalhou = 0;
for (const [secao, results] of Object.entries(resultadosPorSecao)) {
  const passou = results.filter(r => r.passou).length;
  const total = results.length;
  totalPassou += passou;
  totalFalhou += total - passou;
  const cor = passou === total ? c.green : (passou === 0 ? c.red : c.yellow);
  const status = passou === total ? "✓" : "·";
  console.log(`  ${cor}${status} ${secao.padEnd(50)} ${passou}/${total}${c.reset}`);
}

const totalGeral = totalPassou + totalFalhou;
console.log(`\n  ${c.bold}TOTAL: ${totalPassou}/${totalGeral} testes passaram${c.reset}`);

if (totalFalhou === 0) {
  console.log(`\n  ${c.bold}${c.green}🎉 Tudo verde! Hora do refactor.${c.reset}\n`);
} else {
  console.log(`\n  ${c.dim}Continue codando. Faltam ${totalFalhou} para o verde total.${c.reset}\n`);
  process.exit(1);
}
