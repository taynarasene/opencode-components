/**
 * author: Taynara Sene
 * github: taahsene
 *
 * Image Hover para loja Tray Commerce- Opencode
 *
 * Atributos
 * data-image = {{ product.id }} = A imagem principal deve conter esse data-attributo
 */

jQuery('.list-thumb > li').css('display', 'inline-block');
jQuery('.list-thumb').each(function(index, item) {
  jQuery(item).find('li > .img').not('.act').each(function(i, variant) {
    jQuery(variant).addClass('act').mouseover(function() {
      var full = jQuery(this).find('img').attr('full'),
          image = jQuery('[data-image="'+ jQuery(this).find('img').attr('data-product') +'"]');
      jQuery(image).attr('src', full);
    });
  });
});
