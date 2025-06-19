let currentUrl = location.href;
let buttonInserted = false;

// Проверка, является ли фото-страницей
function isPhotoPage() {
  return /[?&]z=photo\d+_\d+/i.test(location.href);
}

function insertEditButtonToVkUi(token) {
  const actionsContainer = document.querySelector(".pv_bottom_actions");

  if (!actionsContainer || document.getElementById("vk-edit-photo-button")) {
    return;
  }

  // Создаём кнопку
  const button = document.createElement("button");
  button.id = "vk-edit-photo-button";
  button.textContent = "Изменить фото";
  button.className = "FlatButton";
  button.style.marginLeft = "6px";

  button.onclick = () => {
    alert(`Вы нажали кнопку с токеном: ${token}`);
  };

  // Создаём divider
  const divider = document.createElement("span");
  divider.className = "divider";
  divider.id = "vk-edit-photo-divider";

  // Вставляем перед кнопкой "Ещё"
  const moreButton = actionsContainer.querySelector(".pv_actions_more");
  if (moreButton) {
    actionsContainer.insertBefore(button, moreButton);
    actionsContainer.insertBefore(divider, moreButton);
  } else {
    actionsContainer.appendChild(button);
    actionsContainer.appendChild(divider);
  }

  buttonInserted = true;
}

// Удаление кнопки при уходе со страницы
function removeEditButton() {
  const existing = document.getElementById("vk-edit-photo-button");
  if (existing) existing.remove();
  buttonInserted = false;
}

// Слежение за изменением URL
function monitorPhotoPage(token) {
  setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      if (isPhotoPage()) {
        console.log("Перешли на фото-страницу.");
        // Подождём, пока загрузится DOM фотки (SPA может подгружать с задержкой)
        setTimeout(() => insertEditButtonToVkUi(token), 500);
      } else {
        removeEditButton();
      }
    }
  }, 500);
}

// Получаем токен из памяти и запускаем скрипт
chrome.storage.local.get("vkToken", (data) => {
  const token = data.vkToken;
  if (!token) {
    console.warn("VK токен не найден.");
    return;
  }

  // Запускаем сразу при загрузке
  if (isPhotoPage()) {
    setTimeout(() => insertEditButtonToVkUi(token), 500);
  }

  monitorPhotoPage(token); // следим за переходами
});