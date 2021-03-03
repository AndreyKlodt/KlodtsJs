window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};
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



//forms 

const successModal = document.querySelector(".success-modal"),
  modalClose = document.querySelectorAll(".modal-dialog__close");

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



const forms = document.querySelectorAll('form');
const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
  postData(item);
});


function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
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