'use strict';

function checkIsValidUrl() {
  let fullUrl = document.querySelector("input[name='fullUrl']").value;
  let isValid = fullUrl.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  if (isValid) {
    document.querySelector('#getShortBtn').removeAttribute('disabled');
  } else {
    document.querySelector('#getShortBtn').setAttribute('disabled', true);
  }
}

function getShortUrl() {
  try {
    let fullUrl = document.querySelector("input[name='fullUrl']").value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let res = JSON.parse(this.response);
        document.querySelector("input[name='shortUrl']").value =
          'http://hoston.xyz/' + res.url_code;
        document.querySelector('#copyBtn').removeAttribute('disabled');
      }
    };
    xhttp.open('POST', '/', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({ fullUrl: fullUrl }));
  } catch (err) {
    document.querySelector('#something-wrong').removeAttribute('hidden');
    setTimeout(() => {
      document.querySelector('#something-wrong').setAttribute('hidden', true);
    }, 6000);
  }
}

function copyUrl() {
  let copyText = document.querySelector("input[name='shortUrl']");
  let shortUrl = copyText.value;
  copyText.select();
  document.execCommand('copy');
  copyText.value = 'Awesome URL Copied !';
  setTimeout(() => {
    copyText.value = shortUrl;
    copyText.blur();
  }, 2000);
}
