# Variants
Componente de seleção de variação para lojas que utilizam o Opencode

## Como utilizar

Adicione o arquivo [variants.js](https://github.com/TaahSene/opencode-components/blob/master/variants/js/module/variants.js) a sua pasta `js/modules`

Crie no arquivo `elements/snippets/product.html` , um elemento que deverá receber todo o conteudo das variações, e também o botão de comprar, esse botão deve conter o data-attribute `data-add="{{ product.id }}"` por exemplo:

```html
<div id="Variant{{ product.id }}"></div>
<button type="button" name="comprar" data-add="{{ product.id }}"> Comprar</button>
```
Adicione ao arquivo `default.html` a chamada do script:

```javascript
<script type="text/javascript" src="{{ asset('js/modules/variants.js') }}"></script>
```
Adicione ao final do arquivo `elements/snippets/product.html` a chamada abaixo da função abaixo, passando os parametros que deseja:

```javascript
<script type="text/javascript">
  jQuery('#Variant{{ product.id }}').variants({
    productId: {{ product.id }},
    selectImage: '[data-image="{{ product.id }}"]'
  });
</script>
```

#### Opções de parametros

| Opções        | Descrição     |
| ------------- |:-------------:|
| productId  | Deve receber o id do produto atual; |
| selectImage | Deve receber uma tag que identifique a imagem principal do produto     |
