# loadMore
Componente de paginação para lojas que utilizam o Opencode

## Como utilizar

Clone o projeto para seu tema Opencode

```sh
$ git clone https://github.com/TaahSene/loadMore.git
```

Crie um arquivo no diretorio `elements/snippets` como `loadmore.html` por exemplo e nele faça a chamada do botão nas paginas de categoria e busca, como abaixo:

```html
<button class="button load-more col-md-12" id="load-more">
    <span class="load">Carregar mais produtos </span>
    <span class="reload"><img src="{{ asset('img/reload.gif') }}" alt="" height="30px" /></span>
</button>
```
Adicione ao arquivo `default.html` a chamada do script:

```javascript
<script type="text/javascript" src="{{ asset('js/modules/loadMore.js') }}"></script>
```
Adicione ao final desse mesmo arquivo (defalt.html) a chamada abaixo, passando os parametros que deseja:

```javascript
<script type="text/javascript">
  jQuery('body').loadpage({
      productsGrid: '.showcase-catalog',
      pagenationContainer: '.catalog-footer',
      totalPages:{{ paginate.params.pageCount }},
      itemsPerRow: 3,
      rowsPerLoad: 5,
      buttonLoadMore: '.load-more',
      limitPagesOnScroll: 12
  });
</script>
```

Faça a chamada abaixo, nas paginas de busca e categorias para exibir o botão.

```sh
  {% element 'snippets/loadmore' %}
```
#### Opções de parametros

| Opções        | Descrição     |
| ------------- |:-------------:|
| productsGrid  | Deve receber a classe que da showcase da listagem de produtos; |
| pagenationContainer | Deve receber a classe da paginação padrão;     |
| totalPages | Receber o total de paginas da categoria/busca atual (Twig {{ paginate.params.pageCount }})|
| itemsPerRow | Recebe a quantidade maxima de Itens por Linha; |
| buttonLoadMore| Deve receber a classe contina do botão "LoadMore" na pagina de categoria/busca;|
