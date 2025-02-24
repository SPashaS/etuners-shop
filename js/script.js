// всплывашки
function showPopupMessage(messageId) {
  const message = document.getElementById(messageId);

  if (message) {
    document.querySelectorAll('.pop-message').forEach((msg) => {
      msg.classList.remove('pop-message--active');
    });
    message.classList.add('pop-message--active');

    setTimeout(() => {
      message.classList.remove('pop-message--active');
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  //меню
  const menuToggles = document.querySelectorAll('.menu__toggle');
  if (menuToggles) {
    menuToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        // Находим родительский элемент menu__item
        const menuItem = toggle.closest('.menu__item');

        // Закрываем другие открытые подменю
        const otherOpenSubmenus = document.querySelectorAll(
          '.menu__item.submenu-open'
        );
        otherOpenSubmenus.forEach((openMenuItem) => {
          if (openMenuItem !== menuItem) {
            openMenuItem.classList.remove('submenu-open');
          }
        });

        // Переключаем класс submenu-open у текущего элемента
        if (menuItem) {
          menuItem.classList.toggle('submenu-open');
        }
      });
    });
  }

  //поиск
  const searchButton = document.querySelector('.search__btn');
  const searchContainer = document.querySelector('.search');

  if (searchButton && searchContainer) {
    searchButton.addEventListener('click', () => {
      searchContainer.classList.toggle('search_active');
    });
  }

  //поиск
  const searchInput = document.querySelector('.search-block__input');
  const searchBody = document.querySelector('.search__body');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      if (searchInput.value.length >= 2) {
        searchBody.classList.add('search__body--active');
        searchBody.style.display = 'block';
      } else {
        searchBody.classList.remove('search__body--active');
        searchBody.style.display = 'none';
      }
    });
    document.addEventListener('click', function (event) {
      if (
        !searchInput.contains(event.target) &&
        !searchBody.contains(event.target)
      ) {
        searchBody.classList.remove('search__body--active');
        searchBody.style.display = 'none';
      }
    });

    searchInput.addEventListener('focus', function () {
      if (searchInput.value.length >= 2) {
        searchBody.classList.add('search__body--active');
        searchBody.style.display = 'block';
      }
    });
  }

  //свитч
  const switches = document.querySelectorAll('.product__switch-input');

  switches.forEach((toggle) => {
    toggle.addEventListener('change', (event) => {
      const productItem = event.target.closest('.product__add');
      const basePriceElement = document.querySelector(
        '.product__price[data-base-price]'
      );
      const extraPriceElement = productItem.querySelector('[data-price]');

      if (!basePriceElement || !extraPriceElement) return;

      const basePrice = parseInt(basePriceElement.dataset.basePrice, 10);
      const extraPrice = parseInt(extraPriceElement.dataset.price, 10);

      if (event.target.checked) {
        basePriceElement.textContent = basePrice + extraPrice;
      } else {
        basePriceElement.textContent = basePrice;
      }
    });
  });

  //рейтинг
  const ratings = document.querySelectorAll('.rating');
  if (ratings) {
    ratings.forEach((ratingElement) => {
      const rating = parseFloat(ratingElement.dataset.rating) || 0;
      const percentage = (rating / 5) * 100; // Рассчитываем ширину заполнения

      const yellowStars = ratingElement.querySelector('span');
      if (yellowStars) {
        yellowStars.style.width = `${percentage}%`;
      }
    });
  }

  //showmore
  document.querySelectorAll('[data-showmore]').forEach((container) => {
    const params = container.getAttribute('data-showmore').split(',');
    const showMoreCount = parseInt(params[0], 10);
    const maxWidth = params[1] ? parseInt(params[1], 10) : null;

    const applyShowMore = () => {
      const items = Array.from(container.children);

      if (maxWidth && window.innerWidth > maxWidth) {
        items.forEach((item) => (item.style.display = ''));
        const existingWrapper = container.nextElementSibling;
        if (
          existingWrapper &&
          existingWrapper.classList.contains('showmore-wrapper')
        ) {
          existingWrapper.remove();
        }
        return;
      }

      if (items.length > showMoreCount) {
        items
          .slice(showMoreCount)
          .forEach((item) => (item.style.display = 'none'));

        if (
          !container.nextElementSibling ||
          !container.nextElementSibling.classList.contains('showmore-wrapper')
        ) {
          const showMoreWrapper = document.createElement('div');
          showMoreWrapper.classList.add('showmore-wrapper');

          const showMoreButton = document.createElement('button');
          showMoreButton.textContent = 'Показать еще';
          showMoreButton.classList.add('btn');
          showMoreWrapper.appendChild(showMoreButton);
          container.insertAdjacentElement('afterend', showMoreWrapper);

          showMoreButton.addEventListener('click', () => {
            items
              .slice(showMoreCount)
              .forEach((item) => (item.style.display = ''));
            showMoreWrapper.remove();
          });
        }
      }
    };

    applyShowMore();
    window.addEventListener('resize', applyShowMore);
  });

  // избранное
  document.querySelectorAll('.favorite-btn').forEach((button) => {
    button.addEventListener('click', function () {
      button.classList.toggle('favorite-btn--active');
    });
  });

  // Swiper
  if (document.querySelector('.promo__swiper')) {
    new Swiper('.promo__slider', {
      effect: 'fade',
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      speed: 800,
      loop: true,
      pagination: {
        el: '.promo__slider-pagination',
        clickable: true,
      },
      on: {},
    });
  }

  if (document.querySelector('.product__carousels')) {
    new Swiper('.main-carousel__slider', {
      effect: 'fade',
      slidesPerView: 1,
      speed: 800,
      loop: true,
      pagination: {
        el: '.main-carousel__pagination',
        clickable: true,
      },
      on: {},
    });
  }

  if (document.querySelector('.carousel--1')) {
    new Swiper('.carousel--1 .carousel__slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 800,
      pagination: {
        el: '.carousel--1 .pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.carousel--1 .carousel__btn_prev',
        nextEl: '.carousel--1 .carousel__btn_next',
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 4,
        },
        1366: {
          slidesPerView: 4,
        },
      },

      on: {},
    });
  }

  if (document.querySelector('.carousel--2')) {
    new Swiper('.carousel--2 .carousel__slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 800,
      navigation: {
        prevEl: '.carousel--2 .carousel__btn_prev',
        nextEl: '.carousel--2 .carousel__btn_next',
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 4,
        },
        1366: {
          slidesPerView: 4,
        },
      },

      on: {},
    });
  }

  if (document.querySelector('.carousel--new')) {
    new Swiper('.carousel--new .carousel__slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 800,
      pagination: {
        el: '.carousel--new .pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.carousel--new .carousel__btn_prev',
        nextEl: '.carousel--new .carousel__btn_next',
      },
      breakpoints: {
        0: {
          slidesPerView: 1.1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 4,
        },
        1366: {
          slidesPerView: 4,
        },
      },

      on: {},
    });
  }

  if (document.querySelector('.reviews__slider')) {
    new Swiper('.reviews__slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 800,
      pagination: {
        el: '.reviews__slider-wrapper .pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.reviews__slider-wrapper .carousel__btn_prev',
        nextEl: '.reviews__slider-wrapper .carousel__btn_next',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },

      on: {},
    });
  }

  if (document.querySelector('.reviews-all__slider')) {
    new Swiper('.reviews-all__slider', {
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      navigation: {
        prevEl: '.reviews-all__slider-wrapper .nav-slider__btn_prev',
        nextEl: '.reviews-all__slider-wrapper .nav-slider__btn_next',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      },

      on: {},
    });
  }

  if (document.querySelector('.info__slider')) {
    new Swiper('.info__slider', {
      slidesPerView: 2,
      spaceBetween: 10,
      speed: 800,
      navigation: {
        prevEl: '.info__slider-wrapper .nav-slider__btn_prev',
        nextEl: '.info__slider-wrapper .nav-slider__btn_next',
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
        },
        1366: {
          slidesPerView: 4,
        },
      },

      on: {},
    });
  }
});
