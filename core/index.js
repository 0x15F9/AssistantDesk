var xhr = new XMLHttpRequest();
var session_id;

// TODO: Move to an env file
const api_details = {
  service_endpoint: '', //See https://console.bluemix.net/apidocs/assistant-v2#service-endpoint
  assistant_id: '',
  version: '', // See https://console.bluemix.net/apidocs/assistant-v2#versioning
  credentials: {
    username: '',
    password: ''
  }
}

var addUserMessage = function(what, where) {
  $(where).prepend(`<div class="columns"><div class="column notification is-danger is-offset-2 is-10 has-text-right">${what}</div></div><br>`)
  $(where).prepend(`<div class="columns"><div class="bot-msg column notification is-success is-10"><a class="button is-success is-small is-loading">Loading</a></div></div><br>`)
}

var CreateSession = function (where) {
  // return new Promise((resolve, reject)=> {
    $.ajax({
      url: `https://gateway${api_details.service_endpoint}.watsonplatform.net/assistant/api/v2/assistants/${api_details.assistant_id}/sessions?version=${api_details.version}`,
      method: "POST",
      dataType: "json",
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      // data: JSON.stringify(data),
      cache: false,
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader("Authorization", "Basic " + btoa(api_details.credentials.username + ":" + api_details.credentials.password));
      },
      success: function (data) {
        if (where) document.querySelector(where).textContent = data.session_id;
        session_id = data.session_id;
        // resolve(session_id);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // TODO: Handle Error
        // reject;
      }
    });
  // })
}

var SendMessage = function (source, destination) {
  if (!session_id) CreateSession();
  var message = document.querySelector(source).value;
  if (message === '') console.log('Empty Message.');
  var data = {
    input : {
      text : message
    }
  }
  $.ajax({
    url: `https://gateway${api_details.service_endpoint}.watsonplatform.net/assistant/api/v2/assistants/${api_details.assistant_id}/sessions/${session_id}/message?version=${api_details.version}`,
    method: "POST",
    dataType: "json",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    cache: false,
    beforeSend: function (xhr) {
      /* Authorization header */
      xhr.setRequestHeader("Authorization", "Basic " + btoa(api_details.credentials.username + ":" + api_details.credentials.password));
      addUserMessage(message, destination);
      $(source).attr('disabled', true);
    },
    success: function (data) {
      console.log(data);
      $('.bot-msg').first().text(data.output.generic[0].text);
      $(source).val('');
      $(source).attr('disabled', false);
      $(source).focus();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // TODO: Handle Error
    }
  });
}

CreateSession('#session_id')