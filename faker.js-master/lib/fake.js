/*
  fake.js - generator method for combining faker methods based on string input

*/

function Fake (faker) {
  
  this.fake = function fake (str) {
    // setup default response as empty string
    var res = '';

    // if incoming str parameter is not provided, return error message
    if (typeof str !== 'string' || str.length === 0) {
      res = 'string parameter is required!';
      return res;
    }

    // find first matching {{ and }}
    var start = str.search('{{');
    var end = str.search('}}');

    // if no {{ and }} is found, we are done
    if (start === -1 && end === -1) {
      return str;
    }

    // console.log('attempting to parse', str);

    // extract method name from between the {{ }} that we found
    // for example: {{name.firstName}}
    var token = str.substr(start + 2,  end - start - 2);
    var method = token.replace('}}', '').replace('{{', '');

    // console.log('method', method)

    // extract method parameters
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(method);
    var parameters = '';
    if (matches) {
      method = method.replace(regExp, '');
      parameters = matches[1];
    }

    // split the method into module and function
    var parts = method.split('.');

    if (typeof faker[parts[0]] === "undefined") {
      throw new Error('Invalid module: ' + parts[0]);
    }

    if (typeof faker[parts[0]][parts[1]] === "undefined") {
      throw new Error('Invalid method: ' + parts[0] + "." + parts[1]);
    }

    // assign the function from the module.function namespace
    var fn = faker[parts[0]][parts[1]];

    // If parameters are populated here, they are always going to be of string type
    // since we might actually be dealing with an object or array,
    // we always attempt to the parse the incoming parameters into JSON
    var params;
    // Note: we experience a small performance hit here due to JSON.parse try / catch
    // If anyone actually needs to optimize this specific code path, please open a support issue on github
    try {
      params = JSON.parse(parameters)
    } catch (err) {
      // since JSON.parse threw an error, assume parameters was actually a string
      params = parameters;
    }

    var result = fn.call(this, params);

    // replace the found tag with the returned fake value
    res = str.replace('{{' + token + '}}', result);

    // return the response recursively until we are done finding all tags
    return fake(res);    
  }
  
  return this;
  
  
}

module['exports'] = Fake;