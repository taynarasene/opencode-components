/**
  * author: Taynara Sene
  * github: taahsene

  * Compra Rapida (Home)- para loja Tray Commerce- Opencode

  * **Utilização**
  *
  * Faça a chamada do snippet de quantidade no snippet de Produtos
  * {% element 'snippets/qtd_home'{"product": product}  %}
  *
  * Adicione o Botão comprar
  * <button type="submit" class="comprar"data-app="product.buy-button" data-product ="{{ product.id }}" >  </button>
  */

  // Quantidade
  jQuery('[data-app="product.qty"]').on('click', function() {
    var $input = jQuery(this).parent().find('input')[0];
    var value = parseInt(jQuery($input).attr('value'));
    var option = jQuery(this).attr('data-action')== 'minus' ? -1 : 1

    value += option;
    if(value > 0)
      jQuery($input).attr('value',value);
  })

  //Comprar
  jQuery('[data-app="product.buy-button"]').on('click', function() {
    var $input = jQuery(this).parent().parent().find('input')[0];
    var $productId = jQuery(this).attr('data-product');
    var $dataSession = jQuery("html").attr("data-session");
    var $productQtd = parseInt(jQuery($input).attr('value'));
    var self = this;
    jQuery.ajax({
      method: "POST",
      url: "/web_api/cart/",
      contentType: "application/json; charset=utf-8",
      data: '{"Cart":{"session_id":"'+$dataSession+'","product_id":"'+$productId+'","quantity":'+$productQtd+'}}'
    }).done(function( response, textStatus, jqXHR ) {
      jQuery(self).text("Adicionado!")
      // alert("Produto Adicionado ao Carrinho!");

      //Função para exibir a modal
      reloaderPreview(showModal);
    }).fail(function( jqXHR, status, errorThrown ){
      var response = jQuery.parseJSON( jqXHR.responseText );
      // Exibe a mensagem de erro (estoque insuficiente, etc)
      alert(response.causes[0])
    });
  })

  function reloaderPreview(callback) {
    //Renderiza novamente o componente de cart-preview
    store.render.init();
    setTimeout(function() {
      callback();
    }, 800);
  }

  // Dispara a modal
  function showModal() {
      jQuery('.cart-preview').modal('show');
  }
