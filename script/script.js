//JavaScript Document

$(function(){
    $(document).ready(function(){
        //loading
        console.log('dom ready');

        //Global variables
        var loaded = false //Default page loading state
        var light = true //Default light state
        var height = $(window).height(); //Window height
        var pos_right = $('.to-top').css('right'); //To-top right position
        var position = $(window).scrollTop() + 50;

        //Wait for images
        $(window).on("load", function(){
            loading();
        });
        
        //Load after 5 seconds if images hasn't been loaded
        setTimeout(function(){
            if (!loaded){
                loading();
            }
        },5000)

        //Update global height on resize
        $(window).resize(function(){
            height = $(this).height();
        });

        $(window).scroll(function(){
			var wintop = $(window).scrollTop();
			$('header').css('opacity', 1 - wintop / 1000);
            $('.chapter_img').css({
                'filter': 'hue-rotate('+(1 - wintop / 10)+'deg)',
                'background-position-y': (1 - wintop / 4)+'px'
            });
		});

        //Navigation-open
        $('.nav_button').click(function(){
            $(this).css("pointer-events", "none");
            $(this).addClass('nav_button_hidden')
            $('.nav_button_close').css("pointer-events", "all");
            navToggle();
        });

        //Navigation-close
        $('.nav_button_close').click(function(){
            $(this).css("pointer-events", "none");
            $('.nav_button').css("pointer-events", "all");
            $('.nav_button').removeClass('nav_button_hidden');
            navToggle();
        });

        //Light toggle
        $('.night_mode i').click(function(){
            $('#light').toggleClass('hidden');
            $('#dark').toggleClass('hidden');
            $(this).toggleClass('ion-ios-lightbulb').toggleClass('ion-ios-lightbulb-outline');
            lightToggle();
        });

        //Next part overlay toggle
        $('.next_part h1').click(function(){
            overlayToggle();
        });

        $('.next_overlay').click(function(){
            overlayToggle();
            $('.to-top').css('right','0px');
        });

        function overlayToggle() {
            $('.next_overlay').toggleClass('next_hidden');
            $('body').toggleClass('no_overflow');
            $('.to-top').css('right', pos_right);
        }

        //Page scroll
        $('header aside').click(function(){
            scrollDown(height)
        });

        //Scroll to top
        $('.to-top').click(function(){
            $('body').animate({
                scrollTop: 0
            },700)
        });

        //Page change
        $('a').click(function(event){
            event.preventDefault();
            var page = $(this).attr('href');
            var pageUrl = window.location.href
            var pageLocation = pageUrl.split('/').pop();
            if (pageLocation === page){
                scrollDown(height);
            }
            else {
                $('body').fadeOut(750, redirect);
            }

            function redirect(){
                window.location = page
            }
        });

        //Page animations
        $(window).scroll(function(){
            var position = $(this).scrollTop() + 50;
            //Full height offset
            if (position > height && light){
                $('.nav_button, .numerals').css({
                    'border':'#525252 solid 2px',
                    'color':'#525252'
                });
                
            }
            else {
                $('.nav_button, .numerals').css({
                    'border':'white solid 2px',
                    'color':'white'
                });
                
            }

            //Half height offset
            if (position > height/2){
                $('.to-top').css('right','0px');
            }
            else {
                $('.to-top').css('right', pos_right);
            }

            //Quarter height offset
            if (position > height/4){
                $('header aside').css('opacity','0');
            }
            else {
                $('header aside').css('opacity','1');
            }
        });

        //Other
        $('.next_overlay a').hover(
            function(){
                $('.next_overlay').css('filter', 'saturate(100%)')
            },
            function(){
                $('.next_overlay').css('filter', 'saturate(0%)')
            }
        );

        $('.p_background').hover(
            function(){
                $(this).css('background-color', 'rgba(0, 0, 0, 0.75)')
            },
            function(){
                $(this).css('background-color', 'rgba(0, 0, 0, 0)')
            }
        );

        function scrollDown(height) {
            $('body').animate({
                scrollTop: ('+=%i', height)
            },700)
        }

        function navToggle(){
            $('.nav_overlay, nav').toggleClass('menuvisible');
            $('#main, .nav_overlay').toggleClass('menuopen');
            $('.nav_button_close').toggleClass('menutransform-open');
        }

        function loading(){
            $('.loading').addClass('hidden');
            $('.loading').css('pointer-events','none');
            $('body').css('overflow-y', 'auto');
            loaded = true
        }

        function lightToggle(){
            if (light){
                $('main').addClass('main_invert');
                light = false
            }
            else {
                $('main').removeClass('main_invert');
                light = true
            }
        }

    }); //End of document ready
}); //End of use