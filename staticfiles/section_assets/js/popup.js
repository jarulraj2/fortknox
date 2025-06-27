var dtDirectorMediaVideosPopup = {

	dtInit : function() {

			 jQuery('.dtdr-listings-media-videos-popup-container').each(function() {
	
                var $popupItem = jQuery(this);
                var $popupoption = ($popupItem.attr('data-popup') == 'true') ? true : false;
                var $mfp_src = $popupItem.attr('data-mfpsrc');
                var $mfp_type = 'iframe';

                jQuery('.dtdr-listing-media-popup').on('click', function(event) {

                    if (jQuery('body').hasClass('logged-in')) {
                        
                        $trigger_element = $popupItem.find('.dtdr-listing-media-popup');
                    
                        $trigger_element.magnificPopup({
                            items: {
                                src: $mfp_src,
                                type: $mfp_type,
                            },
                            removalDelay: 500,
                            showCloseBtn: true,
                            enableEscapeKey: true,
                            closeOnBgClick: true,
                            mainClass: 'dtdr-popup-video-listing',
                            closeBtnInside: true
                        });	  
    
                      } else {

                        var $popupcontentclass = $popupItem.find('.dtdr-listings-popup-login');

                        $popupcontentclass.css({ 'opacity': '1', 'transition': 'all 0.35s ease-in-out .5s', 'transform': 'scale(1)' });
                      }

                });
   
			}); 


	}

};


jQuery(document).ready(function() {

	"use strict";

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorMediaVideosPopup.dtInit();
	}

});


( function( $ ) {

	"use strict";

	var dtDirectorMediaVideosJspopup = function($scope, $){
		dtDirectorMediaVideosPopup.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-media-videos.default', dtDirectorMediaVideosJspopup);
		}
	});

} )( jQuery );