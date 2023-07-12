$(document).ready(function() {
  (function () {
    // 'use strict';

    function init() {
      // INLINE SVG
      jQuery('img.svg').each(function (i) {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
          var $svg = jQuery(data).find('svg');
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }
          $svg = $svg.removeAttr('xmlns:a');
          $img.replaceWith($svg);
        }, 'xml');
      });

      $('.select').each(function () {
        var select = $(this),
          size = (select.data('size') !== undefined) ? select.data('size') : 4;
        select.selectpicker({
          style: 'select-control',
          size: size,
          liveSearchPlaceholder: 'Search here..',
          width: "100%",
        });
      });
      $('.cta_answer .select').on('changed.bs.select', function (e) {
        $(this).closest('.form-group').addClass('filled');
      });
      $('[data-toggle="tooltip"]').tooltip()


      func();


    }
    init(); // end of init()


    function func() {
      var ww = $(window).width();

      var header = jQuery('.header'),
          pos = header.outerHeight();

        var lastScroll = 0;
        jQuery(window).scroll(function () {
          var scroll = jQuery(window).scrollTop();
          if (scroll > 5) {
            header.addClass('fixed');
          } else {
            header.removeClass('fixed');
          }
          if (scroll > lastScroll) {
            header.removeClass('show-top');
          } else {
            header.addClass('show-top');
          }
          lastScroll = scroll;
        });

        jQuery('.mobile-menu').click(function () {
          var t = $(this);
          jQuery('body').toggleClass('menu-open');
        });


        $(document).on('click', function(event) {
          var target = $(event.target);
          // Menutup sub menu jika mengklik di area kosong
          if (!target.closest('.menu-item.has-sub').length) {
            $('.menu-item.has-sub').removeClass('sub-menu-open');
          }
        });
        $('.menu-item.has-sub').each(function() {
          var w = $(window).width();
          $(this).click(function() {
            var isOpen = $(this).hasClass('sub-menu-open');
            // Menutup sub menu lain sebelum membuka sub menu baru
            $('.menu-item.has-sub').removeClass('sub-menu-open');
            if (!isOpen) {
              $(this).addClass('sub-menu-open');
            }
          });
        });


        $('.header-search').each(function(){
          var t = $(this),
              ic = t.find('.sc-trigger');
        })

        if(ww > 1000){
          $('.main-menu .menu-item.has-sub').hover(function() {
            // Menghapus kelas 'hovered' dari semua elemen header sebelumnya
            $('body').addClass('hovered-submenu');

            // Menambahkan kelas 'hovered' pada header saat mengarahkan kursor pada menu yang memiliki submenu
            $(this).closest('.header').addClass('hovered');
          }, function() {
            $('body').removeClass('hovered-submenu');
            // Menghapus kelas 'hovered' dari header saat kursor tidak lagi mengarah pada menu yang memiliki submenu
            $(this).closest('.header').removeClass('hovered');
          });
        }else{
          $('.main-menu .menu-item.has-sub').each(function(){
            $(this).click(function(e){
              console.log('a');
              // $('body').toggleClass('hovered-submenu');
              $(this).closest('.header').toggleClass('hovered');
              e.preventDefault;
            })

          })
        }

        // Kategori
        $('.produk-kategori-wrap').each(function(){
          var t = $(this),
              i = t.find('.kategori-item');
          i.each(function(){
            $(this).click(function(){
              i.removeClass('active');
              $(this).addClass('active');
            })
          })
        });



        // Swiper
        var progressCircle;
        // const progressContent = document.querySelector(".autoplay-progress span");
        var swiper = new Swiper(".homeSwiper", {
          effect: "fade",
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // dynamicBullets: false,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          on: {
            init: function () {
              // Kode yang akan dijalankan saat Swiper selesai memuat
              $('.swiper-pagination .swiper-pagination-bullet').append('<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"></circle></svg>');
              progressCircle = $('body').find(".swiper-pagination .swiper-pagination-bullet svg");
              // Lakukan tindakan lain yang Anda inginkan...
            },
            autoplayTimeLeft(s, time, progress) {
              setTimeout(
                function()
                {
                  progressCircle.each(function(){
                    var t = $(this);
                    t.css("--progress", 1 - progress);
                  });
                }, 10);
            },
          }
        });

        // var slideV = new Swiper(".sliderV", {
        //   direction: "vertical",

        // });


        // const progressContent = document.querySelector(".autoplay-progress span");
        var prdSwiper = new Swiper(".prdSwiper", {
          slidesPerView: 4,
          spaceBetween: 24,
          // loop: true,
          navigation: {
            nextEl: ".prdSwiper-next",
            prevEl: ".prdSwiper-prev",
          },

        });

        var Loginswiper = new Swiper(".swiper", {
          effect: "fade",
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // dynamicBullets: false,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          on: {
            init: function () {
              // Kode yang akan dijalankan saat Swiper selesai memuat
              $('.swiper-pagination .swiper-pagination-bullet').append('<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"></circle></svg>');
              progressCircle = $('body').find(".swiper-pagination .swiper-pagination-bullet svg");
              // Lakukan tindakan lain yang Anda inginkan...
            },
            autoplayTimeLeft(s, time, progress) {
              setTimeout(
                function()
                {
                  progressCircle.each(function(){
                    var t = $(this);
                    t.css("--progress", 1 - progress);
                  });
                }, 10);
            },
          }
        });

        var defaultSwipper = new Swiper(".slider", {
          effect: "fade",
          navigation: {
            nextEl: ".next-slider",
            prevEl: ".prev-slider",
          },
        });



    }; // end of func

    // Masonry
    // init Masonry
    var $grid = $('.grid-masonry').masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer',
      gutter: 24
    });


    // Show Hide Password
    $('.pswd').each(function(){
      var t = $(this);
      var s = t.find('.sh-pwd'),
          f = t.find('.form-control');
      s.click(function(){
        if(!t.hasClass('show')){
          t.addClass('show');
          f.attr('type', 'text');
        }else{
          t.removeClass('show');
          f.attr('type', 'password');
        }

      })
    });

    $('.proyek-list-wrap').each(function(){
      var t = $(this),
          pi = t.find('.proyek-item'),
          excol = pi.find('.excol');
      excol.click(function(){
        var tt= $(this);
        var clickedPi = $(this).parents('.proyek-item');
        pi.not(clickedPi).removeClass('expand');
        if(clickedPi.hasClass('expand')){
          tt.html('Lihat detail');
        }else{
          tt.html('Lihat lebih singkat');
        }
        pi.not(clickedPi).find('.excol').html('Lihat detail');
        clickedPi.toggleClass('expand');
      });
    });

    $('#modalDetail').on('shown.bs.modal', function (e) {
      $('.modal-backdrop').addClass('bg-gallery');
    })

  })(); // end of function()


});