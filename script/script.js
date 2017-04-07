//JavaScript Document

$(function(){
    $(document).ready(function(){

        //loading
        console.log('dom ready');
        loading();

        // Navigation-open
        $('.nav_button').click(function(){
            $(this).css("pointer-events", "none");
            $(this).addClass('nav_button_hidden')
            $('.nav_button_close').css("pointer-events", "all");
            nav_toggle();
        });

        // Navigation-close
        $('.nav_button_close').click(function(){
            $(this).css("pointer-events", "none");
            $('.nav_button').css("pointer-events", "all");
            $('.nav_button').removeClass('nav_button_hidden')
            nav_toggle();
        });

        function nav_toggle(){
            $('.nav_overlay, nav').toggleClass('menuvisible');
            $('#main, .nav_overlay').toggleClass('menuopen');
            $('.nav_button_close').toggleClass('menutransform-open');
        }

        function loading (){
            $('.loading').addClass('hidden');
            $('.loading').css('pointer-events','none');
        }

    }); // End of document ready
}); // End of use