//JavaScript Document

$(function(){
    $(document).ready(function(){

        //loading
        console.log('dom ready');
        loading();

        function loading () {
            $('.loading').addClass('hidden');
            $('.loading').css('pointer-events','none');
        }

        // Navigation
        $('.nav_button').click(function(){
            $('.nav_overlay, nav').toggleClass('menuvisible');
            $('#main, .nav_overlay').toggleClass('menuopen');
        });

    });
});