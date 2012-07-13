/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

window.addEventListener('load', function() {

  var browser = document.getElementById('browser_content')

  browser.loadURI('https://tw3.herokuapp.com/thaiWitter/', null, null)
  browser.addEventListener("DOMTitleChanged", titleChanged, true)
  browser.addEventListener("load", load, true)

  function titleChanged(e) {
    if (e.target != browser.contentDocument) return
    document.title = browser.contentDocument.title
  }
  function load(e) {
    if (e.target != browser.contentDocument) return
    registerClientExtensionFunction(browser.contentWindow.wrappedJSObject)
  }
  browser.focus()

}, false)
