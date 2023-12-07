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

      function initSelect(){
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
      }
      initSelect();

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
          ic.click(function(){
            $('body').toggleClass('search-show')
            if(!$('header').hasClass('fixed')){
              $('header').addClass('fixed');
            }
          })
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

        // Thumbnail Produk
        $('.photo-thumbnail').each(function(){
          var t = $(this),
              slider = t.find('.box-swiper');
              nxt = $('.next-sliderV'),
              prv = $('.prev-sliderV'),
              sw = t.find('.swiper-slide');
          var swiper = new Swiper(slider[0], {
            slidesPerView: 1,
            spaceBetween: 12,
            loop: false,
            navigation: {
              nextEl: nxt[0] ,
              prevEl: prv[0],
            },
            breakpoints: {
              640: {
                slidesPerView: 1,
                spaceBetween: 8,
                direction: "horizontal",
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 12,
                slidesPerView: "auto",
                direction: "vertical",
              },
            },
          });
          if(ww > 769){
            if(sw.length < 4){
              t.addClass('no-slider')
            }
          }
          sw.each(function(){
            var src = $(this).find('img').attr('src');
            $(this).click(function(){
              sw.not($(this)).removeClass('selected');
              $(this).addClass('selected');
              $('.produk-detail-photo .box-img .bg').attr('src', src);
            })
          })
          swiper.on('slideChange', function () {
            var activeSlide = swiper.slides[swiper.activeIndex];
            $(activeSlide).each(function(){
              var src = $(this).find('img').attr('src');
              console.log(src)
              $('.produk-detail-photo .box-img .bg').attr('src', src);
            })
          });
        });



        // Swiper
        var progressCircle;
        // const progressContent = document.querySelector(".autoplay-progress span");
        var slideImg = $('.homeSwiper .swiper-slide.swiper-slide-active img');
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
          },

        });
        swiper.on('slideChange', function () {
          var activeSlide = swiper.slides[swiper.activeIndex];
          var dimg = $(activeSlide).find('img');
          var ttl = dimg.data('title'),
              stl = dimg.data('subtitle'),
              btl = dimg.data('button-title'),
              btu = dimg.data('button-url');
          var hc = $('.home-masthead-content');
          hc.find('h1').text(ttl)
          hc.find('.container > span').text(stl)
          hc.find('.btn').attr('href', btu)
          hc.find('.btn').text(btl)

        });

        // var slideV = new Swiper(".sliderV", {
        //   direction: "vertical",

        // });


        // const progressContent = document.querySelector(".autoplay-progress span");
        var prdSwiper = new Swiper(".prdSwiper", {
          slidesPerView: 2,
          spaceBetween: 16,
          // loop: true,
          navigation: {
            nextEl: ".prdSwiper-next",
            prevEl: ".prdSwiper-prev",
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
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

        $('.produk-kategori-wrap').each(function(){
          var t = $(this),
              kt = t.find('.kategori-item');

          // if(kt.length >= 10){
          //   kt.addClass('swiper-slide');
          //   // kt.wrapAll('<div class="swiper-wrapper"></div>');
          //   // $('<div class="next-kat">Next Slider</div>').insertAfter('.swiper-wrapper');
          //   // $('<div class="prev-kat">Next Slider</div>').insertBefore('.swiper-wrapper');
          //  t =  new Swiper(".produk-kategori-wrap", {
          //     effect: "fade",
          //     navigation: {
          //       nextEl: $('body').find(".next-kat"),
          //       prevEl: $('body').find(".prev-kat"),
          //     },
          //   });
          // }

        });

        var curGall = 1;
        var gp = $('.galeri-page .grid-item');
        gp.each(function(){
          var t = $(this);
          t.click(function(){
            var di = $(this).data('index');
            curGall = di;
            console.log(curGall);
          })
        });
        $('#modalDetail').on('shown.bs.modal', function (e) {
          $('.modal-backdrop').addClass('bg-gallery');
          var defaultSwipper = new Swiper(".slider", {
            initialSlide: curGall,
            // effect: "fade",
            lazy: true,
            navigation: {
              nextEl: ".next-slider",
              prevEl: ".prev-slider",
            },
          });
          defaultSwipper.on('slideChange', function () {
            var activeSlide = defaultSwipper.slides[defaultSwipper.activeIndex];
            var dimg = $(activeSlide).find('img');
            var ttl = dimg.data('title'),
                stl = dimg.data('description');
            var conH = $('.slider').parents('.col-lg-7').siblings().find('.description h2');
            var conP = $('.slider').parents('.col-lg-7').siblings().find('.description article');
            conH.text(ttl);
            conP.html(stl);
          });
        })





    }; // end of func

    // Masonry
    // init Masonry
    var mw = $(window).width();
    var gutter = 0;
    if(mw > 1000){
      gutter = 24;
    }else{
      gutter = 12;
    }
    setTimeout(function() {
      var $grid = $('.grid-masonry').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer',
        gutter: gutter
      });
    }, 600);



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


    $('.produk-detail-info .btn-primary.btn-block').each(function(){
       // Mengambil id dari section yang ingin dituju
       const targetSection = $(this).attr("href");

       // Menghitung posisi scrollTop dari section yang dituju
       const targetOffset = $(targetSection).offset().top;

       // Animasi smooth scroll ke section yang dituju
       $("html, body").animate({ scrollTop: targetOffset }, 1000);
    })
    $(".btn-smooth").click(function () {

    });

    $('.despro-right').each(function(){
      var t = $(this),
          sm = t.find('.show-more-link');
          sl = t.find('.show-less-link');
      var fullDescription = "{{ description }}";
      sm.on('click', function(event) {
        event.preventDefault();
        $(this).parents('.excerpt').hide(); // Menghapus tautan "show more"
        $(this).parents('.excerpt').siblings().show();
        // $('article').append(fullDescription); // Menambahkan deskripsi lengkap
      });
      sl.on('click', function(event) {
        event.preventDefault();
        $(this).parents('.full').hide(); // Menghapus tautan "show more"
        $(this).parents('.full').siblings().show();
        // $('article').append(fullDescription); // Menambahkan deskripsi lengkap
      });
    })

    $('.swiperCategory').each(function(){
      var t = $(this),
          slider = t.find('.box-swiper'),
          nxt = t.find('.swiper-button-next'),
          prv = t.find('.swiper-button-prev');
      var swiper = new Swiper(slider[0], {
        // Swiper options and settings
        slidesPerView: "auto",
        spaceBetween: 8,
        navigation: {
          nextEl: nxt[0] ,
          prevEl: prv[0],
        },
      });
    })


    function CategoryDD(){
      // Deteksi perangkat tablet (lebar layar maksimum 768px)
      function isTablet() {
        return $(window).width() <= 928;
      }
      function isMobile() {
        return $(window).width() <= 767;
      }

      // Fungsi untuk menghasilkan dropdown category produk dari markup yang ada
      function generateCatProDropdown() {
        var $dropdown = $('<select class="catpro-dropdown select" data-show-content="true"></select>');
        $('.produk-kategori-wrap .kategori-item').each(function () {
          var facilityName = $(this).text();
          var facilityLink = $(this).attr('href');
          // var ic = new XMLSerializer().serializeToString(facilityIcon[0]);
          // $dropdown.append($('<option></option>').attr('value', facilityLink).text(facilityName));
          if($(this).hasClass('active')){
            $dropdown.append($('<option selected></option>').attr('value', facilityName).text(facilityName));
          }else{
            $dropdown.append($('<option></option>').attr('value', facilityName).text(facilityName));
          }
        });

        return $dropdown;
      }

      // Fungsi untuk menampilkan daftar category produk atau dropdown sesuai mode
      function toggleCatPro() {
        if (isMobile()) {
          $('.catpro-dropdown').remove(); // Hapus dropdown jika sudah ada sebelumnya
          var $dropdown = generateCatProDropdown();
          $('.produk-list-filter .filter-mobile').append($dropdown); // Tambahkan dropdown setelah daftar fasilitas
          var select = $dropdown,
              size = (select.data('size') !== undefined) ? select.data('size') : 4;
          select.selectpicker({
            style: 'select-control',
            size: size,
            width: "100%",
          });
          $(select).on('change', function() {
            var val = $(this).val();
            var katiem = $('.produk-kategori .kategori-item:contains("'+ val +'")').attr('href');
            // katiem.trigger('click');
            window.location.href = katiem
          });
        } else {
          // $('.proyek-status').show();
          $('.status-dropdown').remove(); // Hapus dropdown jika sudah ada sebelumnya
        }
      }

      // Fungsi untuk menghasilkan dropdown fasilitas dari markup yang ada
      function generateFacilitiesDropdown() {
        var $dropdown = $('<select class="status-dropdown select" data-show-content="true"></select>');
        $('.proyek-status a').each(function () {
          var facilityName = $(this).text();
          var facilityIcon = $(this).find('.icon');
          var facilityLink = $(this).attr('href');
          var ic = new XMLSerializer().serializeToString(facilityIcon[0]);
          // $dropdown.append($('<option></option>').attr('value', facilityLink).text(facilityName));
          $dropdown.append($('<option></option>').attr('data-content', ic + facilityName));
          console.log(facilityIcon[0]);
        });

        return $dropdown;
      }

      // Fungsi untuk menampilkan daftar fasilitas atau dropdown sesuai mode
      function toggleFacilities() {
        if (isMobile()) {
          $('.proyek-status').hide();
          $('.status-dropdown').remove(); // Hapus dropdown jika sudah ada sebelumnya
          var $dropdown = generateFacilitiesDropdown();
          console.log($dropdown)
          $('.proyek-status').after($dropdown); // Tambahkan dropdown setelah daftar fasilitas
          var select = $dropdown,
              size = (select.data('size') !== undefined) ? select.data('size') : 4;
          select.selectpicker({
            style: 'select-control',
            size: size,
            liveSearchPlaceholder: 'Search here..',
            width: "100%",
          });
        } else {
          $('.proyek-status').show();
          $('.status-dropdown').remove(); // Hapus dropdown jika sudah ada sebelumnya
        }
      }

      // Panggil fungsi saat halaman dimuat
      toggleFacilities();
      toggleCatPro();

      // Panggil fungsi saat ukuran layar berubah (misalnya saat berpindah antara mode desktop dan tablet)
      $(window).resize(function () {
        toggleFacilities();
        toggleCatPro();
      });

      // Fungsi untuk menemukan indeks elemen <li> yang sesuai dengan nilai pilihan dropdown
      function findMatchingLiIndex(value) {
        var index = -1;
        $('.proyek-status a').each(function (idx) {
          var facilityLink = $(this).find('a').attr('href');
          if (facilityLink === value) {
            index = idx;
            return false; // Keluar dari loop jika elemen ditemukan
          }
        });
        return index;
      }

      // Fungsi untuk mengeklik elemen <li> yang sesuai berdasarkan pilihan dropdown
      function triggerMatchingLi() {
        var selectedValue = $('.status-dropdown').val();
        var matchingLiIndex = findMatchingLiIndex(selectedValue);
        if (matchingLiIndex !== -1) {
          var $matchingLi = $('.facilities-list li').eq(matchingLiIndex);
          $matchingLi.find('a').trigger('click');
        }
      }

      // Panggil fungsi saat pilihan dropdown diubah
      $(document).on('change', '.status-dropdown', function () {
        triggerMatchingLi();
      });

    }
    setTimeout(function() {
      CategoryDD();
    }, 600);


  })(); // end of function()


});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgICBqUXVlcnkoJ2ltZy5zdmcnKS5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyICRpbWcgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICAgIHZhciBpbWdDbGFzcyA9ICRpbWcuYXR0cignY2xhc3MnKTtcclxuICAgICAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICB2YXIgJHN2ZyA9IGpRdWVyeShkYXRhKS5maW5kKCdzdmcnKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKCd4bWxuczphJyk7XHJcbiAgICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICAgIH0sICd4bWwnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBpbml0U2VsZWN0KCl7XHJcbiAgICAgICAgJCgnLnNlbGVjdCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHNlbGVjdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHNpemUgPSAoc2VsZWN0LmRhdGEoJ3NpemUnKSAhPT0gdW5kZWZpbmVkKSA/IHNlbGVjdC5kYXRhKCdzaXplJykgOiA0O1xyXG4gICAgICAgICAgc2VsZWN0LnNlbGVjdHBpY2tlcih7XHJcbiAgICAgICAgICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgICAgICAgICBzaXplOiBzaXplLFxyXG4gICAgICAgICAgICBsaXZlU2VhcmNoUGxhY2Vob2xkZXI6ICdTZWFyY2ggaGVyZS4uJyxcclxuICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaW5pdFNlbGVjdCgpO1xyXG5cclxuICAgICAgJCgnLmN0YV9hbnN3ZXIgLnNlbGVjdCcpLm9uKCdjaGFuZ2VkLmJzLnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgfSk7XHJcbiAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKClcclxuXHJcblxyXG4gICAgICBmdW5jKCk7XHJcblxyXG5cclxuICAgIH1cclxuICAgIGluaXQoKTsgLy8gZW5kIG9mIGluaXQoKVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgICB2YXIgd3cgPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHJcbiAgICAgIHZhciBoZWFkZXIgPSBqUXVlcnkoJy5oZWFkZXInKSxcclxuICAgICAgICAgIHBvcyA9IGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICB2YXIgbGFzdFNjcm9sbCA9IDA7XHJcbiAgICAgICAgalF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciBzY3JvbGwgPSBqUXVlcnkod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgIGlmIChzY3JvbGwgPiA1KSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzY3JvbGwgPiBsYXN0U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcygnc2hvdy10b3AnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnc2hvdy10b3AnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxhc3RTY3JvbGwgPSBzY3JvbGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGpRdWVyeSgnLm1vYmlsZS1tZW51JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgalF1ZXJ5KCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAvLyBNZW51dHVwIHN1YiBtZW51IGppa2EgbWVuZ2tsaWsgZGkgYXJlYSBrb3NvbmdcclxuICAgICAgICAgIGlmICghdGFyZ2V0LmNsb3Nlc3QoJy5tZW51LWl0ZW0uaGFzLXN1YicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcubWVudS1pdGVtLmhhcy1zdWInKS5yZW1vdmVDbGFzcygnc3ViLW1lbnUtb3BlbicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5tZW51LWl0ZW0uaGFzLXN1YicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgdyA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGlzT3BlbiA9ICQodGhpcykuaGFzQ2xhc3MoJ3N1Yi1tZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgLy8gTWVudXR1cCBzdWIgbWVudSBsYWluIHNlYmVsdW0gbWVtYnVrYSBzdWIgbWVudSBiYXJ1XHJcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0uaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzdWItbWVudS1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc3ViLW1lbnUtb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICQoJy5oZWFkZXItc2VhcmNoJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgIGljID0gdC5maW5kKCcuc2MtdHJpZ2dlcicpO1xyXG4gICAgICAgICAgaWMuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdzZWFyY2gtc2hvdycpXHJcbiAgICAgICAgICAgIGlmKCEkKCdoZWFkZXInKS5oYXNDbGFzcygnZml4ZWQnKSl7XHJcbiAgICAgICAgICAgICAgJCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYod3cgPiAxMDAwKXtcclxuICAgICAgICAgICQoJy5tYWluLW1lbnUgLm1lbnUtaXRlbS5oYXMtc3ViJykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIE1lbmdoYXB1cyBrZWxhcyAnaG92ZXJlZCcgZGFyaSBzZW11YSBlbGVtZW4gaGVhZGVyIHNlYmVsdW1ueWFcclxuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdob3ZlcmVkLXN1Ym1lbnUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1lbmFtYmFoa2FuIGtlbGFzICdob3ZlcmVkJyBwYWRhIGhlYWRlciBzYWF0IG1lbmdhcmFoa2FuIGt1cnNvciBwYWRhIG1lbnUgeWFuZyBtZW1pbGlraSBzdWJtZW51XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhlYWRlcicpLmFkZENsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdob3ZlcmVkLXN1Ym1lbnUnKTtcclxuICAgICAgICAgICAgLy8gTWVuZ2hhcHVzIGtlbGFzICdob3ZlcmVkJyBkYXJpIGhlYWRlciBzYWF0IGt1cnNvciB0aWRhayBsYWdpIG1lbmdhcmFoIHBhZGEgbWVudSB5YW5nIG1lbWlsaWtpIHN1Ym1lbnVcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2hvdmVyZWQnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgJCgnLm1haW4tbWVudSAubWVudS1pdGVtLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2EnKTtcclxuICAgICAgICAgICAgICAvLyAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2hvdmVyZWQtc3VibWVudScpO1xyXG4gICAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhlYWRlcicpLnRvZ2dsZUNsYXNzKCdob3ZlcmVkJyk7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdDtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gS2F0ZWdvcmlcclxuICAgICAgICAkKCcucHJvZHVrLWthdGVnb3JpLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgaSA9IHQuZmluZCgnLmthdGVnb3JpLWl0ZW0nKTtcclxuICAgICAgICAgIGkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgaS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBUaHVtYm5haWwgUHJvZHVrXHJcbiAgICAgICAgJCgnLnBob3RvLXRodW1ibmFpbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICBzbGlkZXIgPSB0LmZpbmQoJy5ib3gtc3dpcGVyJyk7XHJcbiAgICAgICAgICAgICAgbnh0ID0gJCgnLm5leHQtc2xpZGVyVicpLFxyXG4gICAgICAgICAgICAgIHBydiA9ICQoJy5wcmV2LXNsaWRlclYnKSxcclxuICAgICAgICAgICAgICBzdyA9IHQuZmluZCgnLnN3aXBlci1zbGlkZScpO1xyXG4gICAgICAgICAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyWzBdLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIsXHJcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbmV4dEVsOiBueHRbMF0gLFxyXG4gICAgICAgICAgICAgIHByZXZFbDogcHJ2WzBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgIDY0MDoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEyLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgMTAyNDoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmKHd3ID4gNzY5KXtcclxuICAgICAgICAgICAgaWYoc3cubGVuZ3RoIDwgNCl7XHJcbiAgICAgICAgICAgICAgdC5hZGRDbGFzcygnbm8tc2xpZGVyJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3cuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gJCh0aGlzKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHN3Lm5vdCgkKHRoaXMpKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICQoJy5wcm9kdWstZGV0YWlsLXBob3RvIC5ib3gtaW1nIC5iZycpLmF0dHIoJ3NyYycsIHNyYyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc3dpcGVyLm9uKCdzbGlkZUNoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZVNsaWRlID0gc3dpcGVyLnNsaWRlc1tzd2lwZXIuYWN0aXZlSW5kZXhdO1xyXG4gICAgICAgICAgICAkKGFjdGl2ZVNsaWRlKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgdmFyIHNyYyA9ICQodGhpcykuZmluZCgnaW1nJykuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc3JjKVxyXG4gICAgICAgICAgICAgICQoJy5wcm9kdWstZGV0YWlsLXBob3RvIC5ib3gtaW1nIC5iZycpLmF0dHIoJ3NyYycsIHNyYyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyBTd2lwZXJcclxuICAgICAgICB2YXIgcHJvZ3Jlc3NDaXJjbGU7XHJcbiAgICAgICAgLy8gY29uc3QgcHJvZ3Jlc3NDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRvcGxheS1wcm9ncmVzcyBzcGFuXCIpO1xyXG4gICAgICAgIHZhciBzbGlkZUltZyA9ICQoJy5ob21lU3dpcGVyIC5zd2lwZXItc2xpZGUuc3dpcGVyLXNsaWRlLWFjdGl2ZSBpbWcnKTtcclxuICAgICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5ob21lU3dpcGVyXCIsIHtcclxuICAgICAgICAgIGVmZmVjdDogXCJmYWRlXCIsXHJcbiAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICBlbDogXCIuc3dpcGVyLXBhZ2luYXRpb25cIixcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBkeW5hbWljQnVsbGV0czogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXV0b3BsYXk6IHtcclxuICAgICAgICAgICAgZGVsYXk6IDMwMDAsXHJcbiAgICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgLy8gS29kZSB5YW5nIGFrYW4gZGlqYWxhbmthbiBzYWF0IFN3aXBlciBzZWxlc2FpIG1lbXVhdFxyXG4gICAgICAgICAgICAgICQoJy5zd2lwZXItcGFnaW5hdGlvbiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0JykuYXBwZW5kKCc8c3ZnIHZpZXdCb3g9XCIwIDAgNDggNDhcIj48Y2lyY2xlIGN4PVwiMjRcIiBjeT1cIjI0XCIgcj1cIjIwXCI+PC9jaXJjbGU+PC9zdmc+Jyk7XHJcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NDaXJjbGUgPSAkKCdib2R5JykuZmluZChcIi5zd2lwZXItcGFnaW5hdGlvbiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHN2Z1wiKTtcclxuICAgICAgICAgICAgICAvLyBMYWt1a2FuIHRpbmRha2FuIGxhaW4geWFuZyBBbmRhIGluZ2lua2FuLi4uXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dG9wbGF5VGltZUxlZnQocywgdGltZSwgcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBwcm9ncmVzc0NpcmNsZS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQuY3NzKFwiLS1wcm9ncmVzc1wiLCAxIC0gcHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN3aXBlci5vbignc2xpZGVDaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgYWN0aXZlU2xpZGUgPSBzd2lwZXIuc2xpZGVzW3N3aXBlci5hY3RpdmVJbmRleF07XHJcbiAgICAgICAgICB2YXIgZGltZyA9ICQoYWN0aXZlU2xpZGUpLmZpbmQoJ2ltZycpO1xyXG4gICAgICAgICAgdmFyIHR0bCA9IGRpbWcuZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgICAgICBzdGwgPSBkaW1nLmRhdGEoJ3N1YnRpdGxlJyksXHJcbiAgICAgICAgICAgICAgYnRsID0gZGltZy5kYXRhKCdidXR0b24tdGl0bGUnKSxcclxuICAgICAgICAgICAgICBidHUgPSBkaW1nLmRhdGEoJ2J1dHRvbi11cmwnKTtcclxuICAgICAgICAgIHZhciBoYyA9ICQoJy5ob21lLW1hc3RoZWFkLWNvbnRlbnQnKTtcclxuICAgICAgICAgIGhjLmZpbmQoJ2gxJykudGV4dCh0dGwpXHJcbiAgICAgICAgICBoYy5maW5kKCcuY29udGFpbmVyID4gc3BhbicpLnRleHQoc3RsKVxyXG4gICAgICAgICAgaGMuZmluZCgnLmJ0bicpLmF0dHIoJ2hyZWYnLCBidHUpXHJcbiAgICAgICAgICBoYy5maW5kKCcuYnRuJykudGV4dChidGwpXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB2YXIgc2xpZGVWID0gbmV3IFN3aXBlcihcIi5zbGlkZXJWXCIsIHtcclxuICAgICAgICAvLyAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG5cclxuICAgICAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIGNvbnN0IHByb2dyZXNzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0b3BsYXktcHJvZ3Jlc3Mgc3BhblwiKTtcclxuICAgICAgICB2YXIgcHJkU3dpcGVyID0gbmV3IFN3aXBlcihcIi5wcmRTd2lwZXJcIiwge1xyXG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAvLyBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6IFwiLnByZFN3aXBlci1uZXh0XCIsXHJcbiAgICAgICAgICAgIHByZXZFbDogXCIucHJkU3dpcGVyLXByZXZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICA2NDA6IHtcclxuICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgMTAyNDoge1xyXG4gICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDUsXHJcbiAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBMb2dpbnN3aXBlciA9IG5ldyBTd2lwZXIoXCIuc3dpcGVyXCIsIHtcclxuICAgICAgICAgIGVmZmVjdDogXCJmYWRlXCIsXHJcbiAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICBlbDogXCIuc3dpcGVyLXBhZ2luYXRpb25cIixcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBkeW5hbWljQnVsbGV0czogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXV0b3BsYXk6IHtcclxuICAgICAgICAgICAgZGVsYXk6IDMwMDAsXHJcbiAgICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgLy8gS29kZSB5YW5nIGFrYW4gZGlqYWxhbmthbiBzYWF0IFN3aXBlciBzZWxlc2FpIG1lbXVhdFxyXG4gICAgICAgICAgICAgICQoJy5zd2lwZXItcGFnaW5hdGlvbiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0JykuYXBwZW5kKCc8c3ZnIHZpZXdCb3g9XCIwIDAgNDggNDhcIj48Y2lyY2xlIGN4PVwiMjRcIiBjeT1cIjI0XCIgcj1cIjIwXCI+PC9jaXJjbGU+PC9zdmc+Jyk7XHJcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NDaXJjbGUgPSAkKCdib2R5JykuZmluZChcIi5zd2lwZXItcGFnaW5hdGlvbiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHN2Z1wiKTtcclxuICAgICAgICAgICAgICAvLyBMYWt1a2FuIHRpbmRha2FuIGxhaW4geWFuZyBBbmRhIGluZ2lua2FuLi4uXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dG9wbGF5VGltZUxlZnQocywgdGltZSwgcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBwcm9ncmVzc0NpcmNsZS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQuY3NzKFwiLS1wcm9ncmVzc1wiLCAxIC0gcHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1ay1rYXRlZ29yaS13cmFwJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgIGt0ID0gdC5maW5kKCcua2F0ZWdvcmktaXRlbScpO1xyXG5cclxuICAgICAgICAgIC8vIGlmKGt0Lmxlbmd0aCA+PSAxMCl7XHJcbiAgICAgICAgICAvLyAgIGt0LmFkZENsYXNzKCdzd2lwZXItc2xpZGUnKTtcclxuICAgICAgICAgIC8vICAgLy8ga3Qud3JhcEFsbCgnPGRpdiBjbGFzcz1cInN3aXBlci13cmFwcGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAvLyAgIC8vICQoJzxkaXYgY2xhc3M9XCJuZXh0LWthdFwiPk5leHQgU2xpZGVyPC9kaXY+JykuaW5zZXJ0QWZ0ZXIoJy5zd2lwZXItd3JhcHBlcicpO1xyXG4gICAgICAgICAgLy8gICAvLyAkKCc8ZGl2IGNsYXNzPVwicHJldi1rYXRcIj5OZXh0IFNsaWRlcjwvZGl2PicpLmluc2VydEJlZm9yZSgnLnN3aXBlci13cmFwcGVyJyk7XHJcbiAgICAgICAgICAvLyAgdCA9ICBuZXcgU3dpcGVyKFwiLnByb2R1ay1rYXRlZ29yaS13cmFwXCIsIHtcclxuICAgICAgICAgIC8vICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxyXG4gICAgICAgICAgLy8gICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgIC8vICAgICAgIG5leHRFbDogJCgnYm9keScpLmZpbmQoXCIubmV4dC1rYXRcIiksXHJcbiAgICAgICAgICAvLyAgICAgICBwcmV2RWw6ICQoJ2JvZHknKS5maW5kKFwiLnByZXYta2F0XCIpLFxyXG4gICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAvLyAgIH0pO1xyXG4gICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGN1ckdhbGwgPSAxO1xyXG4gICAgICAgIHZhciBncCA9ICQoJy5nYWxlcmktcGFnZSAuZ3JpZC1pdGVtJyk7XHJcbiAgICAgICAgZ3AuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgdC5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZGkgPSAkKHRoaXMpLmRhdGEoJ2luZGV4Jyk7XHJcbiAgICAgICAgICAgIGN1ckdhbGwgPSBkaTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VyR2FsbCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNtb2RhbERldGFpbCcpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5hZGRDbGFzcygnYmctZ2FsbGVyeScpO1xyXG4gICAgICAgICAgdmFyIGRlZmF1bHRTd2lwcGVyID0gbmV3IFN3aXBlcihcIi5zbGlkZXJcIiwge1xyXG4gICAgICAgICAgICBpbml0aWFsU2xpZGU6IGN1ckdhbGwsXHJcbiAgICAgICAgICAgIC8vIGVmZmVjdDogXCJmYWRlXCIsXHJcbiAgICAgICAgICAgIGxhenk6IHRydWUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICBuZXh0RWw6IFwiLm5leHQtc2xpZGVyXCIsXHJcbiAgICAgICAgICAgICAgcHJldkVsOiBcIi5wcmV2LXNsaWRlclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkZWZhdWx0U3dpcHBlci5vbignc2xpZGVDaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVTbGlkZSA9IGRlZmF1bHRTd2lwcGVyLnNsaWRlc1tkZWZhdWx0U3dpcHBlci5hY3RpdmVJbmRleF07XHJcbiAgICAgICAgICAgIHZhciBkaW1nID0gJChhY3RpdmVTbGlkZSkuZmluZCgnaW1nJyk7XHJcbiAgICAgICAgICAgIHZhciB0dGwgPSBkaW1nLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgICBzdGwgPSBkaW1nLmRhdGEoJ2Rlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgICAgIHZhciBjb25IID0gJCgnLnNsaWRlcicpLnBhcmVudHMoJy5jb2wtbGctNycpLnNpYmxpbmdzKCkuZmluZCgnLmRlc2NyaXB0aW9uIGgyJyk7XHJcbiAgICAgICAgICAgIHZhciBjb25QID0gJCgnLnNsaWRlcicpLnBhcmVudHMoJy5jb2wtbGctNycpLnNpYmxpbmdzKCkuZmluZCgnLmRlc2NyaXB0aW9uIGFydGljbGUnKTtcclxuICAgICAgICAgICAgY29uSC50ZXh0KHR0bCk7XHJcbiAgICAgICAgICAgIGNvblAuaHRtbChzdGwpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgfTsgLy8gZW5kIG9mIGZ1bmNcclxuXHJcbiAgICAvLyBNYXNvbnJ5XHJcbiAgICAvLyBpbml0IE1hc29ucnlcclxuICAgIHZhciBtdyA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgdmFyIGd1dHRlciA9IDA7XHJcbiAgICBpZihtdyA+IDEwMDApe1xyXG4gICAgICBndXR0ZXIgPSAyNDtcclxuICAgIH1lbHNle1xyXG4gICAgICBndXR0ZXIgPSAxMjtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciAkZ3JpZCA9ICQoJy5ncmlkLW1hc29ucnknKS5tYXNvbnJ5KHtcclxuICAgICAgICBpdGVtU2VsZWN0b3I6ICcuZ3JpZC1pdGVtJyxcclxuICAgICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXHJcbiAgICAgICAgY29sdW1uV2lkdGg6ICcuZ3JpZC1zaXplcicsXHJcbiAgICAgICAgZ3V0dGVyOiBndXR0ZXJcclxuICAgICAgfSk7XHJcbiAgICB9LCA2MDApO1xyXG5cclxuXHJcblxyXG4gICAgLy8gU2hvdyBIaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcucHN3ZCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgcyA9IHQuZmluZCgnLnNoLXB3ZCcpLFxyXG4gICAgICAgICAgZiA9IHQuZmluZCgnLmZvcm0tY29udHJvbCcpO1xyXG4gICAgICBzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoIXQuaGFzQ2xhc3MoJ3Nob3cnKSl7XHJcbiAgICAgICAgICB0LmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICBmLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdC5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgZi5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5wcm95ZWstbGlzdC13cmFwJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBwaSA9IHQuZmluZCgnLnByb3llay1pdGVtJyksXHJcbiAgICAgICAgICBleGNvbCA9IHBpLmZpbmQoJy5leGNvbCcpO1xyXG4gICAgICBleGNvbC5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0dD0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFBpID0gJCh0aGlzKS5wYXJlbnRzKCcucHJveWVrLWl0ZW0nKTtcclxuICAgICAgICBwaS5ub3QoY2xpY2tlZFBpKS5yZW1vdmVDbGFzcygnZXhwYW5kJyk7XHJcbiAgICAgICAgaWYoY2xpY2tlZFBpLmhhc0NsYXNzKCdleHBhbmQnKSl7XHJcbiAgICAgICAgICB0dC5odG1sKCdMaWhhdCBkZXRhaWwnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHR0Lmh0bWwoJ0xpaGF0IGxlYmloIHNpbmdrYXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGkubm90KGNsaWNrZWRQaSkuZmluZCgnLmV4Y29sJykuaHRtbCgnTGloYXQgZGV0YWlsJyk7XHJcbiAgICAgICAgY2xpY2tlZFBpLnRvZ2dsZUNsYXNzKCdleHBhbmQnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCgnLnByb2R1ay1kZXRhaWwtaW5mbyAuYnRuLXByaW1hcnkuYnRuLWJsb2NrJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgLy8gTWVuZ2FtYmlsIGlkIGRhcmkgc2VjdGlvbiB5YW5nIGluZ2luIGRpdHVqdVxyXG4gICAgICAgY29uc3QgdGFyZ2V0U2VjdGlvbiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcblxyXG4gICAgICAgLy8gTWVuZ2hpdHVuZyBwb3Npc2kgc2Nyb2xsVG9wIGRhcmkgc2VjdGlvbiB5YW5nIGRpdHVqdVxyXG4gICAgICAgY29uc3QgdGFyZ2V0T2Zmc2V0ID0gJCh0YXJnZXRTZWN0aW9uKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgLy8gQW5pbWFzaSBzbW9vdGggc2Nyb2xsIGtlIHNlY3Rpb24geWFuZyBkaXR1anVcclxuICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRhcmdldE9mZnNldCB9LCAxMDAwKTtcclxuICAgIH0pXHJcbiAgICAkKFwiLmJ0bi1zbW9vdGhcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5kZXNwcm8tcmlnaHQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNtID0gdC5maW5kKCcuc2hvdy1tb3JlLWxpbmsnKTtcclxuICAgICAgICAgIHNsID0gdC5maW5kKCcuc2hvdy1sZXNzLWxpbmsnKTtcclxuICAgICAgdmFyIGZ1bGxEZXNjcmlwdGlvbiA9IFwie3sgZGVzY3JpcHRpb24gfX1cIjtcclxuICAgICAgc20ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50cygnLmV4Y2VycHQnKS5oaWRlKCk7IC8vIE1lbmdoYXB1cyB0YXV0YW4gXCJzaG93IG1vcmVcIlxyXG4gICAgICAgICQodGhpcykucGFyZW50cygnLmV4Y2VycHQnKS5zaWJsaW5ncygpLnNob3coKTtcclxuICAgICAgICAvLyAkKCdhcnRpY2xlJykuYXBwZW5kKGZ1bGxEZXNjcmlwdGlvbik7IC8vIE1lbmFtYmFoa2FuIGRlc2tyaXBzaSBsZW5na2FwXHJcbiAgICAgIH0pO1xyXG4gICAgICBzbC5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuZnVsbCcpLmhpZGUoKTsgLy8gTWVuZ2hhcHVzIHRhdXRhbiBcInNob3cgbW9yZVwiXHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuZnVsbCcpLnNpYmxpbmdzKCkuc2hvdygpO1xyXG4gICAgICAgIC8vICQoJ2FydGljbGUnKS5hcHBlbmQoZnVsbERlc2NyaXB0aW9uKTsgLy8gTWVuYW1iYWhrYW4gZGVza3JpcHNpIGxlbmdrYXBcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5zd2lwZXJDYXRlZ29yeScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgc2xpZGVyID0gdC5maW5kKCcuYm94LXN3aXBlcicpLFxyXG4gICAgICAgICAgbnh0ID0gdC5maW5kKCcuc3dpcGVyLWJ1dHRvbi1uZXh0JyksXHJcbiAgICAgICAgICBwcnYgPSB0LmZpbmQoJy5zd2lwZXItYnV0dG9uLXByZXYnKTtcclxuICAgICAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyWzBdLCB7XHJcbiAgICAgICAgLy8gU3dpcGVyIG9wdGlvbnMgYW5kIHNldHRpbmdzXHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgIG5leHRFbDogbnh0WzBdICxcclxuICAgICAgICAgIHByZXZFbDogcHJ2WzBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gQ2F0ZWdvcnlERCgpe1xyXG4gICAgICAvLyBEZXRla3NpIHBlcmFuZ2thdCB0YWJsZXQgKGxlYmFyIGxheWFyIG1ha3NpbXVtIDc2OHB4KVxyXG4gICAgICBmdW5jdGlvbiBpc1RhYmxldCgpIHtcclxuICAgICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgPD0gOTI4O1xyXG4gICAgICB9XHJcbiAgICAgIGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gICAgICAgIHJldHVybiAkKHdpbmRvdykud2lkdGgoKSA8PSA3Njc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZ1bmdzaSB1bnR1ayBtZW5naGFzaWxrYW4gZHJvcGRvd24gY2F0ZWdvcnkgcHJvZHVrIGRhcmkgbWFya3VwIHlhbmcgYWRhXHJcbiAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlQ2F0UHJvRHJvcGRvd24oKSB7XHJcbiAgICAgICAgdmFyICRkcm9wZG93biA9ICQoJzxzZWxlY3QgY2xhc3M9XCJjYXRwcm8tZHJvcGRvd24gc2VsZWN0XCIgZGF0YS1zaG93LWNvbnRlbnQ9XCJ0cnVlXCI+PC9zZWxlY3Q+Jyk7XHJcbiAgICAgICAgJCgnLnByb2R1ay1rYXRlZ29yaS13cmFwIC5rYXRlZ29yaS1pdGVtJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgZmFjaWxpdHlOYW1lID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICB2YXIgZmFjaWxpdHlMaW5rID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAvLyB2YXIgaWMgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKGZhY2lsaXR5SWNvblswXSk7XHJcbiAgICAgICAgICAvLyAkZHJvcGRvd24uYXBwZW5kKCQoJzxvcHRpb24+PC9vcHRpb24+JykuYXR0cigndmFsdWUnLCBmYWNpbGl0eUxpbmspLnRleHQoZmFjaWxpdHlOYW1lKSk7XHJcbiAgICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgICRkcm9wZG93bi5hcHBlbmQoJCgnPG9wdGlvbiBzZWxlY3RlZD48L29wdGlvbj4nKS5hdHRyKCd2YWx1ZScsIGZhY2lsaXR5TmFtZSkudGV4dChmYWNpbGl0eU5hbWUpKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZHJvcGRvd24uYXBwZW5kKCQoJzxvcHRpb24+PC9vcHRpb24+JykuYXR0cigndmFsdWUnLCBmYWNpbGl0eU5hbWUpLnRleHQoZmFjaWxpdHlOYW1lKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAkZHJvcGRvd247XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZ1bmdzaSB1bnR1ayBtZW5hbXBpbGthbiBkYWZ0YXIgY2F0ZWdvcnkgcHJvZHVrIGF0YXUgZHJvcGRvd24gc2VzdWFpIG1vZGVcclxuICAgICAgZnVuY3Rpb24gdG9nZ2xlQ2F0UHJvKCkge1xyXG4gICAgICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAkKCcuY2F0cHJvLWRyb3Bkb3duJykucmVtb3ZlKCk7IC8vIEhhcHVzIGRyb3Bkb3duIGppa2Egc3VkYWggYWRhIHNlYmVsdW1ueWFcclxuICAgICAgICAgIHZhciAkZHJvcGRvd24gPSBnZW5lcmF0ZUNhdFByb0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICAkKCcucHJvZHVrLWxpc3QtZmlsdGVyIC5maWx0ZXItbW9iaWxlJykuYXBwZW5kKCRkcm9wZG93bik7IC8vIFRhbWJhaGthbiBkcm9wZG93biBzZXRlbGFoIGRhZnRhciBmYXNpbGl0YXNcclxuICAgICAgICAgIHZhciBzZWxlY3QgPSAkZHJvcGRvd24sXHJcbiAgICAgICAgICAgICAgc2l6ZSA9IChzZWxlY3QuZGF0YSgnc2l6ZScpICE9PSB1bmRlZmluZWQpID8gc2VsZWN0LmRhdGEoJ3NpemUnKSA6IDQ7XHJcbiAgICAgICAgICBzZWxlY3Quc2VsZWN0cGlja2VyKHtcclxuICAgICAgICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgICAgICAgIHNpemU6IHNpemUsXHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJChzZWxlY3QpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBrYXRpZW0gPSAkKCcucHJvZHVrLWthdGVnb3JpIC5rYXRlZ29yaS1pdGVtOmNvbnRhaW5zKFwiJysgdmFsICsnXCIpJykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAvLyBrYXRpZW0udHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBrYXRpZW1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAkKCcucHJveWVrLXN0YXR1cycpLnNob3coKTtcclxuICAgICAgICAgICQoJy5zdGF0dXMtZHJvcGRvd24nKS5yZW1vdmUoKTsgLy8gSGFwdXMgZHJvcGRvd24gamlrYSBzdWRhaCBhZGEgc2ViZWx1bW55YVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRnVuZ3NpIHVudHVrIG1lbmdoYXNpbGthbiBkcm9wZG93biBmYXNpbGl0YXMgZGFyaSBtYXJrdXAgeWFuZyBhZGFcclxuICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVGYWNpbGl0aWVzRHJvcGRvd24oKSB7XHJcbiAgICAgICAgdmFyICRkcm9wZG93biA9ICQoJzxzZWxlY3QgY2xhc3M9XCJzdGF0dXMtZHJvcGRvd24gc2VsZWN0XCIgZGF0YS1zaG93LWNvbnRlbnQ9XCJ0cnVlXCI+PC9zZWxlY3Q+Jyk7XHJcbiAgICAgICAgJCgnLnByb3llay1zdGF0dXMgYScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIGZhY2lsaXR5TmFtZSA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgdmFyIGZhY2lsaXR5SWNvbiA9ICQodGhpcykuZmluZCgnLmljb24nKTtcclxuICAgICAgICAgIHZhciBmYWNpbGl0eUxpbmsgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgIHZhciBpYyA9IG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoZmFjaWxpdHlJY29uWzBdKTtcclxuICAgICAgICAgIC8vICRkcm9wZG93bi5hcHBlbmQoJCgnPG9wdGlvbj48L29wdGlvbj4nKS5hdHRyKCd2YWx1ZScsIGZhY2lsaXR5TGluaykudGV4dChmYWNpbGl0eU5hbWUpKTtcclxuICAgICAgICAgICRkcm9wZG93bi5hcHBlbmQoJCgnPG9wdGlvbj48L29wdGlvbj4nKS5hdHRyKCdkYXRhLWNvbnRlbnQnLCBpYyArIGZhY2lsaXR5TmFtZSkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZmFjaWxpdHlJY29uWzBdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICRkcm9wZG93bjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRnVuZ3NpIHVudHVrIG1lbmFtcGlsa2FuIGRhZnRhciBmYXNpbGl0YXMgYXRhdSBkcm9wZG93biBzZXN1YWkgbW9kZVxyXG4gICAgICBmdW5jdGlvbiB0b2dnbGVGYWNpbGl0aWVzKCkge1xyXG4gICAgICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAkKCcucHJveWVrLXN0YXR1cycpLmhpZGUoKTtcclxuICAgICAgICAgICQoJy5zdGF0dXMtZHJvcGRvd24nKS5yZW1vdmUoKTsgLy8gSGFwdXMgZHJvcGRvd24gamlrYSBzdWRhaCBhZGEgc2ViZWx1bW55YVxyXG4gICAgICAgICAgdmFyICRkcm9wZG93biA9IGdlbmVyYXRlRmFjaWxpdGllc0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygkZHJvcGRvd24pXHJcbiAgICAgICAgICAkKCcucHJveWVrLXN0YXR1cycpLmFmdGVyKCRkcm9wZG93bik7IC8vIFRhbWJhaGthbiBkcm9wZG93biBzZXRlbGFoIGRhZnRhciBmYXNpbGl0YXNcclxuICAgICAgICAgIHZhciBzZWxlY3QgPSAkZHJvcGRvd24sXHJcbiAgICAgICAgICAgICAgc2l6ZSA9IChzZWxlY3QuZGF0YSgnc2l6ZScpICE9PSB1bmRlZmluZWQpID8gc2VsZWN0LmRhdGEoJ3NpemUnKSA6IDQ7XHJcbiAgICAgICAgICBzZWxlY3Quc2VsZWN0cGlja2VyKHtcclxuICAgICAgICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgICAgICAgIHNpemU6IHNpemUsXHJcbiAgICAgICAgICAgIGxpdmVTZWFyY2hQbGFjZWhvbGRlcjogJ1NlYXJjaCBoZXJlLi4nLFxyXG4gICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJCgnLnByb3llay1zdGF0dXMnKS5zaG93KCk7XHJcbiAgICAgICAgICAkKCcuc3RhdHVzLWRyb3Bkb3duJykucmVtb3ZlKCk7IC8vIEhhcHVzIGRyb3Bkb3duIGppa2Egc3VkYWggYWRhIHNlYmVsdW1ueWFcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFBhbmdnaWwgZnVuZ3NpIHNhYXQgaGFsYW1hbiBkaW11YXRcclxuICAgICAgdG9nZ2xlRmFjaWxpdGllcygpO1xyXG4gICAgICB0b2dnbGVDYXRQcm8oKTtcclxuXHJcbiAgICAgIC8vIFBhbmdnaWwgZnVuZ3NpIHNhYXQgdWt1cmFuIGxheWFyIGJlcnViYWggKG1pc2FsbnlhIHNhYXQgYmVycGluZGFoIGFudGFyYSBtb2RlIGRlc2t0b3AgZGFuIHRhYmxldClcclxuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdG9nZ2xlRmFjaWxpdGllcygpO1xyXG4gICAgICAgIHRvZ2dsZUNhdFBybygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEZ1bmdzaSB1bnR1ayBtZW5lbXVrYW4gaW5kZWtzIGVsZW1lbiA8bGk+IHlhbmcgc2VzdWFpIGRlbmdhbiBuaWxhaSBwaWxpaGFuIGRyb3Bkb3duXHJcbiAgICAgIGZ1bmN0aW9uIGZpbmRNYXRjaGluZ0xpSW5kZXgodmFsdWUpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgICAgICAkKCcucHJveWVrLXN0YXR1cyBhJykuZWFjaChmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgICAgICB2YXIgZmFjaWxpdHlMaW5rID0gJCh0aGlzKS5maW5kKCdhJykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgaWYgKGZhY2lsaXR5TGluayA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBpZHg7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gS2VsdWFyIGRhcmkgbG9vcCBqaWthIGVsZW1lbiBkaXRlbXVrYW5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZ1bmdzaSB1bnR1ayBtZW5nZWtsaWsgZWxlbWVuIDxsaT4geWFuZyBzZXN1YWkgYmVyZGFzYXJrYW4gcGlsaWhhbiBkcm9wZG93blxyXG4gICAgICBmdW5jdGlvbiB0cmlnZ2VyTWF0Y2hpbmdMaSgpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9ICQoJy5zdGF0dXMtZHJvcGRvd24nKS52YWwoKTtcclxuICAgICAgICB2YXIgbWF0Y2hpbmdMaUluZGV4ID0gZmluZE1hdGNoaW5nTGlJbmRleChzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICBpZiAobWF0Y2hpbmdMaUluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgdmFyICRtYXRjaGluZ0xpID0gJCgnLmZhY2lsaXRpZXMtbGlzdCBsaScpLmVxKG1hdGNoaW5nTGlJbmRleCk7XHJcbiAgICAgICAgICAkbWF0Y2hpbmdMaS5maW5kKCdhJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFBhbmdnaWwgZnVuZ3NpIHNhYXQgcGlsaWhhbiBkcm9wZG93biBkaXViYWhcclxuICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcuc3RhdHVzLWRyb3Bkb3duJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRyaWdnZXJNYXRjaGluZ0xpKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIENhdGVnb3J5REQoKTtcclxuICAgIH0sIDYwMCk7XHJcblxyXG5cclxuICB9KSgpOyAvLyBlbmQgb2YgZnVuY3Rpb24oKVxyXG5cclxuXHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
