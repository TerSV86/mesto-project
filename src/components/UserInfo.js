export default class UserInfo {
    constructor({ name, job, avatar }) {
        this.name = document.querySelector(name);
        this.job = document.querySelector(job);
        this.avatar = document.querySelector(avatar);        
    }
    getUserInfo() {
        const dataUser = {
            name: this.name.textContent,
            about: this.job.textContent
        }
        return dataUser
    }
    setUserInfo(data) {
        this.name.textContent = data.name;
        this.job.textContent = data.about;
        this.avatar.setAttribute('src', data.avatar)
    }

}
