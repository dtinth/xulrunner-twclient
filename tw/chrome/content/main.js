/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

window.addEventListener('load', function() {

  var browser = document.getElementById('browser_content')

  browser.loadURI('https://tw3.herokuapp.com/thaiWitter/', null, null)
  browser.addEventListener("DOMTitleChanged", titleChanged, true)
  browser.addEventListener("load", load, true)

  ;(function() {
    var zoom = [0.2, 0.4, 0.6, 0.8, 1, 1.25, 1.5, 1.75, 2, 2.5, 3]
      , current = 4
    function zoomIn() {
      current += 1
      if (current > zoom.length - 1) current = zoom.length
      browser.markupDocumentViewer.fullZoom = zoom[current]
    }
    function zoomOut() {
      current -= 1
      if (current < 0) current = 0
      browser.markupDocumentViewer.fullZoom = zoom[current]
    }
    function zoomReset() {
      current = 4
      browser.markupDocumentViewer.fullZoom = zoom[current]
    }
    window.zoom = { zoomIn: zoomIn, zoomOut: zoomOut, reset: zoomReset }
  })()

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
