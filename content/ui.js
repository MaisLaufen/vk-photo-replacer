const uploadDialogHTML = `
  <button class="vk-upload-close-btn">×</button>
  <h2>Обновление фотографии</h2>
  <p class="vk-upload-subtitle">Выберите изображение для загрузки</p>
  <input type="file" accept="image/*" id="vk-photo-input" />
  <div class="vk-upload-buttons">
    <button id="vk-upload-btn">Загрузить</button>
    <button id="vk-cancel-btn" class="secondary">Отмена</button>
  </div>
  <div class="vk-loading" style="display:none;">
    <img src="https://i.imgur.com/LLF5iyg.gif" width="24" height="24" />
    <span>Загрузка...</span>
  </div>
`;

const uploadDialogCSS = `
  #vk-upload-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background: #2a2b32;
    padding: 24px 32px;
    border-radius: 16px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    width: 340px;
    text-align: center;
    font-family: "Segoe UI", Roboto, sans-serif;
    color: #ffffff;
  }
  #vk-upload-dialog h2 {
    margin: 0 0 6px 0;
    font-size: 18px;
  }
  .vk-upload-subtitle {
    margin: 0 0 18px 0;
    font-size: 14px;
    color: #cccccc;
  }
  #vk-photo-input {
    margin-bottom: 16px;
    width: 100%;
    background: #1e1e24;
    color: white;
    padding: 6px;
    border: 1px solid #444;
    border-radius: 8px;
  }
  .vk-upload-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  #vk-upload-btn, #vk-cancel-btn {
    padding: 8px 14px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }
  #vk-upload-btn {
    background: #10a37f;
    color: #fff;
  }
  #vk-upload-btn:hover {
    background: #0e8c6b;
  }
  #vk-cancel-btn.secondary {
    background: #3b3b47;
    color: #eee;
  }
  #vk-cancel-btn.secondary:hover {
    background: #52525e;
  }
  .vk-upload-close-btn {
    position: absolute;
    top: 8px;
    right: 12px;
    background: transparent;
    border: none;
    font-size: 22px;
    color: #999;
    cursor: pointer;
  }
  .vk-upload-close-btn:hover {
    color: #fff;
  }
  .vk-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #ccc;
  }
`;