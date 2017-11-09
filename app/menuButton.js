/**
 * Created by mahme4 on 10/18/2017.
 */

var MenuButton = function (domNode) {
  this.domNode = domNode;
};

MenuButton.prototype.init = function () {
  this.domNode.setAttribute('aria-haspopup', 'true');

  // initialize pop up menu
  var popupMenu = document.getElementById(this.domNode.getAttribute('aria-controls'));
  if( popupMenu ) {
    this.popupMenu = new PopupMenuLinks(popupMenu, this);
    this.popupMenu.init();
  }

  // bind events
  this.domNode.addEventListener('click', this.handleClick.bind(this));

};

MenuButton.prototype.handleClick = function () {
  if( this.domNode.getAttribute('aria-expanded') === 'true' ){
    this.popupMenu.close();
  } else {
    this.popupMenu.open();
    this.popupMenu.setFocusToFirstItem();
  }
};