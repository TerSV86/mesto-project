export default class UserInfo {
    constructor({ name, job }) {
        this.name = document.querySelector(name);
        this.job = document.querySelector(job);
    }
    getUserInfo() {
        const dataUser = {
            name: this.name.textContent,
            about: this.job.textContent
        }
        return dataUser
    }
    setUserInfo(data) {
        return this.name.textContent = data.name,
            this.job.textContent = data.about;
    }
}
