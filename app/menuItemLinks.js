/**
 * Created by mahme4 on 10/25/2017.
 */

/*
* @constructor
*   MenuItemLinks
*
* @desc
*   Wrapper object for a simple menu item in a popup menu
*
* @param domNode
*   The DOM element node that serves as the menu item container.
*   The menuObj PopupMenu is responsible for checking that it has
*   requiste metadata, e.g. role="menuitem"
*
*  @param menuObj
*   The object that is a wrapper for the PopupMenu DOM element that
*   contains the menu item DOM element.
* */

var MenuItemLinks = function(domNode, menuObj){
  this.domNode = domNode;
  this.menu = menuObj;
};

MenuItemLinks.prototype.init = function () {
  this.domNode.tabIndex = -1;
  this.domNode.setAttribute('role', 'menuitem');
  this.domNode.addEventListener('click', this.handleClick.bind(this));
};

MenuItemLinks.prototype.handleClick = function () {
  this.menu.setFocusToController();
  this.menu.close();
};