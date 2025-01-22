// Подключение функционала "Чертогов Фрилансера"
import { isMobile, menuClose, bodyUnlock } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

// const header = document.querySelector('.header');

// if (header) {
//   header.addEventListener('click', function (e) {
//     let target = e.target;

//     let menuItem = target.classList.contains('menu-item__item-title');
//     let menuItemOpen = target.closest('.submenu-open');
//     if (menuItem && !menuItemOpen) {
//       closeOpenSubMenu();
//       target.closest('.menu-item').classList.add('submenu-open');
//     } else if (menuItem && menuItemOpen) {
//       target.closest('.menu-item').classList.remove('submenu-open');
//     }
//   });
// }

// export function closeOpenSubMenu() {
//   let submenuOpen = document.querySelector('.submenu-open');
//   if (submenuOpen) {
//     submenuOpen.classList.remove('submenu-open');
//   }
// }

// // Находим все элементы с классом menu__toggle
// const menuToggles = document.querySelectorAll('.menu__toggle');

// // Добавляем обработчик событий для каждого элемента menu__toggle
// menuToggles.forEach(toggle => {
//     toggle.addEventListener('click', () => {
//         // Находим родительский элемент menu__item
//         const menuItem = toggle.closest('.menu__item');

//         // Переключаем класс submenu-open
//         if (menuItem) {
//             menuItem.classList.toggle('submenu-open');
//         }
//     });
// });

// Открытие подкатегорий
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


function initSearchToggle() {
  const searchButton = document.querySelector('.search__btn');
  const searchContainer = document.querySelector('.search');

  if (searchButton && searchContainer) {
      searchButton.addEventListener('click', () => {
          searchContainer.classList.toggle('search_active');
      });
  }
}
initSearchToggle();