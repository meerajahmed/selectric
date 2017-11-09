/**
 * Created by mahme4 on 10/18/2017.
 */

var PopupMenuLinks = function (domNode, controllerObj) {
  var elementChildren, LOG_TAG = 'PopupMenuLinks constructor ';

  // Check whether domNode is a DOM element
  if( !domNode instanceof Element){
    throw new TypeError(LOG_TAG + 'argument domNode is not a DOM Element');
  }

  // Check whether domNode has child elements
  if( domNode.childElementCount === 0 ){
    throw new Error(LOG_TAG + 'has no no menu items');
  }

  // Check whether domNode descendant have anchor elements
  var childElement = domNode.firstElementChild; // first LI in UL
  while( childElement ){
    var menuitem = childElement.firstElementChild; // Anchor in LI
    if( menuitem && menuitem.tagName !== 'A' ){
      throw new Error(LOG_TAG + 'has descendant elements that are not A elements');
    }
    childElement = childElement.nextElementSibling;
  }

  this.domNode = domNode;
  this.controller = controllerObj;

  this.menuitems = [];
  this.firstChars = [];

  this.firstItem = null;
  this.lastItem = null;

  this.hasFocus = false;
  this.hasHover = false;

};

PopupMenuLinks.prototype.init = function () {
  var childElement, menuElement, menuItem, textContent, numItem, label;

  //Configure the domNode itself
  this.domNode.setAttribute('role', 'menu');

  // traverse the element children fo domNode: configure each with
  // menuitem role behavior and store reference in menuitems array.
  childElement = this.domNode.firstElementChild; // list element

  while (childElement){
    menuElement = childElement.firstElementChild; // Anchor element
    if( menuElement && menuElement.tagName === 'A' ){
      menuItem = new MenuItemLinks(menuElement, this);
      menuItem.init();
      this.menuitems.push(menuItem);
      //textContent = menuElement.textContent.trim();
      //this.firstChars.push(textContent.substring(0,1).toLowerCase());
    }
    childElement = childElement.nextElementSibling; // get next list element
  }

  // Use populated menuitems array to initialize firstItem and lastItem

  if( this.menuitems.length > 0 ){
    this.firstItem = this.menuitems[0];
    this.lastItem = this.menuitems[this.menuitems.length - 1];
  }

};

PopupMenuLinks.prototype.close = function (force) {
  /*if( force || (!this.hasFocus && !this.hasHover && !this.controller.hasHover) ){
    this.domNode.style.display = 'none';
    this.controller.domNode.removeAttribute('aria-expanded');
  }*/
  this.domNode.style.display = 'none';
  this.controller.domNode.removeAttribute('aria-expanded');
};

PopupMenuLinks.prototype.open = function () {
  // get position and bounding rectangle of controller object's DOM node
  var rect = this.controller.domNode.getBoundingClientRect();

  //set aria-expanded attribute
  this.domNode.style.display = 'block';
  this.domNode.style.position = 'absolute';
  this.domNode.style.top = rect.height + 'px';
  this.domNode.style.left = '0px';

  // set aria-expanded attribute
  this.controller.domNode.setAttribute('aria-expanded', 'true');
};

PopupMenuLinks.prototype.setFocusToFirstItem = function () {
  this.firstItem.domNode.focus();
};

PopupMenuLinks.prototype.setFocusToController = function () {
  this.controller.domNode.focus();
};