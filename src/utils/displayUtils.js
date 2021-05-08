const $ = require("jquery");

export const updateScroll = (elementId) => {
  let element = document.getElementById(elementId);
  element.scrollTop = element.scrollHeight;
};

export const clickOutsideToClose = (id, setShowCallback) => {
  console.log(`${id.slice(1)} clickOutsideToClose`);

  if (!($(id).is(":focus") || $(id).find(":focus").length)) {
    setShowCallback(false);
  }
};

export const keydownToClose = (e, setShowCallback, label) => {
  console.log(`${label} keydownToClose`, e.keyCode, e.which);

  let exitKeyCodes = [13, 27, 32];

  if (exitKeyCodes.includes(e.keyCode) || exitKeyCodes.includes(e.which)) {
    setShowCallback(false);
  }
};

export const addListenerForKeydownEnterToSend = (
  input,
  button,
  itemToHaveFocus
) => {
  $(input).on("keydown", function (e) {
    if ($("#Alert").length) {
      e.preventDefault();
      return;
    }

    if (
      !itemToHaveFocus ||
      $(itemToHaveFocus).is(":focus") ||
      $(itemToHaveFocus).find(":focus").length
    ) {
      if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
        e.preventDefault();
        $(button).click();
      }
    }
  });
};

export const selectText = (document, id) => {
  const el = document.getElementById(id);
  el.select();
  el.setSelectionRange(0, 99999);
};
