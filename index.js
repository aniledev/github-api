"use strict";

const apiKey = "";

const displayReults = function () {};

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
