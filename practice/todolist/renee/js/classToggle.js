function addClass(element, className) {
  const classes = element.className.split(" ");
  if (classes.indexOf(className) < 0) {
    classes.push(className);
    element.className = classes.join(" ");
  }
}
  
function removeClass(element, className) {
  const classes = element.className.split(" ");
  if (classes.indexOf(className) > 0) {
    classes.splice(classes.indexOf(className), 1);
    element.className = classes.join(" ");
  }
}

export { addClass, removeClass };