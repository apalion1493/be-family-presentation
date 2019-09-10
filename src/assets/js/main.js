// = jquery/jquery.min.js
// = bootstrap/bootstrap.min.js


jQuery(document).ready(function(){
    jQuery('.menu-burger').click(function () {
        jQuery(this).toggleClass('active');
    });
});