import App from "./app";
import { CONNECTION, newElement } from "./master";

export function auth(this:App) {

    const login = (username:string) => {

        console.log('logging in:' + username);
        this.sendMessage('Loading...', '', ()=>{});
        const timeOut = setTimeout(()=>this.sendMessage('Error Logging In', 'Close', this.removeMessage), 5000);
        CONNECTION.api({auth: true, username}, this.state, () => clearTimeout(timeOut));

    };

    let username = '';
    const usernameInput = newElement('input', 'username-input');
    const submitButton = newElement('button', 'submit-button', {}, 'Go!');
    usernameInput.onkeyup = () => username = usernameInput.value;
    submitButton.onclick = () => login(username);
    this.sendMessage('Log In', '', this.removeMessage, [{element: usernameInput}, {element: submitButton}]);

}


export function loadCurrentUser(this:App) {

    console.log(this.state);

    this.header.registerNewRoute('log in', this.auth, 'end');

    const updateRoute = () => {

        if (this.state.user.name) {
            
            console.log(this.state.user.name)
            this.header.removeRoute('log in');
            this.header.registerNewRoute(this.state.user.name, ()=>{}, 'end'); // todo - implement user profile cb

        };
    
    };

    const username = localStorage.getItem('username');

    if (username) {

        CONNECTION.api({auth: true, username}, this.state, updateRoute);

    };

};
