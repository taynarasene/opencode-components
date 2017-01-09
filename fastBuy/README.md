# fastBuy
Compra Rapida (Home)

Adicione o arquivo [fastBuy.js](https://github.com/TaahSene/opencode-components/blob/master/fastBuy/js/molules/fastBuy.js) a sua pasta `js/modules`

Crie um arquivo no diretorio `elements/snippets` como `qtd_home.html` e adicione a ele o conteudo do campo de quantidade.

```html
<div data-app="product.quantity">
  <button type="button" data-app="product.qty" data-action="minus" data-product ="{{ product.id }}"> - </button>
  <input type="text" class="form-control" name="qty" id="qtd{{ product.id }}" value="1">
  <button data-app="product.qty" type="button" data-action="plus" data-product ="{{ product.id }}" > + </button>
</div>
```

Adicione ao snippet de produtos, o código para o botão comprar:

```html
<button type="submit" class="comprar" data-app="product.buy-button" data-product ="{{ product.id }}" >  </button>

```

Adicione ao arquivo `default.html` a chamada do script:

```javascript
<script type="text/javascript" src="{{ asset('js/modules/fastBuy.js') }}"></script>
```

Faça a chamada abaixo, no snippet de produto, onde deseja exibir o campo de quantidade.

```sh
  {% element 'snippets/qtd_home' %}
```

#### Opções de data-attributes (quantidade)

| Opções        | Descrição     |
| ------------- |:-------------:|
| data-app ="product.qty" | Dispara a ação de acrescentar ou decrementar um produto |
| data-product ="{{ product.id }}" | Deve trazer o id do produto.  |
| id="qtd{{ product.id }}" | O input deverá conter esse id para que o valor seja obtido corretamente.|
| data-action="minus" | Decrementa 1 produto do Total |
| data-action="plus"| Acrescenta 1 ao total de produtos|

#### Opções de data-attributes (botão Comprar)

| Opções        | Descrição     |
| ------------- |:-------------:|
| data-app="product.buy-button" | Dispara a ação de adicionar ao carrinho |
| data-product ="{{ product.id }}" | Deve trazer o id do produto.  |
