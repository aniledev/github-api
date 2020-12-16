"use strict";

const apiKey = "";

const displayReults = function (responseJson, maxResults) {
  console.log(responseJson);
  $("#search-results").empty();

  for (let i = 0; i < responseJson.length; i++) {
    $("#search-results").append(`<li>
    <h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3><p>${responseJson[i].description}</p>
    </li>`);
  }
};

const getRepos = function (maxResults = 10, repoType = "all") {
  const params = {
    per_page: maxResults,
    type: repoType,
  };

  const userName = $("#username").val();
  const BASE_URL = `https://api.github.com/users/${userName}/repos`;
  const queryString = formatQueryParams(params);
  const completeURL = BASE_URL + "?" + queryString;

  console.log(completeURL);

  const options = {
    headers: new Headers({
      accept: "application/vnd.github.v3+json",
    }),
  };

  fetch(completeURL, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayReults(responseJson, maxResults));
};

const formatQueryParams = function (params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
};

const watchForm = function () {
  $("form").submit((event) => {
    event.preventDefault();
    const userName = $("#username").val();
    const maxResults = $("#maxresults").val();
    const repoType = $("#ownership").val();
    console.log(maxResults);
    console.log(repoType);
    console.log(userName);
    getRepos(maxResults, repoType);
  });
};

$(watchForm);
