# 🏦 SAGAT_BANK — App Bancário com React Native + Expo

Aplicativo bancário desenvolvido com React Native e Expo, com funcionalidades essenciais como login, criação de conta, visualização de saldo, extrato e transferências via Pix.

---

## 1. Como rodar o projeto

### Instalar dependências
- ``` npm install ```;

### Iniciar o aplicativo
- Já com algum dispositivo conectado ao seu computador, ou algum simulador rodando, rode o comando ``` npm start ios``` ou ``` npm start android ```;

## 2. Funcionalidades entregues

### Login
- Funcionalidade de Login na aplicação informando um email válido e uma senha de no mínimo 8 dígitos;
- Criação de conta informando nome, email e senha do usuário;

### Home
- Já na Home da aplicação, podemos visualizar nosso saldo e escondê-lo;
- Podemos clicar no ícone de trocas para trocar nossa conta bancária selecionada;
- Podemos navegar para a tela de extrato:
- Podemos acessar as configurações do nosso aplicativo (apenas com a possibilidade de fazer logout);
- Podemos acessar a sessão de Pix para realizar transferências;

### Extrato
- Já na tela de extrato, podemos visualizar a lista de transferências recebidas e enviadas;
- Podemos arrastar a lista toda para baixo para paginar os dados e trazer mais itens para a lista;
- Podemos abrir a lista de filtros aplicáveis na lista de transferências, sendo eles: valor mínimo, valor máximo, data inicial, data final e tipo de transferência;

### Pix
- Já na tela de Pix, podemos informar o valor que deseja transferir;
- Informar o destinatário da transferência;
- Visualizar a confirmação de transferência;
- Visualizar o comprovante de transferência;

## 3. End Points Utilizados

### Login
- Realizar login: PUT ``` http://localhost:3000/v1/auth/sign_in ```
BODY
```` 
{
  "user": {
    "email": "usuario@example.com",
    "password": "1234"
  }
}
````
- Criar conta: POST ``` http://localhost:3000/v1/auth/sign_up ```
  BODY
```` 
{
  "user": {
    "name": "Maria mandalena",
    "email": "usuario@example.com",
    "password": "1234"
  }
}
````

### Home
- Pegar lista de contas bancárias: (Authorization: TOKEN) GET ``` http://localhost:3000/v1/users/bank_accounts ```;
- Pegar lista de contas bancárias do usuário: (Authorization: TOKEN) GET ``` http://localhost:3000/v1/users/bank_accounts/my ```;

### Extrato
- Pegar lista de transferências bancárias com filtros: (Authorization: TOKEN) GET ``` http://localhost:3000/v1/users/bank_account_transfers/statements?start_date=2025-05-01&end_date=2025-05-23&min_value=100&transfer_type=sent&page=2&per_page=5 ```;

### Pix
- Enviar transferência bancária: (Authorization: TOKEN) POST ``` http://localhost:3000/v1/users/bank_account_transfers ```;
````
{
  "bank_account_transfer": {
    "to_user_bank_account_id": 4,
    "from_user_bank_account_id": 6,
    "transfer_type": 1,
    "amount_to_transfer": 10.0
  },
  "make_success": true
}
````

  



  

