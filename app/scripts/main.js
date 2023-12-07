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