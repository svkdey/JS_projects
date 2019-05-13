//search input
const searchUser=document.getElementById('searchUser');
//add event lister when input is made
const github = new GitHub();
const  ui=new Ui();
searchUser.addEventListener('keyup',(e)=>{
    const userText=e.target.value;
    if(userText!==''){
    
        github.getUser(userText).then(data=>{
           if(data.profile.message==="Not Found"){
                ui.clearProfile();
               ui.showAlert("User Not found");
              
           }else{
            //    show profile
            ui.showProfile(data.profile);
            ui.showRepos(data.repos);
           }
        })
    }else{
        ui.clearProfile();
    }
})