var http = require('http');
var url = require('url');
var querystring = require('querystring');
var plivo = require('plivo-node');

var server = http.createServer(function(req, res) {
    var response = plivo.Response();
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);

    if (page == '/dial') {
      var toNumber = params['To'] || '';
      var fromNumber = params['CLID'] || (params['From'] || '');
      var callerName = params['CallerName'] || '';

      if (toNumber == "") {
        response.addHangup();
      } else if (toNumber.substring(0, 4) == "sip:") {
        var dial = response.addDial({'callerName' : callerName});
        dial.addUser(toNumber);
      } else {
        var dial = response.addDial({'callerId' : fromNumber});
        dial.addNumber(toNumber);
      };
    }
    res.writeHead(200, {"Content-Type": "text/xml"});
    res.end(response.toXML());
});
server.listen(process.env.PORT || 8080);