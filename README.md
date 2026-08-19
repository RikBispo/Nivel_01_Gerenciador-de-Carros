# 🚗 AutoCare Manager — Gerenciador de Histórico de Revisões de Carro

> Aplicação web moderna para controle completo do histórico de manutenções, revisões e custos de veículos.

🌐 **Demo Online**: [https://gerenciadordecarros.onrender.com/](https://gerenciadordecarros.onrender.com/)

---

## 📌 Sobre o Projeto

O **AutoCare Manager** é uma solução intuitiva e completa para proprietários e gestores de veículos acompanharem revisões preventivas, manutenções corretivas, troca de peças e custos operacionais.

Com um painel interativo com KPIs, alertas de revisão preventiva e geração de relatórios, o sistema ajuda a manter seu veículo em dia e evita gastos imprevistos.

---

## 🚀 Funcionalidades

- **🚘 Cadastro e Gestão de Veículos**: Adicione, edite e organize múltiplos veículos (Marca, Modelo, Ano, Placa e Quilometragem).
- **🛠️ Registro de Manutenções**: Cadastre revisões informando data, oficina, tipo de serviço, peças trocadas, valores e status (Concluída ou Pendente).
- **📊 Dashboard & KPIs**:
  - Total investido em manutenções.
  - Quantidade de revisões pendentes e concluídas.
  - Custo médio por manutenção.
- **🔔 Alertas Preventivos**: Notificações automáticas de revisões recomendadas com base na quilometragem e datas.
- **📄 Exportação de Relatórios**: Emissão de relatórios em PDF formatados para impressão ou download.
- **💾 Persistência de Dados**: Armazenamento local (`LocalStorage`) com suporte a execução via servidor Node.js/Express.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Relatórios**: `jspdf`, `html2canvas`
- **Backend / Servidor**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Hospedagem**: [Render](https://render.com/)

---

## 🔧 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

### 1. Clonar o repositório
```bash
git clone https://github.com/RikBispo/Nivel_01_Gerenciador-de-Carros.git
cd Nivel_01_Gerenciador-de-Carros
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173` no seu navegador.

---

## 🌍 Como Executar em Produção (Node.js/Express)

```bash
npm run build
npm run start
```
Acesse `http://localhost:3000` no seu navegador.

---

## 🌐 Deploy no Render

O projeto está pronto para ser hospedado no Render como um **Web Service Node.js**.

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (executa `node server.js`)
- **Link do projeto online**: [https://gerenciadordecarros.onrender.com/](https://gerenciadordecarros.onrender.com/)

---

Desenvolvido por [RikBispo](https://github.com/RikBispo).
