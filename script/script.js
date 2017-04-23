//JavaScript Document

$(function(){
    $(document).ready(function(){
        
        //loading
        console.log('dom ready');
        loading();

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
            $('.nav_button').removeClass('nav_button_hidden')
            nav_toggle();
        });

        //Page scroll
        var height = $(window).height();

        $('header aside').click(function(){
            $('body').animate({
                scrollTop: ('+=%i', height)
            },700)
        });

        $('.to-top').click(function(){
            $('body').animate({
                scrollTop: 0
            },700)
        });

        //Page animations
        $(window).scroll(function(){
            var position = $(window).scrollTop() + 50;
            //Full height offset
            if (position > height){
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
                $('.to-top').css('right','0px')
            }
            else {
                $('.to-top').css('right','-50px')
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
        $('.chapter span').hover(
            function(){
                $('.chapter').toggleClass('chapter-invert')
            },
            function(){
                $('.chapter').toggleClass('chapter-invert')
            }
        );

        function nav_toggle(){
            $('.nav_overlay, nav').toggleClass('menuvisible');
            $('#main, .nav_overlay').toggleClass('menuopen');
            $('.nav_button_close').toggleClass('menutransform-open');
        }

        function loading (){
            $('.loading').addClass('hidden');
            $('.loading').css('pointer-events','none');
        }

    }); //End of document ready
}); //End of use