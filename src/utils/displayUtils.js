exports.updateScroll = (elementId) => {
  console.log(`Trying to update scroll of "${elementId}".`);
  let element = document.getElementById(elementId);
  element.scrollTop = element.scrollHeight;
};
