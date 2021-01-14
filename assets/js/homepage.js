var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term")

var formSubmitHandler = function(event) {
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username); 
        nameInputEl.value = "";

    }
}

var displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loop through repos
    for(var i = 0; i<repos.length; i++) {
        if (repos.length === 0) {
            repoContainerEl.textContent = "No repositories found.";
            return;
        }
        //format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        let repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        
        
        //create a span to element to hold the repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues
        if (repos[i].open_issues_count > 0) {
            let plural = "";
            if (repos[i].open_issues_count > 1) {
                plural = "s";
            }
            statusEl.innerHTML = 
            "<i class = 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue" + plural;
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);


        repoContainerEl.appendChild(repoEl);
    }
}

var getUserRepos = function(user) {
    // format the github api url
    let apiURL = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiURL)
        .then(function(response){
            if (response.ok) {
                response.json().then(function(data){
                    displayRepos(data, user); 
                }); 
            } else {
                alert("Error: " + user + " " + response.statusText);
            }
        })
        .catch(function(error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
        })

}
userFormEl.addEventListener("submit", formSubmitHandler);
