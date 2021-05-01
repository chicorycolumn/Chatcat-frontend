exports.updateScroll = (elementId) => {
  let element = document.getElementById(elementId);
  element.scrollTop = element.scrollHeight;
};

exports.addListenerForEnterToSend = ($, input, button, itemWithFocus) => {
  if (itemWithFocus) {
    $(input).on("keypress", function (e) {
      if ($("#Alert").length) {
        e.preventDefault();
        return;
      }

      if (
        $(itemWithFocus).is(":focus") ||
        $(itemWithFocus).find(":focus").length
      ) {
        if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
          e.preventDefault();
          $(button).click();
        }
      }
    });
  } else {
    $(input).on("keypress", function (e) {
      if ($("#Alert").length) {
        e.preventDefault();
        return;
      }

      if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
        e.preventDefault();
        $(button).click();
      }
    });
  }
};

exports.selectText = (document, id) => {
  const el = document.getElementById(id);
  el.select();
  el.setSelectionRange(0, 99999);
};
