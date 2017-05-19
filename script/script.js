//JavaScript Document

/** Initialize jQuery. */
$(function() {

    //"use strict";

    /** Wait for DOM.  */
    $(document).ready(function() {

        /** Initialize global variables.  */

        /** @global */
        var loaded = false //Default page loading state

        /** @global */
        var light = true //Default light state

        /** @global */
        var height = $(window).height(); //Window height

        /** @global */
        var pos_right = $('.to-top').css('right'); //To-top right position

        /** @global */
        var position = $(window).scrollTop() + 50; //Vertical position of top plus 50

        /** Wait for images before loading. */
        $(window).on("load", function() {
            loading();
        });
        
        /** Load after 5 seconds if images hasn't been loaded. Fallback when back is pressed at a wrong time causing images to be already loaded before script.js loads. */
        setTimeout(function() {
            if (!loaded){
                loading();
            }
        },5000)

        /** Update global height on resize. */
        $(window).resize(function() {
            height = $(this).height();
        });

        /** Sets position of the header to prepare for slide in animation. */
        $('.chapter h6').css({
            right: '50vw',
            opacity: 0,
        });

        /** Used to generate Parallax effects. The properties are calculated according to the user's height from the top of the document. */
        $(window).scroll(function() {
            /** @access protected */
			var wintop = $(window).scrollTop();
			$('header').css('opacity', 1 - wintop / 1000);
            $('#p_bg1').css('opacity', wintop / 1500);
            $('.chapter_img').css({
                'filter': 'hue-rotate('+(1 - wintop / 10) + 'deg)',
                'background-position-y': (1 - wintop / 4) + 'px'
            });
            $('#para_part4_1').css({
                'background-position-y': (1 - wintop / 6) + 150 +'px'
            });
            $('#para_part4_2').css({
                'background-position-y': (wintop / 6) - 300 +'px'
            });
		});

        /** Navigation open */
        $('.nav_button').click(function() {
            $(this).css("pointer-events", "none");
            $(this).addClass('nav_button_hidden')
            $('.nav_button_close').css("pointer-events", "all");
            navToggle();
        });

        /** Navigation close */
        $('.nav_button_close').click(function() {
            $(this).css("pointer-events", "none");
            $('.nav_button').css("pointer-events", "all");
            $('.nav_button').removeClass('nav_button_hidden');
            navToggle();
        });

        /** Toggles document light mode. */
        $('.night_mode i, #light-sure').click(function() {
            $('#light').toggleClass('hidden');
            $('#dark').toggleClass('hidden');
            $('.night_mode i').toggleClass('ion-ios-lightbulb').toggleClass('ion-ios-lightbulb-outline');
            lightToggle();
        });

        

        /** Turns off light mode warning. */
        /** @global */
        var warning = false
        $('#light-sure, #light-nn').click(function(){
            $('.light-warning').addClass('hidden');
            warning = true
        });

        /** Toggles image expansion. */
        /** @global */
        var expand = false
        $('#para_part5_1').click(function(){
            var thisHeight = $(this).offset().top;
            scrollDown(thisHeight);
            if (!expand) {
                $(this).css('height','100vh');
            }
            else {
                $(this).css('height','500px');
            }
            expand = !expand
            lightToggle();
        });

        /** Scrolls the user down by the window height. */
        $('header aside').click(function() {
            scrollDown(height);
        });

        $('#p3_int_1, #p3_int_2').click(function() {
            $('.nodisplay').css('display','block');
            var x = $(this).parent().offset().top;
            var newHeight = parseInt(x) + parseInt(height);
            scrollDown(newHeight);
        });

        /** Returns the user to the top of the document */
        $('.to-top').click(function(){
            $('body').animate({
                scrollTop: 0
            },700)
        });

        /** Adds animation for hyperlinks */
        $('a').click(function(event) {
            event.preventDefault();
            var page = $(this).attr('href');
            var pageUrl = window.location.href
            var pageLocation = pageUrl.split('/').pop();
            if (pageLocation === page) {
                scrollDown(height);
            }
            else {
                $('body').fadeOut(750, redirect);
            }
            /** Changes the page location
             * @access private
            */
            function redirect() {
                window.location = page
            }
        });

        /** Scrolling triggers, activates classes and changes css according to the scroll offset from top. */
        $(window).scroll(function() {
            var position = $(this).scrollTop() + 50;
            //Full height offset
            if (position > height && light){
                $('.nav_button, .numerals').css({
                    'border':'#525252 solid 2px',
                    'color':'#525252'
                });
                if (!warning) {
                    $('.light-warning').removeClass('hidden');
                }
            }
            else {
                $('.nav_button, .numerals').css({
                    'border':'white solid 2px',
                    'color':'white'
                });
            }

            //Half height offset
            if (position > height/2) {
                $('.to-top').css('right','0px');
            }
            else {
                $('.to-top').css('right', pos_right);
            }

            //Quarter height offset
            if (position > height/4) {
                $('header aside').css('opacity','0');
                $('.chapter h6').css({
                    right: 0,
                    opacity: 1,
                });
            }
            else {
                $('header aside').css('opacity','1');
            }
        });

        /** Toggles specific page overlays based on the element which is clicked. */
        $('#p3_int_3').click(function() {
            overlayToggle('#partoverlay_alt');
        });
        $('#p3_int_4').click(function() {
            overlayToggle('#partoverlay_alt_2');
        });
        $('#p8alt_1').click(function() {
            overlayToggle('#part8overlay_1');
        });
        $('#p8alt_2').click(function() {
            overlayToggle('#part8overlay_2');
        });
        $('.next_part h1').click(function() {
            overlayToggle('.next_overlay');
        });
        $('.next_overlay').click(function() {
            overlayToggle('.next_overlay');
            $('.to-top').css('right','0px');
        });

        /** Changes the saturation of the background image on element hover. */
        $('.next_overlay a').hover(
            function() {
                $('.next_overlay').css('filter', 'saturate(100%)')
            },
            function() {
                $('.next_overlay').css('filter', 'saturate(0%)')
            }
        );

        /** Changes the opacity of the text background on element hover. */
        $('.p_background').hover(
            function() {
                $(this).css('background-color', 'rgba(0, 0, 0, 0.75)')
            },
            function() {
                $(this).css('background-color', 'rgba(0, 0, 0, 0)')
            }
        );

        /** Toggles the specified page overlay.
         * @param {string} overlay - The overlay which will be toggled.
        */
        function overlayToggle(overlay) {
            $(overlay).toggleClass('next_hidden');
            $('body').toggleClass('no_overflow');
            $('.to-top').css('right', pos_right);
        }

        /** Toggles the specified page overlay.
         * @param {int} height - The height to which the document will scroll down by.
        */
        function scrollDown(height) {
            $('body').animate({
                scrollTop: ('+=%i', height)
            },700);
        }

        /** Toggles the global navigation on and off */
        function navToggle() {
            $('.nav_overlay, nav').toggleClass('menuvisible');
            $('#main, .nav_overlay').toggleClass('menuopen');
            $('.nav_button_close').toggleClass('menutransform-open');
        }

        /** Removes the loading screen */
        function loading() {
            $('.loading').addClass('hidden');
            $('.loading').css('pointer-events','none');
            $('body').css('overflow-y', 'auto');
            loaded = true
        }

        /** Toggles global light mode on and off */
        function lightToggle() {
            if (light) {
                $('main').addClass('main_invert');
            }
            else {
                $('main').removeClass('main_invert');
            }
            light = !light
        }

    }); //End of document ready
}); //End of use