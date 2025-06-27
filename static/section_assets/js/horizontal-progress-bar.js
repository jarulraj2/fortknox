function progress() {

    var windowScrollTop = jQuery(window).scrollTop();
    var docHeight = jQuery(document).height();
    var windowHeight = jQuery(window).height();
    var progress = (windowScrollTop / (docHeight - windowHeight)) * 100;
    var $bgColor = progress > 99 ? 'var(--wdtPrimaryColor)' : 'var(--wdtPrimaryColor)';
  
    jQuery('.wdt-horizontal-progress-bar .progress-bar').width(progress + '%').css({ backgroundColor: $bgColor });
}
  
progress();
  
jQuery(document).on('scroll', progress);