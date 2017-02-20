/**
 * author: Taynara Sene
 * github: taahsene
 *
 * Listagem de Variações para loja Tray Commerce- Opencode
 *
 * Options
 * productId = Deve trazer o Id do produto;
 * selectImage = Deve receber uma tag que identifique a imagem principal do produto;
 *
 * Defaults
 * content = seletor que receberá a montagem das variações;
 *
 */

 jQuery.fn.variants = function (options) {

   // Variaveis
   var content = this.selector;
   var params = {};
   params["product_id"] = options.productId;
   var variants = "";
   var skuVariants = {};
   var skuVariantsData = {};
   var skuVariantKey = "";
   var skuVariantsId = {};

   var methods = {
     init: function(){

         methods.requestVariants(params);

         jQuery( document ).ready(function() {
          jQuery('#opcoes0 li').click(function(){
            jQuery('.lista_select').val("");
            jQuery('#opcoes1 li').removeClass('selecionada');
            jQuery('.lista_select').removeClass('indisponivel');
            jQuery('#variacao1').val("");
          });

          jQuery(content+' > #opcoes1 li').click(function(){
            if(jQuery("input#selectedVariant"+options.productId).val() == ""){
              jQuery('.var-unavailable'+options.productId ).css('display','block');
              jQuery(this).addClass('indisponivel');
            }else{
              jQuery(this).removeClass('indisponivel');
              jQuery('.var-unavailable'+options.productId).css('display','none');
            }
          });
        });

     },

     requestVariants: function (reqParams){
       // Busca as Variações do Produto
       jQuery.get('/web_api/variants', reqParams).done(function( response ) {
         variants = response.Variants;
         // Bloco de Separacao dos Dados da variacao
         for (i = 0; i < variants.length; i++) {
           var variant = variants[i].Variant;
           var available = variant.available;
           methods.productAvailable(variant, available, response);
         }

         if(parseInt(response.paging.total) > parseInt(response.paging.page) * parseInt(response.paging.limit)){

           params["product_id"] = options.product_id;
           params["page"] = parseInt(response.paging.page) + 1;
           methods.requestVariants(params);
         }else{
           methods.showVariants()
         }

       }).fail(function( jqXHR, status, errorThrown ){
         var response = $.parseJSON( jqXHR.responseText );
       });
     },

     productAvailable: function(variant, available, response) {
        //Função de validação de disponibilizade do produto
       if(available != 0){
         for (j = 0; j < variant.Sku.length; j++) {
           if (!skuVariants[variant.Sku[j].type]
              && parseInt(response.paging.page) == 1
              && typeof variant.VariantImage[j] == "undefined") {
             skuVariants[variant.Sku[j].type] = [];
             skuVariantsData[variant.Sku[j].type] = [];
           }
           if(jQuery.inArray(variant.Sku[j].value, skuVariants[variant.Sku[j].type]) < 0 ){
             if(typeof variant.VariantImage[j] == "undefined"){
               skuVariants[variant.Sku[j].type].push(variant.Sku[j].value);
               skuVariantsData[variant.Sku[j].type].push([variant.Sku[j].value]);
             } else {
               if (!skuVariants[variant.Sku[j].type]) {
                 skuVariants[variant.Sku[j].type] = [];
               }

               if (!skuVariantsData[variant.Sku[j].type]) {
                 skuVariantsData[variant.Sku[j].type] = [];
               }

               if (variant.Sku[j] && variant.Sku[j].type && variant.Sku[j].value) {
                 skuVariants[variant.Sku[j].type].push(variant.Sku[j].value);
                 skuVariantsData[variant.Sku[j].type].push([variant.Sku[j].value,variant.Sku[j].image_secure, variant.Sku[j].image]);
               }
             }
           }
           skuVariantKey += variant.Sku[j].value;
         }
         if(typeof variant.VariantImage[2] != "undefined"){
           skuVariantsId[skuVariantKey] = [variant.id,variant.price,variant.payment_option,variant.payment_option_html,variant.promotional_price, variant.end_promotion, variant.VariantImage[2].https];
         }else{
           skuVariantsId[skuVariantKey] = [variant.id,variant.price,variant.payment_option,variant.payment_option_html,variant.promotional_price, variant.end_promotion, variant.VariantImage[0].https];
         }
         skuVariantKey = "";
       }
     },

     showVariants: function () {
     // bloco para montar as variacoes
     jQuery(content).empty();
     jQuery(content).append("<input type='hidden' name='variacao' id='selectedVariant"+options.productId+"' value=''>");
     jQuery(content).prepend('<span class="var-unavailable'+options.productId+' blocoAlerta" style="display:none">Indisponivel</span>');

       var iOp = 0;
       for (var key in skuVariants) {
         var variantDiv = jQuery("<div></div>").text(key).attr("class","varTit onVar color-tone-1").attr("id","vars"+iOp);
         var variantInput = jQuery("<input></input>").attr("id","variacao"+iOp).attr("type","hidden");
         var variantUl = jQuery("<ul></ul>").attr("id","opcoes"+iOp).attr("class","lista_radios"+options.productId).css('margin', '5px 0 5px 0');

         var variantOp = [];

         for (var index in skuVariants[key]){
           if (skuVariants[key].hasOwnProperty(index)) {
             var skuVariant  = skuVariantsData[key][index].toString().split(",");
             var nameVariant = skuVariantsData[key][index][0];
             var image1      = skuVariantsData[key][index][1];
             var image2      = skuVariantsData[key][index][2];
             if (image2) {
               var variantLi = jQuery("<li></li>").attr("class","color variacao-").css('margin-right', '3px');;
               var labelVar  = jQuery("<label></label>").attr("class","lista-radios-input");
               var divImgVar = jQuery("<div></div>")
               var linkVar   = jQuery("<a></a>").attr("href","javascript:void(0)").attr("alt",nameVariant).click(function() {methods.selectVariation(jQuery(this))});
               var imgVar    = jQuery("<img>").attr("src",image2).attr("alt",nameVariant).attr("title",nameVariant).attr("full",image1);

               jQuery(variantLi).css('display', 'inline-block');
               jQuery(linkVar).append(imgVar);
               jQuery(divImgVar).append(linkVar);
               jQuery(labelVar).append(divImgVar);
               jQuery(variantLi).append(labelVar);
               jQuery(variantUl).append(variantLi);

             } else {
               var variantLi = jQuery("<li></li>").attr("class","").css('margin-right', '3px');
               var labelVar  = jQuery("<label></label>").attr("class","lista-radios-input");
               var divLabelVar = jQuery("<div></div>").css('border', '1px solid black').css('padding','8px 10px 10px 10px');
               var linkVar   = jQuery("<a></a>").attr("href","javascript:void(0)").attr("alt",nameVariant).click(function() {methods.selectVariation(jQuery(this))});
               var nameVar    = jQuery("<div>"+nameVariant.toUpperCase()+"</div>");

               jQuery(variantLi).css('display', 'inline-block');
               jQuery(linkVar).append(nameVar);
               jQuery(divLabelVar).append(linkVar);
               jQuery(labelVar).append(divLabelVar);
               jQuery(variantLi).append(labelVar);
               jQuery(variantUl).append(variantLi);
             }
           }
         }
         jQuery(content).append(variantDiv);
         jQuery(content).append(variantInput);
         jQuery(content).append(variantUl);
         iOp++;
       }
       for (i = 0; i < skuVariants.length; i++) {
         var variantDiv = jQuery("<div></div>").append(skuVariants);
       }
       // Seta variação adicionada ao carrinho
       jQuery("[data-add ="+options.productId+"]").click(function(){
         var selectedVariantInput = jQuery( content + " input#selectedVariant"+options.productId);
         var variacao1 = jQuery(content+' #variacao0');
         var variacao2 = jQuery(content+' #variacao1');

         // se o produto tiver variacao e estiver vazia
         if(selectedVariantInput.val() === "" && variants.length > 0) {
           var container = jQuery(".lista_radios"+options.productId);
           selected = jQuery(".selecionada");
           container.not(function(index){return jQuery(this).find(selected).length > 0;}).each(function(index, elem){
             jQuery('<div class="var_alert blocoAlerta">Selecione uma variação<span></span></div>').prependTo(this);
             return false;
           });
           jQuery('.var_alert').click(function () {
             jQuery(this).remove();
           });
           return false;
         }
         methods.addCart();
       });
   },


     selectVariation: function(variacao){

       var idOp = variacao.parent().parent().parent().parent().attr("id").substr(6);

       jQuery("ul#opcoes"+idOp+" li.selecionada").attr("class","color variacao-");
       variacao.parent().parent().parent().attr("class", "color variacao- selecionada");
       jQuery("input#variacao"+idOp).val(variacao.attr("alt"));


       var keyVariacao = "";
       if(typeof jQuery("input#variacao1").val() != "undefined"){
           keyVariacao = jQuery("input#variacao0").val() + jQuery("input#variacao1").val();
       }else{
           keyVariacao = jQuery("input#variacao0").val();
       }

       if(typeof skuVariantsId[keyVariacao] != "undefined" ){
           jQuery("input#selectedVariant"+options.productId).val(skuVariantsId[keyVariacao][0]);

       }else{
           jQuery("#selectedVariant"+options.productId).val("");
           jQuery('.lista_radios'+options.productId+' li.selecionada').addClass('indisponivel');
       }

       if(typeof skuVariantsId[keyVariacao] != "undefined" && typeof skuVariantsId[keyVariacao][6] != "undefined"){
           var thisVariantImage = skuVariantsId[keyVariacao][6];
           jQuery(options.selectImage).attr("src", thisVariantImage).addClass('active');
       }

       if(typeof skuVariantsId[keyVariacao] != "undefined" && typeof skuVariantsId[keyVariacao][3] != "undefined"){
         jQuery('#paymentVariant'+options.productId).html(skuVariantsId[keyVariacao][3])
       }
     },


     addCart: function() {
       var dataSession =  jQuery("html").attr("data-session");
       var variantID = document.getElementById("selectedVariant"+options.productId).value;

       $.ajax({
         method: "POST",
         url: "/web_api/cart/",
         contentType: "application/json; charset=utf-8",
         data: '{"Cart":{"session_id":"'+dataSession+'","product_id":"'+options.productId+'","quantity":"1","variant_id":"'+variantID+'"}}'
         }).done(function( response, textStatus, jqXHR ) {
           jQuery("[data-add ="+options.productId+"]").text("Comprado!!");
         }).fail(function( jqXHR, status, errorThrown ){
           var response = $.parseJSON( jqXHR.responseText );
         });
       }
     }

     methods.init();

 };
