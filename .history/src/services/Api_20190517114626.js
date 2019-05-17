'use strict';

var Odoo = function (config) {
  config = config || {}

  this.host = 'pos1.vardion.com'
  this.port = 443 || 80
  this.database = 'pos1'
  this.username = 'admin' || null
  this.password = 'pass4pos1' || null
  this.sid = config.sid || null
  this.protocol = 'https' || 'http'
}

// Connect

Odoo.prototype.connect = function () {
  var params = {
    db: this.database,
    login: this.username,
    password: this.password
  }

  var json = JSON.stringify({ params: params })
  var url = `${this.protocol}://${this.host}:${this.port}/web/session/authenticate`

  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': json.length
    },
    body: json
  }

  var context = this

  return fetch(url, options)
    .then(function (response) {
      context.sid = response.headers.map['set-cookie'].split(';')[0].split('=')[1];
      context.cookie = response.headers.map['set-cookie'];
      return response.json()
    })
    .then(function (responseJson) {
      if (responseJson.error) return { success: false, error: responseJson.error }
      else {
        context.uid = responseJson.result.uid
        context.session_id = responseJson.result.session_id
        context.context = responseJson.result.user_context
        context.username = responseJson.result.username
        return { success: true, data: responseJson.result }
      }
    })
    .catch(function (error) {
      return { success: false, error: error }
    })
}

// Search records
Odoo.prototype.search = function (model, params, callback) {
  // assert(params.ids, "Must provide a list of IDs.");
  //assert(params.domain, "Must provide a search domain.");

  this._request('/web/dataset/call_kw', {
    kwargs: {
      context: this.context
    },
    model: model,
    method: 'search',
    args: [
      params.domain,
    ],
  }, callback);
};

// Search & Read records
// https://www.odoo.com/documentation/8.0/api_integration.html#search-and-read
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.search
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.read
Odoo.prototype.search_read = function (model, params, callback) {
  //assert(params.domain, "'domain' parameter required. Must provide a search domain.");
  //assert(params.limit, "'limit' parameter required. Must specify max. number of results to return.");

  this._request('/web/dataset/call_kw', {
    model: model,
    method: 'search_read',
    args: [],
    kwargs: {
      context: this.context,
      domain: params.domain,
      offset: params.offset,
      limit: params.limit,
      order: params.order,
      fields: params.fields,
    },
  }, callback);
};

// Get record
// https://www.odoo.com/documentation/8.0/api_integration.html#read-records
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.read
Odoo.prototype.get = function (model, params, callback) {
  //assert(params.ids, "Must provide a list of IDs.");

  this._request('/web/dataset/call_kw', {
    model: model,
    method: 'read',
    args: [
      params.ids,
    ],
    kwargs: {
      fields: params.fields,
    },
  }, callback);
}; //get


// Browse records by ID
// Not a direct implementation of Odoo RPC 'browse' but rather a workaround based on 'search_read'
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.browse
Odoo.prototype.browse_by_id = function(model, params, callback) {
  params.domain = [['id', '>', '0' ]];  // assumes all records IDs are > 0
  this.search_read(model, params, callback);
}; //browse


// Create record
Odoo.prototype.create = function (model, params, callback) {
  this._request('/web/dataset/call_kw', {
    kwargs: {
      context: this.context
    },
    model: model,
    method: 'create',
    args: [params]
  }, callback);
};

// Update record
Odoo.prototype.update = function (model, id, params, callback) {
  if (id) {
    this._request('/web/dataset/call_kw', {
      kwargs: {
        context: this.context
      },
      model: model,
      method: 'write',
      args: [[id], params]
    }, callback);
  }
};

// Delete record
Odoo.prototype.delete = function (model, id, callback) {
  this._request('/web/dataset/call_kw', {
    kwargs: {
      context: this.context
    },
    model: model,
    method: 'unlink',
    args: [[id]]
  }, callback);
};


// Generic RPC wrapper
// DOES NOT AUTO-INCLUDE context
Odoo.prototype.rpc_call = function (endpoint, params, callback) {
  //assert(params.model);
  // assert(params.method);
  // assert(params.args);
  // assert(params.kwargs);
  // assert(params.kwargs.context);

  this._request(endpoint, params, callback);
}; //generic


// Private functions
Odoo.prototype._request = function (path, params, cb) {
  params = params || {};

  var url = 'http://' + this.host + ':' + this.port + (path || '/') + '';
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': this.sid + ';'
    },
    body: JSON.stringify({jsonrpc: '2.0', id: new Date().getUTCMilliseconds(), method: 'call', params: params})
  };

  fetch(url, options)
    .then(res=>res.json())
    .then(data=>{
      if (data.error){
        cb(data.error, null);
      }else{
        cb(null, data.result);
      }
    }, err=>{
      cb(err, null);
    });
};

module.exports = Odoo;
