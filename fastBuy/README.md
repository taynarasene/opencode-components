# fastBuy
Compra Rapida (Home)

![example](https://github.com/TaahSene/opencode-components/blob/master/fastBuy/example.gif)

Adicione o arquivo [fastBuy.js](https://github.com/TaahSene/opencode-components/blob/master/fastBuy/js/molules/fastBuy.js) a sua pasta `js/modules`, o arquivo [fastBuy.html](https://github.com/TaahSene/opencode-components/blob/master/fastBuy/elements/snippets/fastBuy.html) na pasta `elements/snippets`, e o arquivo [fastBuy.css](https://github.com/TaahSene/opencode-components/blob/master/fastBuy/css/fastBuy.css) na pasta `css`.

Adicione ao arquivo `default.html` a chamada do script:

```javascript
<link rel="stylesheet" href="{{ asset('css/fastBuy.css') }}" type="text/css">
<script type="text/javascript" src="{{ asset('js/modules/fastBuy.js') }}"></script>
```

Faça a chamada abaixo, no snippet de produto, onde deseja exibir o campo de quantidade.

```sh
{% element 'snippets/fastBuy' {"product": product} %}
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
