//JavaScript Document

$(function(){
    $(document).ready(function(){
        //loading
        console.log('dom ready');

        //Wait for images
        $(window).on("load", function() {
            loading();
        });
        
        var light = true //Default light state
        var height = $(window).height(); //Window height
        var pos_right = $('.to-top').css('right'); //To-top right position

        //Update height on resize
        $(window).resize(function(){
            height = $(this).height();
        });

        //Navigation-open
        $('.nav_button').click(function(){
            $(this).css("pointer-events", "none");
            $(this).addClass('nav_button_hidden')
            $('.nav_button_close').css("pointer-events", "all");
            nav_toggle();
        });

        //Navigation-close
        $('.nav_button_close').click(function(){
            $(this).css("pointer-events", "none");
            $('.nav_button').css("pointer-events", "all");
            $('.nav_button').removeClass('nav_button_hidden');
            nav_toggle();
        });

        //Light toggle
        $('.night_mode i').click(function(){
            $('#light').toggleClass('hidden');
            $('#dark').toggleClass('hidden');
            $(this).toggleClass('ion-ios-lightbulb').toggleClass('ion-ios-lightbulb-outline');
            light_toggle();
        });

        //Page scroll
        $('header aside').click(function(){
            $('body').animate({
                scrollTop: ('+=%i', height)
            },700)
        });

        //Scroll to top
        $('.to-top').click(function(){
            $('body').animate({
                scrollTop: 0
            },700)
        });

        //Set section overlay to the element size
        var panelHeight = $('#panel1').height();
        $('#panel1_overlay').css('height', panelHeight);

        //Page animations
        $(window).scroll(function(){
            var position = $(window).scrollTop() + 50;
            //Full height offset
            if (position > height && light == true){
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
                console.log(pos_right)
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

        function nav_toggle(){
            $('.nav_overlay, nav').toggleClass('menuvisible');
            $('#main, .nav_overlay').toggleClass('menuopen');
            $('.nav_button_close').toggleClass('menutransform-open');
        }

        function loading(){
            $('.loading').addClass('hidden');
            $('.loading').css('pointer-events','none');
        }

        function light_toggle(){
            if (light === true){
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