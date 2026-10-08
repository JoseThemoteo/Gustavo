# App SPA de Esfiha

## Contexto
Crie uma aplicação SPA, com a stack HTML, CSS, JS puro, sem pacotes ou dependências para hospedar no Github Page.
A aplicação será um cardápio, estilo "lanchonete" de Esfihas.

## Recursos do App
1. Carregar os dados de cardápio a partir de uma **estrutura Json** contendo todas as informações do produto, organizado por tipo de sabor, categoria do produto, outros dados triviais e um destaque para eventuais produtos em promoção.
2. O aplicativo SPA irá carregar, já na primeira tela, a lista de produtos. Não exige cadastro até o checkout.
3. O SPA deverá usar localstorage para armazenar os itens no carrinho.
4. Ao finalizar a compra no carrinho, o usuario então deverá se cadastrar (nome, whatsapp, email e endereço) e durante o cadastro adicionar localização (**geolocation**). Se o usuário negar geolocalização, o checkout continua normalmente usando apenas o endereço digitado.
5. Após o cadastro, pedir as credenciais do dispositivo (CredentialsContainer) como camada extra de segurança e prova de vida. Antes de acionar, verificar suporte via `PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()`. Se indisponível ou se o usuário cancelar, o checkout segue com aviso informativo, sem bloquear a compra.
6. Após validar as credenciais, simular um gateway de pagamento generico.
7. Caso o pagamento seja recusado volta para o carrinho mantendo dados e itens (localStorage), sem perda de estado.
8. Após pagamento aprovado, o app gera ID de pedido e exibe o link de WhatsApp com a mensagem pré-preenchida contendo itens, total e endereço, número +5511999999999

## O que o aplicativo não deve fazer
1. Processar o pagamento. Será apenas uma simulação.
2. Cadastrar produtos. Iremos carregar os dados de um arquivo Json ficticio, gerado por IA.
3. O aplicativo não controla delivery.

## Json Exemplo
```json
{
  "meta": {
    "estabelecimento": "Esfiha's",
    "whatsapp": "+5511999999999",
    "moeda": "BRL"
  },
  "produtos": [
    {
      "id": "esf-carne",
      "nome": "Esfiha de Carne",
      "categoria": "esfiha",
      "tipoSabor": "salgada",
      "descricao": "Carne moída temperada com cebola, hortelã e pimenta síria.",
      "preco": 6.5,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "🥟",
      "disponivel": true,
      "tags": [
        "best-seller"
      ]
    },
    {
      "id": "esf-frango-catupiry",
      "nome": "Esfiha de Frango com Catupiry",
      "categoria": "esfiha",
      "tipoSabor": "salgada",
      "descricao": "Frango desfiado cremoso com catupiry original.",
      "preco": 7.5,
      "promocao": true,
      "precoPromocional": 6.5,
      "imagem": "🧀",
      "disponivel": true,
      "tags": [
        "promocao"
      ]
    },
    {
      "id": "esf-queijo",
      "nome": "Esfiha de Queijo",
      "categoria": "esfiha",
      "tipoSabor": "salgada",
      "descricao": "Muçarela derretida com orégano.",
      "preco": 6.0,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "🧀",
      "disponivel": true,
      "tags": [
        "vegetariana"
      ]
    },
    {
      "id": "esf-calabresa",
      "nome": "Esfiha de Calabresa",
      "categoria": "esfiha",
      "tipoSabor": "salgada",
      "descricao": "Calabresa fatiada com cebola roxa.",
      "preco": 6.5,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "🥟",
      "disponivel": true,
      "tags": []
    },
    {
      "id": "esf-escarola",
      "nome": "Esfiha de Escarola",
      "categoria": "esfiha",
      "tipoSabor": "salgada",
      "descricao": "Escarola refogada com alho e azeite.",
      "preco": 6.0,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "🥬",
      "disponivel": false,
      "tags": [
        "vegetariana"
      ]
    },
    {
      "id": "esf-chocolate",
      "nome": "Esfiha de Chocolate",
      "categoria": "esfiha",
      "tipoSabor": "doce",
      "descricao": "Chocolate ao leite derretido polvilhado com açúcar.",
      "preco": 7.0,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "🍫",
      "disponivel": true,
      "tags": []
    },
    {
      "id": "esf-romeu-julieta",
      "nome": "Esfiha Romeu e Julieta",
      "categoria": "esfiha",
      "tipoSabor": "doce",
      "descricao": "Queijo minas com goiabada cremosa.",
      "preco": 7.5,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "🍮",
      "disponivel": true,
      "tags": []
    },
    {
      "id": "beb-refrigerante-lata",
      "nome": "Refrigerante Lata 350ml",
      "categoria": "bebida",
      "tipoSabor": "salgada",
      "descricao": "Lata 350ml. Sabores: cola, guaraná, laranja.",
      "preco": 6.0,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "🥤",
      "disponivel": true,
      "tags": []
    },
    {
      "id": "beb-suco-natural",
      "nome": "Suco Natural 500ml",
      "categoria": "bebida",
      "tipoSabor": "doce",
      "descricao": "Laranja, abacaxi com hortelã ou maracujá.",
      "preco": 9.0,
      "promocao": true,
      "precoPromocional": 7.5,
      "imagem": "🧃",
      "disponivel": true,
      "tags": [
        "promocao"
      ]
    },
    {
      "id": "beb-agua",
      "nome": "Água Mineral 500ml",
      "categoria": "bebida",
      "tipoSabor": "salgada",
      "descricao": "Sem gás.",
      "preco": 4.0,
      "promocao": false,
      "precoPromocional": null,
      "imagem": "💧",
      "disponivel": true,
      "tags": []
    }
  ]
}
```
## UI / UX
1. Utilize as paletas de cores #322303, #694807, #FAA901, #FFFEE0.
2. Utilize Google Fonts: Poppins para titulos e Open Sans para texto corrido. E aplique versões condensadas das fontes quando conveniente.
3. **Não use emojis**. Utilize google icons.
4. Interface minimalista. fundo branco.
5. Adicione pequenas animações em botões e transições de telas.
