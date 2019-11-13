// = jquery/jquery.min.js
// = bootstrap/bootstrap.min.js
// = wow/wow.min.js


jQuery(document).ready(function(){
    jQuery('.menu-burger').click(function () {
        jQuery(this).toggleClass('active');
    });
});

// function stopScroll() {
//     let scrollPosition = [
//         self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
//         self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
//     ];
//     let html = jQuery('html');
//     html.data('scroll-position', scrollPosition);
//     html.data('previous-overflow', html.css('overflow'));
//     html.css('overflow', 'hidden');
//     window.scrollTo(scrollPosition[0], scrollPosition[1]);
// }
//
// function startScroll() {
//     let html = jQuery('html');
//     let scrollPosition = html.data('scroll-position');
//     html.css('overflow', html.data('previous-overflow'));
//     window.scrollTo(scrollPosition[0], scrollPosition[1]);
// }
//
//
// jQuery(window).scroll(function() {
//     let scroll_picca =jQuery('#block_1').offset().top;
//     console.log(scroll_picca) ;
//     if (jQuery(this).scrollTop() > scroll_picca) {
//         stopScroll();
//         $('#v-pills-profile-tab').click();
//     } else{
//
//     }
// });