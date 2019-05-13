class GitHub{
    constructor(){
        this.client_id ='168d44c09c39247e99a3';
        this.client_secret ='65605a37d4d02b157b7e103fdbbc81f3d0154b8d';
        this.repos_count=10;
        this.repos_sort='created:asc';
    }
    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
        const profileData=await profileResponse.json();
        const repoData = await repoResponse.json();
        // console.log(repoData);
        return{
            profile:profileData,
            repos: repoData
        }
    }
}