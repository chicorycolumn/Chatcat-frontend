exports.updateScroll = (elementId) => {
  let element = document.getElementById(elementId);
  element.scrollTop = element.scrollHeight;
};

exports.addListenerForEnterToSend = ($, input, button, itemWithFocus) => {
  if (itemWithFocus) {
    $(input).on("keypress", function (e) {
      console.log("@@@@@@@@@@@@@@");
      console.log(`--->active is ${document.activeElement.tagName}`);
      console.log("doc detects:", e.which, e.keyCode);
      // console.log("FIND", $(itemWithFocus).find("*"));
      console.log(
        `$(itemWithFocus).is(":focus")`,
        $(itemWithFocus).is(":focus")
      );
      console.log(
        ` $(itemWithFocus).find(":focus").length`,
        $(itemWithFocus).find(":focus").length
      );
      console.log("@@@@@@@@@@@@@@");
      if (
        $(itemWithFocus).is(":focus") ||
        $(itemWithFocus).find(":focus").length
        // .some((descendant) => $(descendant).is(":focus"))
      ) {
        console.log("--------------------");
        console.log("focus detects:", e.which, e.keyCode);
        console.log("--------------------");

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
