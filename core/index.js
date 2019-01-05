var xhr = new XMLHttpRequest();

var CreateSession = function(where) {

  $.ajax({
    url: 'https://gateway-wdc.watsonplatform.net/assistant/api/v2/assistants/51c0897a-95c3-4536-816f-9addd105ab21/sessions?version=2019-01-02',
    method: "POST",
    dataType: "json",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    // data: JSON.stringify(data),
    cache: false,
    beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader("Authorization", "Basic " + btoa('apikey' + ":" + 'azjcaUoZzHju0CWkFgJPYiA61383jN7HwMZ_g7fxYNxH'));
    },
    success: function (data) {
      document.querySelector(where).textContent=data.session_id;
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
});

}

CreateSession('#session_id')
