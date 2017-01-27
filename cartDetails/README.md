# cartDetails
Detalhes do Carrinho

![example](https://github.com/TaahSene/opencode-components/blob/master/cartDetails/example.gif)


####Observações

** Imagem apenas ilustrativa, esse componente trata apenas da exibição das informações dos produtos contidos no carrinho, todo a parte de exibição do componente em si deve ser desenvolvida, tais como efeitos e estilização.

Adicione o arquivo [cartDetails.js](https://github.com/TaahSene/opencode-components/blob/master/cartDetails/js/modules/cartDetails.js) a sua pasta `js/modules`

Adicione ao arquivo `default.html` a chamada do script:

```javascript
<script type="text/javascript" src="{{ asset('js/modules/cartDetails.js') }}"></script>
```

Em um arquivo javascript, faça a chamada da função Cart, passando os parametros que deseja:

*Exemplo*

```javascript
  jQuery('#cart-details').cart({
    altImage: "http://image.url.png",
    resumeContent: '.resume'
  });
```

#### Opções de parametros

| Opções        | Descrição     |
| ------------- |:-------------:|
| altImage | recebe a url de uma imagem padrão que será utilizada caso o produto não possua imagem |
| resumeContent | atrubuto que receberá o resumo do carrinho  |
