/*====================================
 CUSTOM JS
======================================*/

(function( $ ) {
    $(document).ready(function () {
        // $.blockUI.defaults.css = {};
        // $.blockUI.defaults.overlayCSS.opacity = 0.8;
        // $.blockUI.defaults.overlayCSS.cursor = "default";
        // $.blockUI({ message: $('#loginModal') });

        var $modalBtn = $("#modalBtn"),
            $modalInput = $("#modalInput");

        $modalBtn.click(function(){
            if ($modalInput.val() == "nest") {
                $('html').removeClass('lockScrollY'); //add class to html tag, remove to unlock
                $(".blockOverlay").fadeOut(500, function(){
                    $.unblockUI();
                });
            } else {
                $modalInput.addClass("wrongInput");
            }
        });

        $("#modalForm").keyup(function(event){
            if(event.keyCode == 13){
                $modalBtn.click();
            }
        });

        if ($(window).width() > 992) {
            skrollr.init({
                forceHeight: false,
                smoothScrolling: false
            });
        }

        $(".accordionAnchor").click(function(){
            $currButtons = $(this).find("p"); //caching sub paragraphs of clicked anchor

            $("p.minus").not($currButtons).hide();
            $("p.plus").not($currButtons).show();
            $currButtons.toggle();
        });


        var $appButton = $("#appButton"),
            $appForm = $("#appForm"),
            $talkButton = $("#talkButton"),
            $talkForm = $("#talkForm");

        $appButton.click(function(){

            $talkButton.removeClass("blueBtnSelected");
            $appButton.addClass("blueBtnSelected");

            $talkForm.hide("drop", {direction: "right"}, 400, function(){
                $appForm.show("drop", 400);
            });
        });

        $talkButton.click(function(){

            $appButton.removeClass("blueBtnSelected");
            $talkButton.addClass("blueBtnSelected");

            $appForm.hide("drop", 400, function(){
                $talkForm.show("drop", {direction: "right"}, 400);
            });
        });

        $('.btn-file :file').change(function() {
            var $this = $(this);

            var filename = $this.val().split('\\').pop();
            filename = truncate(filename, 15);

            $this.parent().siblings("p").html(filename);
        });
        
        function truncate(n, len) {
          var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
          var filename = n.replace('.'+ext,'');
          if(filename.length <= len) {
              return n;
          }
          filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
          return filename + '.' + ext;
      };
    });
})( jQuery );


/*====================================
 Free To Use For Personal And Commercial Usage
Author: http://binarytheme.com
 License: Open source - MIT
 Please visit http://opensource.org/licenses/MIT for more Full Deatils of license.
 Share Us if You Like our work 
 Enjoy Our Codes For Free always.
======================================*/

(function ($) {
    "use strict";
    var mainApp = {

        init: function () {
            /*====================================
             CUSTOM LINKS SCROLLING FUNCTION 
            ======================================*/

            $('#navLinks a, .sectionText>a').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
               && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target
                    || $('[name=' + this.hash.slice(1) + ']');
                    if ($target.length) {
                        var targetOffset = $target.offset().top;
                        $('html,body')
                        .animate({ scrollTop: targetOffset }, 1000); //set scroll speed here
                        return false;
                    }
                }
            });
      
        },

        initialization: function () {
            mainApp.init();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.init();
    });

}(jQuery));



