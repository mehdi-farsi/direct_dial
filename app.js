var http = require('http');
var url = require('url');
var querystring = require('querystring');
var plivo = require('plivo-node');
var response = plivo.Response();

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);

    res.writeHead(200, {"Content-Type": "text/xml"});
    if (page == '/dial') {
      var toNumber = 'To' in params ? params['To'] : '';
      var fromNumber = 'CLID' in params ? params['CLID'] : 'From' ? params['From'] : '';
      var callerName = 'CallerName' in params ? params['CallerName'] : '';

      if (toNumber == "") {
        console.log('Hangup');
        response.addHangup();
      } else if (toNumber.substring(0,3) == "sip:") {
        console.log('SIP');
        
      } else {

      };
      console.log("To: " + toNumber);
      console.log("From: " + fromNumber);
      console.log("Caller Name: " + callerName);
    }
    res.end();
});
server.listen(8080);