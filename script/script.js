//JavaScript Document

/** Initialize jQuery and wait for DOM */
$(function() {
    //"use strict";

    /** Initialize global variables.  
     * Global to all jQuery but may not be for the whole JS document.
     */

    /** jQuery @global 
     * @default
     * Default page loading state.
    */
    var loaded = false

    /** jQuery @global
     * @default
     * Default light state.
    */
    var light = true

    /** jQuery @global
     * Window height
    */
    var height = $(window).height();

    /** jQuery @global
     * @constant
     * To-top right position for to-top button.
    */
    var pos_right = $('.to-top').css('right');

    /** jQuery @global
     * @constant
     * Vertical position of top plus 50
    */
    var position = $(window).scrollTop() + 50;

    /** jQuery @global
     * @default
     * Global warning state. (Page6js only, until document can accept JSON data.)
     */
    var warning = false

    /** jQuery @global 
     * @default
     * Element expand state.
    */
    var expand = false

    /** Waits for all images to load before calling the {@link load} function which removes the loading screen of the document.
     * @desc Wait for images before loading. 
     */
    $(window).on("load", function() {
        load();
    });
    
    /** If images has not been loaded for more then 5 seconds, Load the page anyways by calling {@link load} function.
     * This is also used as fallback when 'back' is pressed at a wrong time causing images to be already loaded before script.js loads. 
     * @desc Load after 5 seconds if images hasn't been loaded.
    */
    setTimeout(function() {
        if (!loaded){
            load();
        }
    },5000)

    /** This event listener listens for any form of window resize before updating the global height variable to the new height of the window.
     * @desc Update global height on resize. 
     */
    $(window).resize(function() {
        /** @global */
        height = $(this).height();
    });

    /** Sets position of the header to prepare for slide in animation. */
    $('.chapter h6').css({
        right: '50vw',
        opacity: 0,
    });

    /** This event listener listens for any form of page scrolling and updates CSS properties of elements accordingly.
     * The properties are calculated according to the user's height from the top of the document. 
     * @desc Generate Parallax effects and scroll effects.
     */
    $(window).scroll(function() {
        /** @access private */
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

    /** Opens the navigation menu by switching the current button with the navigation close button before calling {@link navToggle} which opens the menu.
     * @desc Open the navigation menu 
     */
    $('.nav_button').click(function() {
        $(this).css("pointer-events", "none");
        $(this).addClass('nav_button_hidden')
        $('.nav_button_close').css("pointer-events", "all");
        navToggle();
    });

    /** Closes the navigation menu by switching the current button with the default menu button before calling {@link navToggle} which closes the menu.
     * @desc Closes the navigation menu 
     */
    $('.nav_button_close').click(function() {
        $(this).css("pointer-events", "none");
        $('.nav_button').css("pointer-events", "all");
        $('.nav_button').removeClass('nav_button_hidden');
        navToggle();
    });

    /** Inverts shades of the document and changes the icon to indicate whether if the light is on or off. 
     * Calls {@link lightToggle} to invert colours. 
     * @desc Toggles document light mode. 
     */
    $('.night_mode i, #light-sure').click(function() {
        $('#light').toggleClass('hidden');
        $('#dark').toggleClass('hidden');
        $('.night_mode i').toggleClass('ion-ios-lightbulb').toggleClass('ion-ios-lightbulb-outline');
        lightToggle();
    });

    

    /** Temporary method to showcase the warning system which warns the user to turn off the lights.
     * @desc Turns off light mode warning. 
     */
    $('#light-sure, #light-nn').click(function(){
        $('.light-warning').addClass('hidden');
        /** @global */
        warning = true
    });

    /** Toggles the size of the image, from the full height to a set height and toggles the light accordingly with {@link lightToggle}.
     * @desc Toggles image expansion.
     */
    $('#para_part5_1').click(function(){
        var thisHeight = $(this).offset().top;
        scrollDown(thisHeight);
        if (!expand) {
            $(this).css('height','100vh');
        }
        else {
            $(this).css('height','500px');
        }
        /** @global */
        expand = !expand
        lightToggle();
    });

    /** Scrolls the user down by the global window height variable which stores the current window height.
     *  This ensures the document is moved by a full window page by passing the full height to {@link scrollDown}. 
     * @desc Scrolls the user down by the window height.
     */
    $('header aside').click(function() {
        scrollDown(height);
    });

    /** Scroll the user down by the total of the parent element offset and the window height.
     * The element offset and window height are converted to integers and added before passing the parameter to {@link scrollDown}.
     * @desc Scrolls the user down by a calculated value.
     */
    $('#p3_int_1, #p3_int_2').click(function() {
        $('.nodisplay').css('display','block');

        /** @access private */
        var x = $(this).parent().offset().top;

        /** @access private */
        var newHeight = parseInt(x) + parseInt(height);

        scrollDown(newHeight);
    });

    /** Returns the user to the top of the document by setting scroll-bar relative position to the top of the document to 0 
     * @desc Scrolls the user to the top of the page.
     */
    $('.to-top').click(function(){
        $('body').animate({
            scrollTop: 0
        },700)
    });

    /** Animates page transition with a fadeout by preventing the default action of page change and instead fading the body out before calling the redirect function.
     * If the user clicks on the link they are on, scroll the page down instead.
     * @desc Adds animation for hyperlinks. 
     */
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
        /** Redirects the page.
         * @access private
        */
        function redirect() {
            window.location = page
        }
    });

    /** This event listener listens for page scrolling and updates a local variable storing the current page location.
     *  If the variable and other booleans meet a condition, it triggers, activates classes and changes CSS properties.
     * @desc Adds effects on user scroll.
     */
    $(window).scroll(function() {
        /** @access private */
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

    /** Toggles specific page overlays based on the element which is clicked.
     * Passes the value of the overlay attribute to {@link overlayToggle}.
     * @desc Turns on page overlays.
     */
    $('.overlayButton').click(function() {
        overlayToggle($(this).attr('overlay'));
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

    /** This event listener waits for a form to be submitted and prevents the default response before checking the value of inputs to ensure they are not empty.
     * If the inputs are empty a red border will display.
     * Once all the inputs are non-empty the form will submit.
     * @desc Validates the form before submission. 
     */
    $('form').submit(function(event) {

        /** @access private */
        var name = $('input#fName').val()

        /** @access private */
        var mail = $('input#fMail').val();

        /** @access private */
        var message = $('textarea#fMessage').val();

        if (name === '') {
            $('input#fName').css('border', '1px solid red');
        } else {
            $('input#fName').css('border', '');
        }

        if (mail === '') {
            $('input#fMail').css('border', '1px solid red');
        } else {
            $('input#fMail').css('border', '');
        }

        if (message === '') {
            $('textarea#fMessage').css('border', '1px solid red');
        } else {
            $('textarea#fMessage').css('border', '');
        }

        if (name !== '' && mail !== '' && message !== '') {
            $(this).submit();
        } 
        event.preventDefault();
    });

    /** Toggles the specified page overlay.
     * @param {string} overlay - The overlay which will be toggled.
    */
    function overlayToggle(overlay) {
        $(overlay).removeClass('next_hidden');
        $('body').toggleClass('no_overflow');
        $('.to-top').css('right', pos_right);
    }

    /** Scrolls down the page by a specified amount of height.
     * @param {int} height - The height to which the document will scroll down by.
    */
    function scrollDown(height) {
        $('body').animate({
            scrollTop: ('+=%i', height)
        },700);
    }

    /** Toggles the global navigation on and off by toggling specific classes */
    function navToggle() {
        $('.nav_overlay, nav').toggleClass('menuvisible');
        $('#main, .nav_overlay').toggleClass('menuopen');
        $('.nav_button_close').toggleClass('menutransform-open');
    }

    /** Removes the loading screen by adding classes and changing CSS properties */
    function load() {
        $('.loading').addClass('hidden');
        $('.loading').css('pointer-events','none');
        $('body').css('overflow-y', 'auto');

        /** @global */
        loaded = true
    }

    /** Toggles global light mode on and off by adding or removing the 'main invert' class depending on the light boolean. */
    function lightToggle() {
        if (light) {
            $('main').addClass('main_invert');
        }
        else {
            $('main').removeClass('main_invert');
        }
        /** @global */
        light = !light
    }

}); //End of use