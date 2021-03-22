"use strict";

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};
setTimeout(() => {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}, 4000);


// Получаем DOM элементы

const wrapper = document.querySelector(".tabs__items-wrapper"),
  pictures = wrapper.querySelectorAll(".tabs__item"),
  tabsButtons = document.querySelectorAll(".tabs__button"),
  linkButtons = document.querySelectorAll(".tabs__link");


// Перебираем кнопки и даем основные классы

linkButtons.forEach((elem, index) => {

  elem.addEventListener("click", (event) => {
    event.preventDefault();

    tabsButtons.forEach(elem => {
      elem.classList.remove("tabs__button--active");
    });

    event.target.classList.add("fade");
    tabsButtons[index].classList.add("tabs__button--active");
    hidePictures(index);
  });
});

// По порядковому номеру выводим нужную картинку

function hidePictures(index) {
  pictures.forEach(elem => {
    elem.classList.add("tabs__item--hide");
  });

  pictures[index].classList.remove("tabs__item--hide");
  pictures[index].classList.add("fade");

}

// В мобилке убираем вечный ховер с кнопки


// Modals

const makeOrderBtn = document.querySelectorAll(".order-btn"),
  modalOrder = document.querySelector("[data-modalOrder]"),
  tabslCode = document.querySelector(".tabsCode"),
  tabsCodeBtn = document.querySelector("#tabs__code-btn"),
  modalClose = document.querySelectorAll(".modal-dialog__close"),
  // Slider 
  sliderCode = document.querySelector(".sliderCode"),
  sliderCodeBtn = document.querySelector("#slider__code-btn"),
  // Timer 
  timerCodeBtn = document.querySelector("#timer__code-btn"),
  timerCode = document.querySelector(".timerCode");


function showModal(modalName) {

  modalName.classList.remove("hideModal");
  modalName.classList.add("showModal");
  callModal(modalName);
  // Выключаем прокрутку страницы
  document.body.style.overflow = "hidden";
}
function hideModal(modalName) {
  modalName.classList.remove("showModal");
  modalName.classList.add("hideModal");
  // Включаем прокрутку страницы
  document.body.style.overflow = "";
}

function callModal(modalName) {
  // Закрытие модального окна кликом вне модального окна
  modalName.addEventListener("click", (e) => {
    if (e.target === modalName) {
      hideModal(modalName);
    }
  });

  modalClose.forEach((elem) => {
    elem.addEventListener("click", () => hideModal(modalName));
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modalName.classList.contains("showModal")) {
      hideModal(modalName);
    }
  });
}

makeOrderBtn.forEach(elem => {
  elem.addEventListener("click", () => showModal(modalOrder));
});

sliderCodeBtn.addEventListener("click", () => showModal(sliderCode));
timerCodeBtn.addEventListener("click", () => showModal(timerCode));
tabsCodeBtn.addEventListener("click", () => showModal(tabslCode));

// Forms and Success Modal


const forms = document.querySelectorAll('form'),
  successModal = document.querySelector(".success-modal");

// const message = {
//   loading: 'img/form/spinner.svg',
//   success: 'Спасибо! Скоро мы с вами свяжемся',
//   failure: 'Что-то пошло не так...'
// };


forms.forEach(item => {
  postData(item);
});

function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideModal(modalOrder);
    showModal(successModal);
    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const formData = new FormData(form);

    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    request.send(json);
    form.reset();

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log(request.response);
      } else {
      }
    });
  });
}

// Burger 

const burger = document.querySelector(".header__burger-wrapper"),
  burgerSpan = document.querySelector(".header__burger"),
  headerMenu = document.querySelector(".header__nav");
burger.addEventListener("click", () => {
  burgerSpan.classList.toggle("burger-center");
  setTimeout(() => {
    burgerSpan.classList.toggle("active");
    document.body.classList.toggle("active");
    headerMenu.classList.toggle("active");
  }, 500);

});
// Slider
// Получаем элементы

const sliderItems = document.querySelector(".slider-items"),
  leftSliderBtn = document.querySelector(".slider-button--left"),
  rightSliderBtn = document.querySelector(".slider-button--right"),
  sliderItem = document.querySelectorAll(".slider-item");

let itemsAmmount = 2,
  moveLenght = 0;
let elemWidth = sliderItems.offsetWidth / itemsAmmount;

function setSize() {
  sliderItems.childNodes.forEach(elem => {
    elem.style.minWidth = elemWidth + "px";
  });
}

function transformPosition() {
  sliderItems.style.transform = `translate(${moveLenght + "px"})`;
}

function moveRight() {
  rightSliderBtn.addEventListener("click", () => {
    moveLenght -= elemWidth;
    transformPosition(moveLenght);
    checkPostion();
  });
}

function moveLeft() {
  leftSliderBtn.addEventListener("click", () => {
    moveLenght += elemWidth;
    transformPosition(moveLenght);
    checkPostion();
  });
}

function interval() {
  let timer = setInterval(() => {
    if (moveLenght === elemWidth * (-sliderItems.childNodes.length + itemsAmmount)) {
      clearInterval(timer);
      let timerLeft = setInterval(() => {
        if (moveLenght === 0) {
          clearInterval(timerLeft);
          interval();
        } else {

          moveLenght += elemWidth;
          transformPosition(moveLenght);
          checkPostion();
        }
      }, 4500);
      return;
    } else {
      moveLenght -= elemWidth;
      transformPosition(moveLenght);
      checkPostion();
    }
  }, 4500);
}

function checkPostion() {
  if (moveLenght === 0) {
    leftSliderBtn.disabled = true;

  } else {
    leftSliderBtn.disabled = false;

  }
  if (moveLenght === elemWidth * (-sliderItems.childNodes.length + itemsAmmount)) {
    rightSliderBtn.disabled = true;
  } else {
    rightSliderBtn.disabled = false;
  }
}

function createSlide(num) {
  return `<div class="slider-item">Оттенок серого <br> №${num}</div>`;
}

function fillHtml() {
  sliderItems.innerHTML = "";
  for (let i = 1; i <= 50; i++) {
    sliderItems.innerHTML += createSlide(i);
  }
}

fillHtml();
setSize();
checkPostion();
interval();
moveRight();
moveLeft();


// Timer



function RemaningTime() {
  const deadLine = new Date("2021-05-03");
  const myDate = new Date();

  const difference = deadLine - myDate,
    takeDays = Math.floor(difference / (1000 * 60 * 60 * 24)),
    takeHours = Math.floor(((difference / 60 / 60 / 60) % 24)),
    takeMinutes = Math.floor((difference / 1000 / 60) % 60),
    takeSeconds = Math.floor((difference / 1000) % 60);

  return {
    total: difference,
    days: takeDays,
    hours: takeHours,
    minutes: takeMinutes,
    seconds: takeSeconds
  };
}

function getZero(num) {
  if (num > 0 && num <= 9) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setTime() {
  const days = document.querySelector("#days"),
    hours = document.querySelector("#hours"),
    minutes = document.querySelector("#minutes"),
    seconds = document.querySelector("#seconds");


  const timeInterval = setInterval(UpdateTime, 1000);
  UpdateTime();

  function UpdateTime() {

    const t = RemaningTime();
    if (t.total <= 0) {
      clearInterval(timeInterval);
    } else {
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);
    }

  }

}
setTime();





