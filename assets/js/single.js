var issueContainerEl = document.querySelector("#issues-container");


var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    
    //create a link element to take users to the issue on github
    for (var i = 0; i < issues.length; i++){
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
    
        // creat span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
    
        // append to container
        issueEl.appendChild(titleEl);
    
        // create a type element
        var typeEl = document.createElement("span");
    
        // check if issue s an actual issue or a pull request
    
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        // append to container
        issueEl.appendChild(typeEl);
        console.log(issueEl);
        issueContainerEl.appendChild(issueEl);    
    }

}
var getRepoIssues = function(repo) {
    let apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // make a request to the url
    fetch(apiURL)
        .then(function(response){
            if (response.ok) {
                response.json().then(function(data) {
                    displayIssues(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
        })
};

getRepoIssues("facebook/react");