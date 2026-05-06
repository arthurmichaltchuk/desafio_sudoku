# Desafio — Validador de Sudoku

Workshop de Desenvolvimento · Sistemas de Informação

[Apresentação em slides](https://docs.google.com/presentation/d/1_U-MdWo8Z3iAtZkBbMa80ZuITXnv2mUDacXNGIF-OuU/edit?usp=sharing)

---

## O que é isso

Este é o pacote inicial do desafio. Você recebe os **testes prontos** e a sua missão é escrever a **lógica que faz os testes passarem**, usando o ciclo do TDD: rodar, ver o vermelho, codar, ver o verde, refatorar.

## Pré-requisitos

- Node.js 18 ou superior
- npm (vem com o Node)

## Como começar

```bash
npm install
npm test
```

Na primeira execução, vários testes vão falhar. **Isso é normal** — é o "Red" do TDD. Sua tarefa é fazer cada teste virar verde.

## Estrutura do projeto

```
desafio_sudoku_starter/
├── src/
│   ├── desafio.ts    # ← VOCÊ EDITA AQUI
│   └── tests.ts      # ← não mexer
├── package.json
├── tsconfig.json
└── README.md
```

## O que fazer

Abra `src/desafio.ts`. Você vai encontrar **uma única função** para implementar:

```typescript
function validar(board: Board): boolean
```

Ela deve retornar `true` se o tabuleiro é um Sudoku válido e `false` caso contrário.

## Os testes estão organizados em níveis

Cada nível desafia uma capacidade adicional da sua função `validar`:

| Nível | Pontos | O que está sendo testado |
|-------|--------|--------------------------|
| Bronze | 30 | Validação de **linhas e colunas** |
| Prata  | 30 | Validação dos **quadrantes 3×3** |
| Ouro   | 40 | Suporte a **tabuleiros incompletos** (com zeros) |

Você implementa **uma função só**. Os níveis representam a evolução da sua implementação:

1. Comece validando linhas e colunas → **Bronze fica verde**
2. Adicione validação dos quadrantes → **Prata fica verde**
3. Aceite zeros como casas vazias → **Ouro fica verde**

## Fluxo recomendado (TDD)

1. Rode `npm test`. Veja o que falha.
2. Implemente o **mínimo** para os testes Bronze passarem. Rode de novo.
3. Quando Bronze ficar verde, os testes Prata vão te dizer o que falta.
4. Quando Prata ficar verde, os testes Ouro vão pedir mais.
5. Tudo verde? **Refatore.** Limpe nomes, extraia funções repetidas, melhore.
6. Os testes continuam verdes? Você terminou.

## Regras do desafio

- Sem IA. Sem ChatGPT, Copilot, Claude.
- Trabalho em equipe é incentivado.
- Defesa oral obrigatória ao final.

Boa sorte.
