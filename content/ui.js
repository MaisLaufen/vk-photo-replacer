const uploadDialogHTML = `
  <button class="vk-upload-close-btn">×</button>
  <h2>Обновление фотографии</h2>
  <p class="vk-upload-subtitle">Выберите изображение для загрузки</p>
  
  <div class="vk-photo-preview-container" style="display:none;">
    <img id="vk-photo-preview" alt="Предпросмотр" />
  </div>

  <label class="vk-file-label">
    <input type="file" accept="image/*" id="vk-photo-input" hidden />
    <span>Выбрать файл</span>
  </label>

  <div class="vk-upload-buttons">
    <button id="vk-upload-btn">Обновить фото</button>
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
  background: #000000ff;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.45);
  width: 360px;
  text-align: center;
  font-family: "Segoe UI", Roboto, sans-serif;
  color: #ffffff;
  animation: fadeInScale 0.2s ease;
}

@keyframes fadeInScale {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

#vk-upload-dialog h2 {
  margin: 0 0 6px 0;
  font-size: 20px;
  font-weight: 600;
}

.vk-upload-subtitle {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #a0a0a0;
}

.vk-file-label {
  display: inline-block;
  padding: 10px 16px;
  background: #2f2f34;
  border-radius: 10px;
  cursor: pointer;
  color: #ddd;
  font-size: 14px;
  transition: background 0.2s;
  margin-bottom: 16px;
}

.vk-file-label:hover {
  background: #3a3a41;
}

.vk-photo-preview-container {
  margin-bottom: 16px;
}

#vk-photo-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 12px;
  object-fit: cover;
}

.vk-upload-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

#vk-upload-btn, #vk-cancel-btn {
  padding: 9px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s, transform 0.1s;
}

#vk-upload-btn {
  background: #393939ff;
  color: #fff;
}

#vk-upload-btn:hover {
  background: #fff;
  color: #393939ff;
}

#vk-upload-btn:active {
  transform: scale(0.97);
}

#vk-cancel-btn.secondary {
  background: #9e3e3eff;
  color: #eee;
}

#vk-cancel-btn.secondary:hover {
  background: #7979f8ff;
  color: #000000ff
}

#vk-cancel-btn:active {
  transform: scale(0.97);
}

.vk-upload-close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
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