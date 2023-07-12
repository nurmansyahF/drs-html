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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgICBqUXVlcnkoJ2ltZy5zdmcnKS5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyICRpbWcgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICAgIHZhciBpbWdDbGFzcyA9ICRpbWcuYXR0cignY2xhc3MnKTtcclxuICAgICAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICB2YXIgJHN2ZyA9IGpRdWVyeShkYXRhKS5maW5kKCdzdmcnKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKCd4bWxuczphJyk7XHJcbiAgICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICAgIH0sICd4bWwnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcuc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBzaXplID0gKHNlbGVjdC5kYXRhKCdzaXplJykgIT09IHVuZGVmaW5lZCkgPyBzZWxlY3QuZGF0YSgnc2l6ZScpIDogNDtcclxuICAgICAgICBzZWxlY3Quc2VsZWN0cGlja2VyKHtcclxuICAgICAgICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgICAgICAgc2l6ZTogc2l6ZSxcclxuICAgICAgICAgIGxpdmVTZWFyY2hQbGFjZWhvbGRlcjogJ1NlYXJjaCBoZXJlLi4nLFxyXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgJCgnLmN0YV9hbnN3ZXIgLnNlbGVjdCcpLm9uKCdjaGFuZ2VkLmJzLnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgfSk7XHJcbiAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKClcclxuXHJcblxyXG4gICAgICBmdW5jKCk7XHJcblxyXG5cclxuICAgIH1cclxuICAgIGluaXQoKTsgLy8gZW5kIG9mIGluaXQoKVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgICB2YXIgd3cgPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHJcbiAgICAgIHZhciBoZWFkZXIgPSBqUXVlcnkoJy5oZWFkZXInKSxcclxuICAgICAgICAgIHBvcyA9IGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICB2YXIgbGFzdFNjcm9sbCA9IDA7XHJcbiAgICAgICAgalF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciBzY3JvbGwgPSBqUXVlcnkod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgIGlmIChzY3JvbGwgPiA1KSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzY3JvbGwgPiBsYXN0U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcygnc2hvdy10b3AnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnc2hvdy10b3AnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxhc3RTY3JvbGwgPSBzY3JvbGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGpRdWVyeSgnLm1vYmlsZS1tZW51JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgalF1ZXJ5KCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAvLyBNZW51dHVwIHN1YiBtZW51IGppa2EgbWVuZ2tsaWsgZGkgYXJlYSBrb3NvbmdcclxuICAgICAgICAgIGlmICghdGFyZ2V0LmNsb3Nlc3QoJy5tZW51LWl0ZW0uaGFzLXN1YicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcubWVudS1pdGVtLmhhcy1zdWInKS5yZW1vdmVDbGFzcygnc3ViLW1lbnUtb3BlbicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5tZW51LWl0ZW0uaGFzLXN1YicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgdyA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGlzT3BlbiA9ICQodGhpcykuaGFzQ2xhc3MoJ3N1Yi1tZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgLy8gTWVudXR1cCBzdWIgbWVudSBsYWluIHNlYmVsdW0gbWVtYnVrYSBzdWIgbWVudSBiYXJ1XHJcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0uaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzdWItbWVudS1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc3ViLW1lbnUtb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICQoJy5oZWFkZXItc2VhcmNoJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgIGljID0gdC5maW5kKCcuc2MtdHJpZ2dlcicpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmKHd3ID4gMTAwMCl7XHJcbiAgICAgICAgICAkKCcubWFpbi1tZW51IC5tZW51LWl0ZW0uaGFzLXN1YicpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBNZW5naGFwdXMga2VsYXMgJ2hvdmVyZWQnIGRhcmkgc2VtdWEgZWxlbWVuIGhlYWRlciBzZWJlbHVtbnlhXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaG92ZXJlZC1zdWJtZW51Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBNZW5hbWJhaGthbiBrZWxhcyAnaG92ZXJlZCcgcGFkYSBoZWFkZXIgc2FhdCBtZW5nYXJhaGthbiBrdXJzb3IgcGFkYSBtZW51IHlhbmcgbWVtaWxpa2kgc3VibWVudVxyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5oZWFkZXInKS5hZGRDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaG92ZXJlZC1zdWJtZW51Jyk7XHJcbiAgICAgICAgICAgIC8vIE1lbmdoYXB1cyBrZWxhcyAnaG92ZXJlZCcgZGFyaSBoZWFkZXIgc2FhdCBrdXJzb3IgdGlkYWsgbGFnaSBtZW5nYXJhaCBwYWRhIG1lbnUgeWFuZyBtZW1pbGlraSBzdWJtZW51XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICQoJy5tYWluLW1lbnUgLm1lbnUtaXRlbS5oYXMtc3ViJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhJyk7XHJcbiAgICAgICAgICAgICAgLy8gJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdob3ZlcmVkLXN1Ym1lbnUnKTtcclxuICAgICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5oZWFkZXInKS50b2dnbGVDbGFzcygnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQ7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEthdGVnb3JpXHJcbiAgICAgICAgJCgnLnByb2R1ay1rYXRlZ29yaS13cmFwJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgIGkgPSB0LmZpbmQoJy5rYXRlZ29yaS1pdGVtJyk7XHJcbiAgICAgICAgICBpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyBTd2lwZXJcclxuICAgICAgICB2YXIgcHJvZ3Jlc3NDaXJjbGU7XHJcbiAgICAgICAgLy8gY29uc3QgcHJvZ3Jlc3NDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRvcGxheS1wcm9ncmVzcyBzcGFuXCIpO1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmhvbWVTd2lwZXJcIiwge1xyXG4gICAgICAgICAgZWZmZWN0OiBcImZhZGVcIixcclxuICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiBcIi5zd2lwZXItcGFnaW5hdGlvblwiLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIGR5bmFtaWNCdWxsZXRzOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBhdXRvcGxheToge1xyXG4gICAgICAgICAgICBkZWxheTogMzAwMCxcclxuICAgICAgICAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvLyBLb2RlIHlhbmcgYWthbiBkaWphbGFua2FuIHNhYXQgU3dpcGVyIHNlbGVzYWkgbWVtdWF0XHJcbiAgICAgICAgICAgICAgJCgnLnN3aXBlci1wYWdpbmF0aW9uIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQnKS5hcHBlbmQoJzxzdmcgdmlld0JveD1cIjAgMCA0OCA0OFwiPjxjaXJjbGUgY3g9XCIyNFwiIGN5PVwiMjRcIiByPVwiMjBcIj48L2NpcmNsZT48L3N2Zz4nKTtcclxuICAgICAgICAgICAgICBwcm9ncmVzc0NpcmNsZSA9ICQoJ2JvZHknKS5maW5kKFwiLnN3aXBlci1wYWdpbmF0aW9uIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQgc3ZnXCIpO1xyXG4gICAgICAgICAgICAgIC8vIExha3VrYW4gdGluZGFrYW4gbGFpbiB5YW5nIEFuZGEgaW5naW5rYW4uLi5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXV0b3BsYXlUaW1lTGVmdChzLCB0aW1lLCBwcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ2lyY2xlLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5jc3MoXCItLXByb2dyZXNzXCIsIDEgLSBwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB2YXIgc2xpZGVWID0gbmV3IFN3aXBlcihcIi5zbGlkZXJWXCIsIHtcclxuICAgICAgICAvLyAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG5cclxuICAgICAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIGNvbnN0IHByb2dyZXNzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0b3BsYXktcHJvZ3Jlc3Mgc3BhblwiKTtcclxuICAgICAgICB2YXIgcHJkU3dpcGVyID0gbmV3IFN3aXBlcihcIi5wcmRTd2lwZXJcIiwge1xyXG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAvLyBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6IFwiLnByZFN3aXBlci1uZXh0XCIsXHJcbiAgICAgICAgICAgIHByZXZFbDogXCIucHJkU3dpcGVyLXByZXZcIixcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgTG9naW5zd2lwZXIgPSBuZXcgU3dpcGVyKFwiLnN3aXBlclwiLCB7XHJcbiAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxyXG4gICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6IFwiLnN3aXBlci1wYWdpbmF0aW9uXCIsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gZHluYW1pY0J1bGxldHM6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGF1dG9wbGF5OiB7XHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb246IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIC8vIEtvZGUgeWFuZyBha2FuIGRpamFsYW5rYW4gc2FhdCBTd2lwZXIgc2VsZXNhaSBtZW11YXRcclxuICAgICAgICAgICAgICAkKCcuc3dpcGVyLXBhZ2luYXRpb24gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCcpLmFwcGVuZCgnPHN2ZyB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+PGNpcmNsZSBjeD1cIjI0XCIgY3k9XCIyNFwiIHI9XCIyMFwiPjwvY2lyY2xlPjwvc3ZnPicpO1xyXG4gICAgICAgICAgICAgIHByb2dyZXNzQ2lyY2xlID0gJCgnYm9keScpLmZpbmQoXCIuc3dpcGVyLXBhZ2luYXRpb24gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCBzdmdcIik7XHJcbiAgICAgICAgICAgICAgLy8gTGFrdWthbiB0aW5kYWthbiBsYWluIHlhbmcgQW5kYSBpbmdpbmthbi4uLlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhdXRvcGxheVRpbWVMZWZ0KHMsIHRpbWUsIHByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDaXJjbGUuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB0LmNzcyhcIi0tcHJvZ3Jlc3NcIiwgMSAtIHByb2dyZXNzKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBkZWZhdWx0U3dpcHBlciA9IG5ldyBTd2lwZXIoXCIuc2xpZGVyXCIsIHtcclxuICAgICAgICAgIGVmZmVjdDogXCJmYWRlXCIsXHJcbiAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgIG5leHRFbDogXCIubmV4dC1zbGlkZXJcIixcclxuICAgICAgICAgICAgcHJldkVsOiBcIi5wcmV2LXNsaWRlclwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH07IC8vIGVuZCBvZiBmdW5jXHJcblxyXG4gICAgLy8gTWFzb25yeVxyXG4gICAgLy8gaW5pdCBNYXNvbnJ5XHJcbiAgICB2YXIgJGdyaWQgPSAkKCcuZ3JpZC1tYXNvbnJ5JykubWFzb25yeSh7XHJcbiAgICAgIGl0ZW1TZWxlY3RvcjogJy5ncmlkLWl0ZW0nLFxyXG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXHJcbiAgICAgIGNvbHVtbldpZHRoOiAnLmdyaWQtc2l6ZXInLFxyXG4gICAgICBndXR0ZXI6IDI0XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gU2hvdyBIaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcucHN3ZCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgcyA9IHQuZmluZCgnLnNoLXB3ZCcpLFxyXG4gICAgICAgICAgZiA9IHQuZmluZCgnLmZvcm0tY29udHJvbCcpO1xyXG4gICAgICBzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoIXQuaGFzQ2xhc3MoJ3Nob3cnKSl7XHJcbiAgICAgICAgICB0LmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICBmLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdC5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgZi5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5wcm95ZWstbGlzdC13cmFwJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBwaSA9IHQuZmluZCgnLnByb3llay1pdGVtJyksXHJcbiAgICAgICAgICBleGNvbCA9IHBpLmZpbmQoJy5leGNvbCcpO1xyXG4gICAgICBleGNvbC5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0dD0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFBpID0gJCh0aGlzKS5wYXJlbnRzKCcucHJveWVrLWl0ZW0nKTtcclxuICAgICAgICBwaS5ub3QoY2xpY2tlZFBpKS5yZW1vdmVDbGFzcygnZXhwYW5kJyk7XHJcbiAgICAgICAgaWYoY2xpY2tlZFBpLmhhc0NsYXNzKCdleHBhbmQnKSl7XHJcbiAgICAgICAgICB0dC5odG1sKCdMaWhhdCBkZXRhaWwnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHR0Lmh0bWwoJ0xpaGF0IGxlYmloIHNpbmdrYXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGkubm90KGNsaWNrZWRQaSkuZmluZCgnLmV4Y29sJykuaHRtbCgnTGloYXQgZGV0YWlsJyk7XHJcbiAgICAgICAgY2xpY2tlZFBpLnRvZ2dsZUNsYXNzKCdleHBhbmQnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbW9kYWxEZXRhaWwnKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5hZGRDbGFzcygnYmctZ2FsbGVyeScpO1xyXG4gICAgfSlcclxuXHJcbiAgfSkoKTsgLy8gZW5kIG9mIGZ1bmN0aW9uKClcclxuXHJcblxyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
