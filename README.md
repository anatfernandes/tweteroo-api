# :bird: Tweteroo Api

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
    - [Cadastro](#Cadastro)
    - [Postar tweet](#Postar-tweet)
    - [Listar tweets](#Listar-tweets)
    - [Listar tweets de um usuário](#Listar-tweets-de-um-usuário)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

<br/>

# Sobre
Tweteroo é uma api para postagem de tweets.

<br/>

# Rotas

URL base: `http://localhost:5000`

<br/>

## Cadastro
- Rota: `/sign-up`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "username": "bobesponja",
    "avatar": "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Já existe um usuário com o *username* enviado

## Postar tweet
- Rota: `/tweets`
- Método: `POST`
- Header User com o nome de usuário do solicitante
- Exemplo de Body:

  ```json
  {
    "tweet": "eu amo o hub"
  }
  ```

- Possíveis erros:
	- Campo *tweet* vazio
	- Header User ausente

## Listar tweets
- Rota: `/tweets/?page=`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
    	"username": "bobesponja",
    	"avatar": "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    	"tweet": "eu amo o hub"
    }
  ]
  ```
- Possíveis erros:
	- Query string *page* inválida

<br/>

## Listar tweets de um usuário
- Rota: `/tweets/:username`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
    	"username": "bobesponja",
    	"avatar": "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    	"tweet": "eu amo o hub"
    }
  ]
  ```
- Possíveis erros:
	- Usuário inexistente

<br/>

# Como rodar em desenvolvimento
<br/>

1. Clone esse repositório:
>```ruby
> git clone https://github.com/AnaLTFernandes/tweteroo-api.git
>```

2. Instale as dependências:
>```ruby
> npm install
>```

3. Inicie o projeto:
>```ruby
> npm run dev
>```

8. Divirta-se nas rotas :)
