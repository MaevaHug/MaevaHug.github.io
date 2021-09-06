
$(document).ready(function () {
  let winHeight;
  let iprogress = 0;
  const langages = [
    { 'name': 'html', 'progress': 55 },
    { 'name': 'css', 'progress': 35 },
    { 'name': 'bootstrap', 'progress': 45 },
    { 'name': 'javascript', 'progress': 15 },
    { 'name': 'jquery', 'progress': 20 },
    { 'name': 'php', 'progress': 1 },
    { 'name': 'symfony', 'progress': 1 },
    { 'name': 'wordpress', 'progress': 1 },
  ];
  init();
  addProgress();
  setSizeTriangle();

  function addProgress() {
    $('.myBar').each(function (index, element) {
      let i = $('.myBar').index(this);
      let progression = langages[i].progress;
      $(this).css('width', progression + '%');
    });
  }

  $('.logo').each(function (index, element) {
    $(this).on('mouseover', function () {
      if (iprogress == 0) {
        iprogress = 1;
        let width = 1;
        let i = $('.logo').index(this);
        let selected = $(this);
        let progression = langages[i].progress;
        id = setInterval(frame, 10);
        function frame() {
          if (width >= progression) {
            clearInterval(id);
            iprogress = 0;
          } else {
            width++;
            $(selected).next().find('.myBar').css({
              'width': width + '%',
              'filter': 'grayscale(0%)'
            });
          };
        }
      };
    });
  });

  function init() {
    winHeight = window.innerHeight; // taille viewport (fenêtre navigateur)
  }
  function setSizeTriangle() {
    let headerHeight = $('header').innerHeight();
    $('.triangle').css('borderTop', headerHeight + 'px solid yellowgreen');
  };

  function navigationSection() {
    $('.section').each(function (index, element) {
      let eTop = $(this).offset().top;    //let eBottom = eTop - $('.section').height();
      let posTopRelative = Math.ceil(eTop - $(window).scrollTop()); //pos relative viewport
      let ratio = Math.round((posTopRelative * 100) / winHeight);

      //console.log(ratio);
      if (ratio == 0) { // dès lors qu'une section est scrollée jusqu'en haut de la page
        $(this).find(".category").css("color", "yellowgreen"); //icone devient yellowgreen
        $(this).prev().css('opacity', 1); // la section préc redevient visible
        $(this).prev().removeClass('sticky'); // la section préc perd la prop sticky pour navigation +aisée
      } else if (ratio >= 0) {
        $(this).find(".category").css("color", "#263547"); //icone redevient black
        $(this).prev().addClass('sticky');
      };
      if (ratio <= 100 && ratio > 0 && ($('.section').index(element) != 0)) { //Dès lors qu'une section est visible sauf premiere
        let opacity = (Math.round((ratio / 10))) / 10;
        $(this).prev().css('opacity', opacity);  // la précèdente perd en opacité jusqu'à devenie invis
        $(this).css({
          "-webkit-box-shadow": "5px -67px 15px 5px rgba(0, 0, 0, 0.60)",
          "box-shadow": "5px -67px 15px 5px (0, 0, 0, 0.60)"
        });
      };
    });
  }
  function addScroll() {
    $('.contenu').each(function (index, element) {
      let contenuHeight = $(this).height();
      let overflowing = winHeight - 150;
      if (contenuHeight > overflowing) {
        $(this).addClass('scrollContent');
        $(this).height(overflowing + 'px');
      }
    });
  }


  function fadeInElem() {
    $('.hidden').each(function (index, element) { // on récupère tous les éléments de classe hidden
      let eTop = $(this).offset().top; //position element
      let posRelative = (eTop - $(window).scrollTop()) / winHeight;
      if (posRelative <= 1) {
        $(this).addClass('fadeEffect'); //rajoute classe pour aimation fadeIn en @feyframes
        $(this).removeClass('hidden');
      };
    });
  }
  function HideElementOnTop() {
    if ($(window).scrollTop() == 0) { //en haut de page
      $(".fadeEffect").addClass('hidden').removeClass('fadeEffect'); //on cache les éléments qui doivent apparaître en fade-in
    };
  }

  function checkScroll() {
    let scrollable = $(document).innerHeight() - winHeight; //page - fenêtre
    let scrolled = $(window).scrollTop();

    if (Math.ceil(scrolled) == scrollable) { // on arrive en bas de page, tout a été scrollé
      $('#smoothScroll').fadeIn(500); //apparition du bouton pour scroller au début
    } else {
      $('#smoothScroll').hide();
    }
    $(':root').css('--scroll', ((scrolled) / (scrollable))); // progress barre
  }

  // Add smooth scrolling to all links
  $("a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, () => {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }
  });

  $(window).on('scroll', () => {
    navigationSection();
    fadeInElem();
    HideElementOnTop();
    checkScroll();
    addScroll();
  });

  $(window).on('resize', () => {
    init();
    setSizeTriangle();
  });
});