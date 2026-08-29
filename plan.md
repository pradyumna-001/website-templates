# Relatório de Prospecção B2B — Região dos Lagos, RJ

**Objetivo:** avaliar e planejar prospecção de freelas de desenvolvimento de software em três mercados da Região dos Lagos — empresas de crédito, corretoras de seguros e estúdios de tatuagem — usando o case da integração feita para a Granapramim como ponto de partida.

---

## 1. Mercado de Crédito / Correspondentes Bancários

### 1.1 Contexto
Prady já fez uma integração de API de crédito com bancos para a **Granapramim** (correspondente bancário focado em consignado, FGTS e empréstimo com garantia). Esse case é a prova social de entrada nesse mercado.

### 1.2 Empresas mapeadas (via Google Places)

| Empresa | Cidade | Perfil |
|---|---|---|
| UnaCred Correspondente Bancário | Cabo Frio (Unamar) | Independente |
| Commerx Class Correspondente Caixa Aqui | Cabo Frio (Unamar) | Independente |
| Aprova Crédito Cabo Frio | Cabo Frio | Independente |
| Financiatta | Cabo Frio | Independente |
| GM Cred Empréstimo Consignado | Cabo Frio | Independente |
| Cred Money Cabo Frio | Cabo Frio | Independente |
| NG Cred | Cabo Frio (Unamar) | Independente |
| Crefisa | Cabo Frio | Filial de rede |
| Crefaz | Cabo Frio | Filial de rede |
| CredFácil | Araruama | Independente |
| Aracred Soluções Financeiras | Araruama | Independente |
| Socinal Financeira S.A. | Araruama | Filial |
| Crefaz | Araruama | Filial de rede |
| Correspondente Banco BMG | São Pedro da Aldeia | Filial |
| Caixa Aqui Rio das Ostras | Rio das Ostras | Correspondente Caixa |
| BMG Búzios | Armação dos Búzios | Filial |
| Atitude Correspondente Bancário | Saquarema (Vilatur) | Independente |

**Total mapeado:** ~20 empresas | **Perfil-alvo (independentes, sem TI própria):** ~14

### 1.3 Problemas identificados → soluções

| # | Problema | Solução proposta |
|---|---|---|
| 1 | Cada banco tem sistema/API próprio; atendente redigita os mesmos dados em cada portal, sem visão unificada de status | Hub de integração multi-banco (escopo reduzido: 2-3 bancos que o cliente já usa) |
| 2 | Não dá pra saber se o cliente tem margem consignável antes de tentar vender | Consulta automática de margem/elegibilidade (INSS, eSocial, folha) |
| 3 | Cliente abandona sozinho a etapa de autenticação Gov.br/biometria (exigência nova de 2025/26) e o correspondente perde a venda sem saber que travou | Monitor de funil com alerta automático de abandono |
| 4 | Comissão de cada banco tem regra/prazo diferente; reconciliação manual gera perda de receita invisível | Reconciliação automática de comissões |
| 5 | Falta trilha auditável por operação, exigida pelas normas de autorregulação/MCB | Log estruturado de compliance |
| 6 | Time comercial perde tempo qualificando lead frio e conferindo documento incompleto | Triagem automatizada de lead (WhatsApp) e documento (OCR + IA) |

### 1.4 Existe solução pronta?
**Sim** — Celcoin, Teddy Digital, CB Negocial, LiveCred e ConsigPro já atendem esse setor com esteiras completas e integração multibanco.

**Por que as pequenas ainda não usam:**
- Preço/modelo de contrato de SaaS enterprise não cabe no porte de uma operação de 3-5 pessoas
- Credenciamento com cada banco continua sendo manual mesmo com a plataforma — não elimina a fricção real
- Fricção de venda B2B corporativa não chega/prioriza correspondentes de cidade pequena
- Inércia e desconhecimento de que essa categoria de produto existe pra esse porte

### 1.5 Diferencial competitivo
Não é escala nem robustez de suporte — é **custo, proximidade e ajuste fino ao negócio específico**. Riscos honestos a admitir: ponto único de falha (você), falta de track record no nicho ainda, manutenção contínua recai só sobre você.

### 1.6 Precificação de referência (por projeto fechado)

| Solução | Faixa de preço |
|---|---|
| Triagem de lead via WhatsApp | R$ 2.500 – R$ 6.000 |
| Reconciliação automática de comissões | R$ 3.000 – R$ 7.000 |
| Monitor de funil com alerta de abandono | R$ 4.000 – R$ 10.000 |
| Log estruturado de compliance | R$ 3.000 – R$ 8.000 |
| Triagem de documento (OCR + IA) | R$ 5.000 – R$ 12.000 |
| Hub de integração (2-3 bancos) | R$ 8.000 – R$ 25.000+ |

---

## 2. Mercado de Corretoras de Seguros

### 2.1 Contexto
Prady já tem dois projetos próprios relevantes: **BrokerAI** (multi-agente WhatsApp para renovação de apólice e sinistros, FastAPI/LangGraph/React) e **MindGraph AI** (memória cognitiva em grafo para corretores de seguros). Isso muda o pitch de "vou resolver seu problema" para "já tenho o sistema funcionando, adapto pra sua operação".

### 2.2 Empresas mapeadas

| Empresa | Cidade |
|---|---|
| GTH Corretora de Seguros | Cabo Frio |
| Luiz Alberto Seguros | Cabo Frio |
| CampoSure Corretora de Seguros | Cabo Frio |
| Greccomovel Corretora de Seguros | Cabo Frio |
| Assura Seguros | Cabo Frio |
| Região dos Lagos Corretora de Seguros | Cabo Frio |
| VellSeg Corretora de Seguros | Araruama |
| Helui Consultoria Corretora de Seguros | Araruama |
| Cardozo Seguros | Araruama |
| KRD Corretora de Seguros | Iguaba Grande |
| Alfa Corretora de Seguros | São Pedro da Aldeia |
| Qualicorp / Vendy Seguros | São Pedro da Aldeia |
| Nova Gol Corretora Região dos Lagos | São Pedro da Aldeia |
| Bossan Corretora de Seguros | Rio das Ostras |
| É Seguro Corretora | Rio das Ostras |
| IBRALIFE Corretora | Rio das Ostras |
| VOX Seguros | Rio das Ostras |
| Garapa Corretora de Seguros | Armação dos Búzios |
| Saqualagos Corretora de Seguros | Saquarema |
| Müller Seguros | Saquarema |
| Macrini Corretora de Seguros | Saquarema |
| RA Corretora e Adm de Seguros | Saquarema |

**Total mapeado:** ~22 corretoras | **Perfil-alvo (excluindo grandes redes como Qualicorp):** ~18

### 2.3 Problemas identificados → soluções

| # | Problema | Solução | Base própria já existente? |
|---|---|---|---|
| 1 | Renovação de apólice esquecida — controle ainda em planilha/caderno | Alertas automáticos de renovação via WhatsApp | **Sim — BrokerAI** |
| 2 | Cliente some entre a venda e o sinistro, perdendo vínculo de confiança | Contato proativo automatizado, não só cobrança | Parcial — depende do MindGraph AI |
| 3 | Atendimento lento no momento do sinistro (momento mais crítico da relação) | Assistente que orienta os primeiros passos do sinistro | **Sim — BrokerAI** |
| 4 | Relacionamento com o cliente fica na cabeça/WhatsApp pessoal do corretor — se ele sai, o histórico vai junto | Memória de relacionamento centralizada | **Sim — MindGraph AI** |
| 5 | Objeção recorrente ("por que subiu se não usei?") sem resposta padronizada | Módulo de conteúdo automatizado dentro do fluxo de renovação | Não mapeado, fácil de adicionar |
| 6 | Falta métrica de carteira (taxa de renovação, LTV, sinistralidade) | Dashboard simples com esses indicadores | Depende dos dados dos itens 1 e 4 |

### 2.4 Existe solução pronta?
**Sim** — Agger (líder de mercado, presente em 95% dos municípios brasileiros), Quiver e Segfy (a partir de R$119/mês) já atendem esse setor.

### 2.5 Priorização de contato (por sinal de volume + ausência de site)

1. **KRD Corretora de Seguros** (Iguaba Grande) — 198 reviews, sem site próprio
2. **CampoSure** (Cabo Frio) — 57 reviews, carteira estabelecida/recorrente
3. **GTH Corretora** (Cabo Frio) — 19 reviews, sem site, atendimento pessoal forte
4. **Bossan Corretora** (Rio das Ostras) — 30 reviews, sem site, forte em suporte de sinistro

*Candidatas maiores (Helui, Qualicorp/Vendy) ficam pra depois, com pitch de complemento, não substituição.*

---

## 3. Mercado de Estúdios de Tatuagem

### 3.1 Contexto
Prady já tem um freela em andamento com o estúdio de uma amiga, explorando ferramenta financeira e de gestão de clientes — esse projeto serve como piloto/case antes de abordar outros estúdios.

### 3.2 Empresas mapeadas (amostra — ~35 no total)

| Empresa | Cidade | Reviews |
|---|---|---|
| Lucas Tattoo Búzios | Armação dos Búzios | 780 |
| Shamanz Tattoo | Armação dos Búzios | 739 |
| Namasté Arte & Tattoo | São Pedro da Aldeia | 277 |
| Montra Tattoo Studio | Saquarema | 100 |
| Iury Petter Tattoo Studio / FreeHand | Cabo Frio | 94–96 |
| Saquapiercing | Saquarema | 162 |
| Brother Tattoo | Armação dos Búzios | 152 |
| Paula Tattoo | Armação dos Búzios | 95 |
| abduzidos studio | Cabo Frio | 90 |
| ARARA TATTOO STUDIO | Araruama | 60 |
| Xileno Tattoo Studio | Cabo Frio | 63 |
| Audaz Tattoo Studio | Araruama | 68 |
| Juy | Tattoo & Piercing Studio | Araruama | 58 |
| Don Corleone Tattoo | Rio das Ostras | 46 |
| Saquá Ink Tattoo Studio | Saquarema | 71 |
| *(+ ~20 estúdios adicionais mapeados, majoritariamente sem site)* | | |

**Total mapeado:** ~35 estúdios | **Perfil-alvo (autônomos/pequenos, sem site):** ~30

### 3.3 Padrão identificado
Quase nenhum estúdio tem site próprio — a esmagadora maioria opera 100% via Instagram/WhatsApp. É o mercado mais "manual" dos três, e o único onde **ausência de site é o próprio problema**, não apenas um gancho de entrada.

### 3.4 Problemas identificados → soluções

| # | Problema | Solução |
|---|---|---|
| 1 | Agendamento inteiro por DM/WhatsApp, sem agenda centralizada | Site com calendário de agendamento / vitrine + botão WhatsApp |
| 2 | Portfólio espalhado só no Instagram | Site com portfólio categorizado por estilo/tatuador |
| 3 | Sem controle financeiro estruturado (muitos autônomos sem CNPJ) | Ferramenta simples de controle de sessões/pagamentos |
| 4 | Falta de comparecimento (no-show) sem custo de reserva | Confirmação + lembrete automático via WhatsApp |
| 5 | Reputação depende 100% de review espontâneo | Fluxo automatizado de solicitação de review pós-sessão |

### 3.5 Precificação de referência
Ticket bem menor que os outros dois mercados: **R$ 1.500 – R$ 4.000** por projeto (site institucional + agendamento simples).

---

## 4. Comparativo de mercado (TAM / SAM / SOM adaptado)

| | Crédito | Seguros | Tatuagem |
|---|---|---|---|
| **TAM** (mapeado) | ~20 empresas | ~22 corretoras | ~35 estúdios |
| **SAM** (perfil-alvo) | ~14 | ~18 | ~30 |
| **Ticket médio/projeto** | ~R$ 8.000 (R$2,5k–25k+) | ~R$ 6.000–10.000 (estimado) | ~R$ 2.500 (R$1,5k–4k) |
| **Ciclo de venda + entrega** | Longo (diagnóstico presencial, integração bancária, meses) | Longo/médio | Curto (semanas) |
| **SOM realista (12 meses, part-time)** | 3–5 clientes → R$ 24k–40k | 3–5 clientes → R$ 18k–50k | 8–12 clientes → R$ 20k–30k |

**Leitura:**
- Seguros tem a melhor relação esforço/retorno — Prady já tem produto pensado (BrokerAI, MindGraph AI), o que encurta o ciclo de venda.
- Tatuagem tem o menor SOM em receita, mas é o único mercado cujo ciclo curto cabe de fato no tempo livre real disponível (turnos de garçom + projeto principal de AI Engineer).
- Nenhum dos três substitui a fonte de renda principal — são complementares.

---

## 5. Estratégia geral consolidada

### 5.1 Decisões tomadas
- Abordar os três mercados começando por **estúdios de tatuagem sem site**.
- Construir um site pronto pra cada empresa-alvo e usar como gancho de contato ("olha o que eu fiz pra você").
- Em tatuagem, a negociação pode parar no site (produto completo em si).
- Em crédito e seguros, o site é porta de entrada para uma conversa sobre solução mais profunda.
- Cobrar por desenvolvimento no primeiro cliente de cada mercado; migrar pra modelo de mensalidade (SaaS) nos próximos — **mas só arquitetar como SaaS se o problema se mostrar minimamente escalável** entre clientes (padrão repetido, não particularidade de um único cliente).
- Aceitar que o primeiro cliente pague abaixo do valor de mercado, em troca do case real pra usar nas próximas abordagens.

### 5.2 Diferencial competitivo (por que contratar Prady e não um SaaS grande)
Não é escala ou robustez de suporte 24/7 — é **custo baixo, ausência de lock-in de contrato, proximidade local e ajuste fino ao fluxo real daquele negócio específico**. Riscos honestos a manter em mente: ponto único de falha, falta de track record inicial, manutenção contínua recai só sobre uma pessoa.

---

## 6. Plano detalhado — do início ao fim (incluindo hipotético)

### Fase 0 — Preparação (antes do primeiro contato)
- Construir 1 template forte por nicho (tatuagem primeiro), reutilizável e rápido de popular com dados reais (nome, fotos do Google, endereço, portfólio) — evita reconstruir do zero a cada abordagem.
- Definir lista de alvos prioritários em tatuagem: estúdios com mais reviews e sem site (Lucas Tattoo e Shamanz Tattoo em Búzios, Namasté em São Pedro da Aldeia, Montra em Saquarema, Iury Petter/FreeHand em Cabo Frio).

### Fase 1 — Outreach em tatuagem (validação da mecânica)
- Construir o site de 3-5 estúdios-alvo usando o template.
- Contato direto (WhatsApp/Instagram) mostrando o site pronto — "olha o que eu fiz pra você".
- Medir taxa de resposta e taxa de conversão em venda.
- **Ponto de decisão:** se a mecânica de "chegar com produto pronto" converter bem aqui, replicar para os outros dois mercados. Se não converter, revisar abordagem antes de escalar esforço.

### Fase 2 — Primeiro cliente pago (tatuagem)
- Fechar com o primeiro estúdio dispensado a pagar valor reduzido.
- Entregar o site + (se fizer sentido) módulo de agendamento/controle financeiro simples.
- Documentar o resultado (tempo economizado, redução de no-show, etc.) como material de prova social.
- Avaliar, com base em mais de um cliente, se os problemas se repetem de forma parecida o suficiente pra justificar generalizar o sistema como SaaS.

### Fase 3 — Replicação em seguros
- Usar o case de tatuagem (mesmo sendo de outro nicho) como prova de execução ("já entreguei X pra outro negócio").
- Abordar KRD, CampoSure, GTH e Bossan primeiro (maior volume + sem site).
- Aqui o gancho de site abre a porta para o pitch de BrokerAI/MindGraph AI adaptado — já validado como produto próprio.

### Fase 4 — Replicação em crédito
- Mercado mais lento e burocrático dos três — só entrar depois de já ter ritmo/confiança dos outros dois.
- Abordagem via diagnóstico presencial (mapear fluxo real de bancos parceiros) antes de propor qualquer solução, dado que aqui já existe SaaS maduro concorrendo (Celcoin, Teddy Digital, CB Negocial).
- Usar o case da Granapramim como prova social direta.

### Fase 5 — Decisão sobre SaaS (hipotético, dependente de validação)
- Se o padrão de problemas se repetir de forma consistente em pelo menos um dos três mercados (mais provável em tatuagem, dado o menor SAM e maior padronização do problema — agendamento), avaliar generalizar o sistema daquele mercado como produto multi-tenant.
- Migrar de "projeto fechado" para "mensalidade" apenas com os próximos clientes daquele nicho especificamente validado — não nos três ao mesmo tempo.
- Se nenhum padrão se repetir o suficiente, manter o modelo de projeto sob medida por cliente, sem SaaS — resultado igualmente válido.

### Fase 6 — Hipotético: consolidação (12+ meses)
- Se os três mercados performarem, a renda de freela chega a algo entre R$ 60k e R$ 120k acumulados no ano (somando os três SOMs estimados), como fonte de renda complementar — não substitui a busca por posição de AI Engineer, que continua sendo o objetivo de carreira principal.
- Caso um dos mercados (mais provável: seguros, dado o produto já pronto) mostrar tração desproporcional, reavaliar prioridade de tempo entre ele e o projeto de portfólio de AI Engineer.

### Riscos a monitorar ao longo do plano
- Dividir atenção entre três mercados simultaneamente antes de validar a mecânica em nenhum — mitigado ao sequenciar (tatuagem → seguros → crédito) em vez de atacar os três ao mesmo tempo.
- Subprecificar demais os primeiros clientes a ponto de não caber no tempo disponível (garçom + projeto principal).
- Investir em arquitetura de SaaS antes de confirmar que o problema realmente se repete entre clientes.

---

*Relatório gerado a partir da conversa de prospecção de 29 de agosto de 2026.*