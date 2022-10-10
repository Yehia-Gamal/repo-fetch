// Main Variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  console.log("Function Get Repos Is Ready");

  if (theInput.value == "") {
    console.log("value Cant Be Empty");

    reposData.innerHTML = "<span>Please Write Gethub Username</span>";
  } else {
    console.log(theInput.value);

    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((repositories) => {
        console.log(repositories);

        // Empty The Container
        reposData.innerHTML = "";

        // Loop On Repositories
        repositories.forEach((repo) => {
          console.log(repo.name);

          // Create The Main Div Element
          let mainDiv = document.createElement("div");
          let nameH3 = document.createElement("h3");

          let infoUrl = document.createElement("div");

          // Create Repo Name Text
          let repoName = document.createTextNode(repo.name);

          // Append The Text To Main Div
          nameH3.appendChild(repoName);

          // Add Class On Main Div
          mainDiv.className = "repo-box";

          mainDiv.appendChild(nameH3);

          mainDiv.appendChild(infoUrl);
          infoUrl.className = "info-url";

          // Create Repo URL Anchor
          let theUrl = document.createElement("a");

          // Create Repo URL Text
          let theUrlText = document.createTextNode("Visit");

          // Append The URL Text To "a" URL
          theUrl.appendChild(theUrlText);

          // Add The Hypertext Reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // Set Attibute Blank
          theUrl.setAttribute("target", "_blank");

          // Append URL Anchor To Main Div
          infoUrl.appendChild(theUrl);

          // URL HTML
          let theUrlHtml = document.createElement("a");
          let theUrlHtmlText = document.createTextNode("Visit Page");
          theUrlHtml.href = `https://${theInput.value}.github.io/${repo.name}/`;
          theUrlHtml.setAttribute("target", "_blank");

          theUrlHtml.appendChild(theUrlHtmlText);
          infoUrl.appendChild(theUrlHtml);

          // Create Stars Count Span
          let starsSpan = document.createElement("span");
          let starsIcon = document.createElement("i");

          starsIcon.className = "star fa-solid fa-star";

          // Create Stars Count Text
          let starsText = document.createTextNode(
            ` ${repo.stargazers_count} Stars`
          );

          // Add Stars Count Text To Stars Span
          starsSpan.appendChild(starsIcon);
          starsSpan.appendChild(starsText);

          // Append Stars Count Spans To Main Div
          infoUrl.appendChild(starsSpan);

          // Append Main Div To Container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
