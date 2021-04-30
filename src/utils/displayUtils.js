exports.updateScroll = (elementId) => {
  let element = document.getElementById(elementId);
  element.scrollTop = element.scrollHeight;
};

exports.addListenerForEnterToSend = ($, input, button, itemWithFocus) => {
  if (itemWithFocus) {
    $(input).on("keypress", function (e) {
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

    // $(`#${inputId}`).focus("keypress", function (e) {
    //   console.log(e.which, e.keyCode);
    //   if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
    //     e.preventDefault();
    //     $(`#${buttonId}`).click();
    //   }
    // });
  } else {
    $(input).on("keypress", function (e) {
      console.log(e.which, e.keyCode);
      if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
        e.preventDefault();
        $(button).click();
      }
    });
  }
};
