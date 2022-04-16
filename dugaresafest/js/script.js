$(document).ready(() => {
  /**
   * START OF LABEL FLOATING FOR MATERIAL DESIGN
   */

  // On Focus in
  $('.solid-form input').on("focusin", ($event) => {
    if ($event.currentTarget.nextElementSibling) {
      if (!$($event.currentTarget.nextElementSibling).hasClass('active')) {
        $($event.currentTarget.nextElementSibling).addClass('active');
      }
    } else if ($event.currentTarget.previousElementSibling) {
      if (!$($event.currentTarget.previousElementSibling).hasClass('active')) {
        $($event.currentTarget.previousElementSibling).addClass('active');
      }
    }
  });

  // On Focus out
  $('.solid-form input').on("focusout", ($event) => {
    if (!$event.currentTarget.value) {
      if ($event.currentTarget.nextElementSibling) {
        $($event.currentTarget.nextElementSibling).removeClass('active');
      } else if ($event.currentTarget.previousElementSibling) {
        $($event.currentTarget.previousElementSibling).removeClass('active');
      }
    }
  });
  /**
   * END OF LABEL FLOATING FOR MATERIAL DESIGN
   */

  /**
   * START OF LOADING SCREEN SETUP
   */
  setInterval(() => {
    // Show loading screen while page is being loaded
    if (document.readyState === 'complete') {
      $('.loading').hide();
      $('body').removeClass('loadingBody');
    }
  } , 1000);
  /**
   * END OF LOADING SCREEN SETUP
   */

  /**
   * GLOBALLY DEFINED VARIABLES
   */
  page = 1;

  /**
   * START OF SINGLE GALLERY SCRIPTS
   */
  // Gallery image change (next)
  $('#gallery-next-image').on("click", ($event) => {
    $event.preventDefault();
    const nextId = Number($('#gallery-image').attr('currentId')) + 1;
    const nextThumb = $(`#gallery-thumb-${nextId}`);
    if (nextThumb.length) {
      const fullImage = nextThumb.attr('full');
      $('#gallery-image').attr('currentId', nextId);
      $('#gallery-image').attr('src', fullImage);
    } else {
      const fullImage = $('#gallery-thumb-1').attr('full');
      $('#gallery-image').attr('currentId', 1);
      $('#gallery-image').attr('src', fullImage);
    }
  });

  // Gallery image change (previous)
  $('#gallery-previous-image').on("click", ($event) => {
    $event.preventDefault();
    const prevId = Number($('#gallery-image').attr('currentId')) - 1;
    const nextThumb = $(`#gallery-thumb-${prevId}`);
    const lastImage = $('.frame2').length;
    if (nextThumb.length) {
      const fullImage = nextThumb.attr('full');
      $('#gallery-image').attr('currentId', prevId);
      $('#gallery-image').attr('src', fullImage);
    } else {
      const fullImage = $(`#gallery-thumb-${lastImage}`).attr('full');
      $('#gallery-image').attr('currentId', lastImage);
      $('#gallery-image').attr('src', fullImage);
    }
  });

  // Gallery image change
  if ($('.frame2 a').length === 0) {
    $('.frame2 img').on("click", ($event) => {
      const currentId = $(`#${$event.target.id}`).attr('id').replace('gallery-thumb-', '');
      const fullImage = $(`#${$event.target.id}`).attr('full');
      $('#gallery-image').attr('currentId', currentId);
      $('#gallery-image').attr('src', fullImage);
    });
  }
  /**
   * END OF SINGLE GALLERY SCRIPTS
   */

  /**
   * START OF BLOG PAGE SCRIPTS
   */
  if ($('#blog').length) {
    /**
     * BLOG PAGE SEARCH SCRIPT
     */
    $blog = $('#blog').isotope({
      itemSelector: '.blog-card'
    });

    // Search blog on keyup
    $('#blog-search').on("keyup", ($event) => {
        let value = $('#blog-search').val().toLowerCase();
        if (value) {
          $blog.isotope({
            filter: function() {
              var title = $(this).find('.card-title').text().toLowerCase();
              return title.indexOf(value) > -1;
            }
          });
        } else {
          $blog.isotope({
            filter: '*'
          });
        }

        // Check if filter count is greater than 0
        if ($blog.data('isotope').filteredItems.length === 0) {
          $('.grid-no-data').show();
        } else {
          $('.grid-no-data').hide();
        }          
    });

    // Search blog on ok button
    $('#blog-search-ok').on("click", () => {
      let value = $('#blog-search').val().toLowerCase();
      if (value) {
        $blog.isotope({
          filter: function() {
            var title = $(this).find('.card-title').text().toLowerCase();
            return title.indexOf(value) > -1;
          }
        });
      } else {
        $blog.isotope({
          filter: '*'
        });
      }

      // Check if filter count is greater than 0
      if ($blog.data('isotope').filteredItems.length === 0) {
        $('.grid-no-data').show();
      } else {
        $('.grid-no-data').hide();
      }  
    });
    /**
     * END OF BLOG SEARCH SCRIPT
     */

    /**
     * BLOG PAGE INFINITE SCROLL SCRIPT
     */
    $('#blog').infiniteScroll({
      path: function() {
        if (page < 3) {
          page++;
          return 'blog.html';
        }
      },
      append: '.blog-card',
      outlayer: $blog.data('isotope'),
      history: false
    });
    /**
     * END OF BLOG INFINITE SCROLL SCRIPT
     */
  }
  /**
   * END OF BLOG PAGE SCRIPTS.
   */

  /**
   * START OF SINGLE EVENT PAGE SCRIPTS.
   */
  if ($('#video-gallery').length) {
    $('#video-gallery').lightGallery({
      loadYoutubeThumbnail: true,
      youtubeThumbSize: 'default',
      loadVimeoThumbnail: true,
      vimeoThumbSize: 'thumbnail_medium',
    }); 
  }
  /**
   * END OF SINGLE EVENT PAGE SCRIPTS.
   */

  /**
   * START OF MATCH HEIGHT SCRIPTS.
   */
  if ($('.match-height').length) {
    $('.row.match-height').each(function() {
      $(this).find('.card').not('.card .card').matchHeight();
    });
  }
  /**
   * END OF MATCH HEIGHT SCRIPTS.
   */

  /**
   * START OF GUESTBOOK PAGE SCRIPTS.
   */
  // Guestbook search
  if ($('#guestbooks').length) {
    $guestbooks = $('#guestbooks').isotope({
      itemSelector: '.guestbook-card'
    });

    // Search guestbook on keyup
    $('#guestbook-search').on("keyup", ($event) => {
        let value = $('#guestbook-search').val().toLowerCase();
        if (value) {
          $guestbooks.isotope({
            filter: function() {
              var title = $(this).find('.card-title').text().toLowerCase();
              return title.indexOf(value) > -1;
            }
          });
        } else {
          $guestbooks.isotope({
            filter: '*'
          });
        }

        // Check if filter count is greater than 0
        if ($guestbooks.data('isotope').filteredItems.length === 0) {
          $('.grid-no-data').show();
        } else {
          $('.grid-no-data').hide();
        }          
    });

    // Search guestbook on ok button
    $('#guestbook-search-ok').on("click", () => {
      let value = $('#guestbook-search').val().toLowerCase();
      if (value) {
        $guestbooks.isotope({
          filter: function() {
            var title = $(this).find('.card-title').text().toLowerCase();
            return title.indexOf(value) > -1;
          }
        });
      } else {
        $guestbooks.isotope({
          filter: '*'
        });
      }

      // Check if filter count is greater than 0
      if ($guestbooks.data('isotope').filteredItems.length === 0) {
        $('.grid-no-data').show();
      } else {
        $('.grid-no-data').hide();
      }  
    });


    $('#guestbooks').infiniteScroll({
      path: function() {
        if (page < 3) {
          page++;
          return 'guestbook.html';
        }
      },
      append: '.guestbook-card',
      outlayer: $guestbooks.data('isotope'),
      history: false
    });      
  }
  /**
   * END OF GUESTBOOK PAGE SCRIPTS.
   */

  /**
   * START OF GALLERY PAGE SCRIPTS.
   */
  // Gallery search
  if ($('#galleries').length) {
    $galleries = $('#galleries').isotope({
      itemSelector: '.gallery-card'
    });

    // Search gallery on keyup
    $('#gallery-search').on("keyup", ($event) => {
        let value = $('#gallery-search').val().toLowerCase();
        if (value) {
          $galleries.isotope({
            filter: function() {
              var title = $(this).find('.card-title').text().toLowerCase();
              return title.indexOf(value) > -1;
            }
          });
        } else {
          $galleries.isotope({
            filter: '*'
          });
        }

        // Check if filter count is greater than 0
        if ($galleries.data('isotope').filteredItems.length === 0) {
          $('.grid-no-data').show();
        } else {
          $('.grid-no-data').hide();
        }          
    });

    // Search gallery on ok button
    $('#gallery-search-ok').on("click", () => {
      let value = $('#gallery-search').val().toLowerCase();
      if (value) {
        $galleries.isotope({
          filter: function() {
            var title = $(this).find('.card-title').text().toLowerCase();
            return title.indexOf(value) > -1;
          }
        });
      } else {
        $galleries.isotope({
          filter: '*'
        });
      }

      // Check if filter count is greater than 0
      if ($galleries.data('isotope').filteredItems.length === 0) {
        $('.grid-no-data').show();
      } else {
        $('.grid-no-data').hide();
      }  
    });


    $('#galleries').infiniteScroll({
      path: function() {
        if (page < 3) {
          page++;
          return 'gallery.html';
        }
      },
      append: '.gallery-card',
      outlayer: $galleries.data('isotope'),
      history: false
    });      
  }
  /**
   * END OF GALLERY PAGE SCRIPTS.
   */

  /**
  * START OF FOOTER SCRIPTS.
  */

  // To top button action
  $('#toTop').on("click", () => {
    $('html, body').animate({ scrollTop: 0}, 2000);
    return false;
  });

  /**
   * END OF FOOTER SCRIPTS.
   */

  /**
   * START OF HOMEPAGE SCRIPTS.
   */

  // Hide headline slide on menu open
  if ($('#headline-slide')) {
    $('.navbar-toggler').on("click", () => {
      if ($('#headline-slide').hasClass('invisible')) {
        $('#headline-slide').removeClass('invisible');
      } else {
        $('#headline-slide').addClass('invisible');
      }
    });
  }

  /**
   * MODAL SHOW SCRIPT.
   */

  // Get the modal
  var modal = $('#add-event-modal');

  // Get the button that opens the modal
  var btn = $("#add-event");

  // Get the close button
  var close = $(".close");

  // Open the modal
  btn.on("click", () => {
    modal.removeClass('fadeOutUp').addClass('animated fadeInDown').fadeIn();
    $('.modal-background').fadeIn();
  });

  // Close the modal
  close.on("click", () => {
    modal.removeClass('fadeInDown').addClass('fadeOutUp').fadeOut();
    $('.modal-background').fadeOut();
  });

  /**
   * END OF MODAL SHOW SCRIPT.
   */

  // Discover button action
  $('#discover').on("click", () => {
    $('html, body').animate({ 
      scrollTop: $(".events").offset().top
    }, 2000);
    return false;
  });

  // Events grid isotope
  if ($('.event-grid').length) {
    $events = $('.event-grid').isotope({
      // options
      itemSelector: '.event-card'
    });
  }

  // Events filter change
  $('.filter-list').on('click', 'a', function() {
    var filterValue = $(this).attr('data-filter');
    $('.filter-list .active').removeClass('active');
    $(this).addClass('active');
    $events.isotope({ filter: filterValue });

    // Check if filter count is greater than 0
    if ($events.data('isotope').filteredItems.length === 0) {
      $('.grid-no-data').show();
    } else {
      $('.grid-no-data').hide();
    }
  });

  // Gallery picture change
  $('.gallery-name').on("mouseenter", 
    // On mouse enter
    (element) => {
      const image = `#${element.target.id.replace('link', 'image')}`;
      $('.gallery-left-side .active').removeClass('active');
      $(image).addClass('active');
    }
  );
  $('.gallery-name').on('mouseleave',
    (element) => {
      $('.gallery-left-side .active').removeClass('active');
      $('.gallery-left-side img').first().addClass('active');
    }
  );

  // Initialize swiper
  if ($('.swiper-container').length) {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 0
    });
  }
  
  /**
   * END OF HOMEPAGE SCRIPTS.
   */
});