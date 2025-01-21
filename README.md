# ContabilTech - Sistema de Gestão Contábil

Sistema de gestão contábil com foco em eSocial, desenvolvido com React e FastAPI.

## Funcionalidades

- Dashboard interativo com status do eSocial
- Gestão de clientes e funcionários
- Acompanhamento de prazos e obrigações
- Monitoramento de eventos do eSocial
- Controle de competências
- Interface responsiva e moderna

## Estrutura do Projeto

```
contabil-saas/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── contexts/
│       └── assets/
│
└── README.md
```

## Requisitos

### Backend
- Python 3.8+
- FastAPI
- SQLAlchemy
- Uvicorn
- Outras dependências listadas em requirements.txt

### Frontend
- Node.js 14+
- React 18
- Material-UI
- Outras dependências listadas em package.json

## Instalação Local

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd contabil-saas
```

2. Configure o Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Configure o Frontend:
```bash
cd frontend
npm install
```

## Executando o Projeto

1. Inicie o Backend:
```bash
cd backend
uvicorn main:app --reload
```
O backend estará disponível em `http://localhost:8000`

2. Inicie o Frontend:
```bash
cd frontend
npm start
```
O frontend estará disponível em `http://localhost:3000`

## Demonstração Online

Para acessar a versão de demonstração online:

1. Backend: Deploy no Heroku ou similar
```bash
heroku create contabiltech-api
git subtree push --prefix backend heroku main
```

2. Frontend: Deploy no Vercel ou Netlify
- Configure as variáveis de ambiente no painel do provedor:
  - REACT_APP_API_URL=https://[seu-backend].herokuapp.com

3. Acesse a demo em: https://contabiltech.vercel.app
   - Usuário: demo@contabiltech.com
   - Senha: demo123

## Segurança

- Autenticação JWT
- Criptografia de senhas com bcrypt
- CORS configurado
- Variáveis de ambiente para dados sensíveis

## Suporte

Para suporte, entre em contato através de:
- Email: suporte@contabiltech.com
- WhatsApp: (XX) XXXXX-XXXX

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
