# imagesHover

Exibe uma listagem com todos as imagem do produto, ao sobrepor o mouse nessas imagem, ela se torna a imagem principal do produto.

Adicione o arquivo [imagesHover.js](https://github.com/TaahSene/opencode-components/blob/master/imagesHover/js/modules/imagesHover.js) a sua pasta `js/modules`

Adicione o arquivo [imagesHover.html](https://github.com/TaahSene/opencode-components/blob/master/imagesHover/elements/snippets/imagesHover.html) a sua pasta `elements/snippets`


Adicione ao arquivo `default.html` a chamada do script:

```javascript
<script type="text/javascript" src="{{ asset('js/modules/imagesHover.js') }}"></script>
```

Faça a chamada abaixo, no snippet de produto, onde deseja exibir a listagem.

```sh
{% element 'snippets/imagesHover' {"product": product } %}
```

Adicione á imagem principal do produto o data-attribute `data-image={{ product.id }}`, por exemplo:

```html
<img src="{{ product.images[0].large }}" data-image="{{ product.id }}" alt="{{ product.name }}">

```
