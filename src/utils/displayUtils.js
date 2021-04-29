exports.updateScroll = (elementId) => {
  let element = document.getElementById(elementId);
  element.scrollTop = element.scrollHeight;
};

exports.addListenerForEnterToSend = ($, inputId, buttonId) => {
  $(`#${inputId}`).on("keypress", function (e) {
    console.log(e.which, e.keyCode);
    if ((e.which === 13 || e.keyCode === 13) && !e.shiftKey) {
      e.preventDefault();
      $(`#${buttonId}`).click();
    }
  });
};
