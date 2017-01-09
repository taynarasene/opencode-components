/**
  * author: Taynara Sene
  * github: taahsene
  *
  * Detalhes no carrinho- para loja Tray Commerce- Opencode
  *
  * **Utilização**
  *
  * Utilize a função abaixo passando os parametros que deseja.
  *
  *   jQuery('#cart-details').cart({
  *    altImage: "http://image.url.png",
  *    resumeContent: '.resume'
  *   });
  */

jQuery.fn.cart = function (options) {

  var content = this.selector;
  var defaults = { delete: false };
  var settings = jQuery.extend({}, defaults, options);

  var methods = {
    init: function () {
      methods.getCart();
    },

    getCart: function() {
      jQuery.ajax({
        method: "GET",
        url: "/web_api/cart/"+methods.getDataSession()
      }).done(function( response, textStatus, jqXHR ) {
        jQuery(content).html(" ");
        var price = methods.updatePrice(response,price);
        methods.showCart(response, content);
        methods.showResume(price.totalCart)
      }).fail(function( jqXHR, status, errorThrown ){
        var response = jQuery.parseJSON( jqXHR.responseText );
        if( response.code == 404 ){
            $(content).html("<h2>Carrinho Vazio</h2>");
            jQuery('[data-cart="amount"]').text( "0" );
            jQuery('[data-cart="price"]').text( "0,00" );
            methods.showResume("0,00")
        }
      });
    },

    showCart: function(response, content) {
      var image;
      jQuery( response ).each(function( index ) {

        if(this.Cart.product_image.thumbs){
           image = this.Cart.product_image.thumbs[90].https;
         }else{
           image = settings.altImage;
         }

        // template product
         var product = `
           <div class="prod row">
             <a href="${this.Cart.product_url.https}" alt="${this.Cart.product_name}">
               <img src="${image}" class="col-md-4">
             </a>
             <div class="details-content col-md-8">
             <a href="#" onclick="jQuery('${content}').cart({delete: true, removeId: ${this.Cart.product_id}, variantID: ${this.Cart.variant_id} });">
               <span class="prod-delete">&times;</span>
             </span>
               <a href="${this.Cart.product_url.https}" alt="${this.Cart.product_name}">
                 <p class="prod-name">${this.Cart.product_name}</p>
               </a>
               <strong>Quantidade:</strong>
               <span>${this.Cart.quantity}</span>
               <span class="prod-price"><strong> R$ ${this.Cart.price}</strong></span>
             </div>
           </div>`;
           jQuery(content).append(product);
         });
    },

    showResume :function (price) {
      // Resumo do Carrinho
      var resumeCart = `
        <div class="resumeCart">
          <h3> Subtotal:
            <span class="totalCart"><strong>R$ ${ price } </strong></span>
          </h3>
          <a href="/loja/carrinho.php">Ir para o carrinho</a>
        </div>`
      jQuery(settings.resumeContent).html(resumeCart);
    },

    getDataSession : function(){
      var dataSession = jQuery("html").attr("data-session");
      if( dataSession === undefined || dataSession === null || dataSession === '' ){
        dataSession = dataLayer[0].visitorId;
      }
      return dataSession;
    },

    updatePrice: function (response) {
      var totals = {
        quantity: 0,
        price: 0
      };

      jQuery.each( response, function (key, value) {
        totals.quantity = totals.quantity + parseInt( value.Cart.quantity );
        totals.price = totals.price + ( parseFloat( value.Cart.price ) * value.Cart.quantity );
      });

      var pointSeparatedPrice = totals.price.toFixed(2);
      var pointSeparatedPrice = pointSeparatedPrice.toString();
      var commaSeparatedPrice = pointSeparatedPrice.replace('.', ",");

      jQuery('[data-cart="amount"]').text( totals.quantity );
      jQuery('[data-cart="price"]').text( commaSeparatedPrice );

      var values = {
        totalCart: commaSeparatedPrice,
        totalQtd: totals.quantity
      }

      return values;
    },

    removeCart: function (removeId, variantId ) {
      jQuery.ajax({
        method: "DELETE",
        url: "/web_api/carts/"+methods.getDataSession()+"/"+removeId+"/"+variantId
      }).done(function( response, textStatus, jqXHR ) {
        methods.getCart();
      })
    }
  }

  jQuery('[data-action="getCart"]').hover(function() {
      methods.getCart();
  })

  if(settings.delete){
    methods.removeCart(settings.removeId, settings.variantID);
  }

};
