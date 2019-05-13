class Ui{
    constructor(){
        this.profile=document.getElementById('profile');
        this.repos = document.getElementById('repos');
    }
    showProfile(user){
        this.profile.innerHTML=
            `<div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <div class="card" style="width: 15rem;">
            <img src="${user.avatar_url}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-subtitle mb-2 text-muted">${user.bio}</p>
            <a href="${user.html_url}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        
          
        </div>
          <br>
        <h3> Latest Updates </h3>
      </div>`;
    }

    showRepos(repos){
      let op='';
      repos.forEach((repo)=>{
        op += `<div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>`
      });
      document.getElementById('repos').innerHTML=op;

    }
  
    showAlert(message) {
      // Clear any remaining alerts
      this.clearAlert();
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = "alert alert-dismissible alert-danger";
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.searchContainer');
      // Get search box
      const search = document.querySelector('.search');
      // Insert alert
      container.insertBefore(div, search);

      // Timeout after 3 sec
      setTimeout(() => {
        this.clearAlert();
      }, 3000);
    }

    // Clear alert message
    clearAlert() {
      const currentAlert = document.querySelector('.alert');

      if (currentAlert) {
        currentAlert.remove();
      }
    }

      clearProfile() {
        this.profile.innerHTML = '';
        this.repos.innerHTML = ''
      }
}