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

        //Update height on resize
        $(window).resize(function(){
            height = $(this).height();
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
        $('nav a').click(function(event){
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

        $('#current_page').click(function(){
            if (position > height/4){
                $('body').animate({
                    scrollTop: 0
                },700)
            }
        });

        //Set section overlay to the element size
        var panelHeight = $('#panel1').height();
        $('#panel1_overlay').css('height', panelHeight);

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
        $('test').hover(
            function(){
                $('.chapter').toggleClass('chapter-invert');
            },
            function(){
                $('.chapter').toggleClass('chapter-invert');
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