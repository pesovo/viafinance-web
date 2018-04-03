const $ = require('jquery');

$(document).ready(function () {

    if (window.location.hash.length > 0) {
        let hash = window.location.hash;
        if (hash.substr(-1) === '!') {
          hash = hash.substr(0, hash.length - 1);
        }
        scroll($(this), hash);
    }
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        scroll($(this), this.hash);
    });

    $('.menu-toggle').click(function() {
      $('ul').toggleClass('opening');
      $(this).toggleClass('open');
      $('.context').toggleClass('menu-correction');
    })
});

function onScroll(event){
    var scrollPos = $(document).scrollTop() + 150;
    $('.site-nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.site-nav ul li').removeClass("active");
            currLink.parent().addClass("active");
        }
        else{
            currLink.parent().removeClass("active");
        }
    });
}

const scroll = (el, hash) => {
  $(document).off("scroll");
  $('li').each(function () {
      $(this).removeClass('active');
  })
  el.parent().addClass('active');

  var target = hash,
  menu = target;

  $target = $(target);
  $('html, body').stop().animate({
      'scrollTop': $target.offset().top-150
  }, 500, 'swing', function () {
      window.location.hash = target + '!';
      $(document).on("scroll", onScroll);
  });
};