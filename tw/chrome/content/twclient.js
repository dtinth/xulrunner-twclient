/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function registerClientExtensionFunction(w) {

	var prefixes = [
		'https://tw3.herokuapp.com/thaiWitter/',
		'http://tw3.herokuapp.com/thaiWitter/',
		'http://tw.dt.in.th/thaiWitter/'
	];
	
	var isMatch = false;
	prefixes.forEach(function(prefix) {
		if (w.location.href.substr(0, prefix.length) != prefix) {
			isMatch = true;
		}
	});
	
	if (!isMatch) return;

	w.thaiWitterClientVersion = function() {
		return '6';
	};

	w.thaiWitterClientEcho = function(str, cb) {
		var data = JSON.parse(str.substr(5));
		var xh = new XMLHttpRequest();
		function rsc() {
			if (xh.readyState == 4) {
				cb (xh.responseText);
			}
		}
		if (data.data == null) {
			xh.open ('GET', data.endpoint, true);
			xh.onreadystatechange = rsc;
			xh.send ('');
		} else {
			xh.open ('POST', data.endpoint, true);
			xh.onreadystatechange = rsc;
			xh.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
			xh.send (data.data);
		}
	};

	w.thaiWitterClientStream = function(url, cb, hung) {

		var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
		var chan = ios.newChannel(url, null, null);
		var buffer = '';
		var timeout, interval;
		var hungup = false;

		function keepAlive() {
			timeout = new Date().getTime() + 90000;
		}

		function checkAlive() {
			if (new Date().getTime() > timeout) {
				hangup ();
			}
		}

		function hangup() {
			if (!hungup) {
				hungup = true;
				hung ();
				clearInterval (interval);
				chan.cancel (Components.results.NS_BINDING_ABORTED);
			}
		}

		keepAlive ();
		interval = setInterval(checkAlive, 2500);

		chan.asyncOpen({
			onDataAvailable: function(req, ctx, istream, offset, count) {
				var stream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
				var data, newLine;
				stream.init (istream);
				buffer += stream.read(count);
				keepAlive ();
				while (-1 != (newLine = buffer.indexOf('\n'))) {
					data = buffer.substr(0, newLine);
					buffer = buffer.substr(newLine + 1);
					try { cb (data); } catch (e) {};
				}
			},
			onStartRequest: function(req, ctx) {
			},
			onStopRequest: function(req, ctx, status) {
				hangup ();
			}
		}, null);

		return hangup;

	};

	w.thaiWitterClientNotify = function(title, text, picture) {
	  	var alertsService = Components.classes["@mozilla.org/alerts-service;1"]
			.getService(Components.interfaces.nsIAlertsService);
		alertsService.showAlertNotification(picture, title, text);
	};

	var icon = {
		get badgeText() {
			try {
				var dock = Components.classes["@mozilla.org/widget/macdocksupport;1"]
					.getService(Components.interfaces.nsIMacDockSupport);
				return dock.badgeText;
			} catch (e) {
				return '';
			}
		},
		set badgeText(text) {
			try {
				var dock = Components.classes["@mozilla.org/widget/macdocksupport;1"]
					.getService(Components.interfaces.nsIMacDockSupport);
				dock.badgeText = text;
			} catch (e) {
			}
		}
	}

	w.platform = {
		showNotification: w.thaiWitterClientNotify,
		openURI: function(url) {
			var ioservice = Components.classes["@mozilla.org/network/io-service;1"]
				.getService(Components.interfaces.nsIIOService);
			var uriToOpen = ioservice.newURI(url, null, null);
			var extps = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"]
				.getService(Components.interfaces.nsIExternalProtocolService);
			extps.loadURI(uriToOpen, null);
		},
		icon: function() {
			return icon;
		}
	};

}

