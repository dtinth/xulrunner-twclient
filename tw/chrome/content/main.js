
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
