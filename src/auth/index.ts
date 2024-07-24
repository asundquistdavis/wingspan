import Header from "../lib/header";
import { newElement } from "../lib/master";
import '../styles/master.scss';
import '../styles/auth.scss';
import axios from "axios";


class Auth {

    element:HTMLElement = document.getElementById('root');
    header:Header = Header.new();
    username:string = '';
    usernameInput:HTMLInputElement = newElement('input', 'username', {class: 'form-1', placeholder: 'Username', autocomplete: 'off'});
    submitButton:HTMLButtonElement = newElement('button', 'submit', {class: 'form-2'}, 'Log in');
    message:Message|null = null;

    static new():Auth {

        const auth = new Auth();
        window.onresize = () => auth.render();
        auth.render();

        return auth

    };


    render():void {

        Array.from(this.element.children).forEach(child=>child.remove());

        this.header.render(this.element);

        const onChange = () => {
            this.username = this.usernameInput.value;
            console.log(this.username)
        };
        this.usernameInput.onchange = onChange;
        this.usernameInput.onkeyup = onChange;

        this.submitButton.onclick = () => this.submit();

        const m = newElement('div', 'm', {class: 'form-m'});
        const l = newElement('div', 'l', {class: 'form-l'});
        const r = newElement('div', 'r', {class: 'form-r'});
        l.appendChild(this.usernameInput);
        r.appendChild(this.submitButton);
        m.appendChild(l);
        m.appendChild(r);
        this.element.appendChild(m);
        if (this.message) {this.element.appendChild(this.messageRender())};
    
    }

    sendMessage(header:string, text:string, callBack:()=>void): void {
        this.message = {

            header: header,
            text: text,
            callback: callBack,
        }
        this.render();

    }

    messageRender():HTMLDivElement {

        const messageModal = newElement('div', 'message-modal', {class: 'message-modal'});
        const messageContent = newElement('div', 'message-content', {class: 'message-content'});
        const messageHeader = newElement('div', 'message-header', {class: 'message-header'}, this.message.header);
        const messageBody = newElement('div', 'message-body', {class: 'message-body'});
        const messageText = newElement('div', 'message-text', {class: 'message-text'}, this.message.text);
        const messageButton = newElement('button', 'message-button', {class: 'message-button'}, 'Close');
        messageButton.onclick = this.message.callback;
        messageContent.appendChild(messageHeader);
        messageContent.appendChild(messageBody);
        messageBody.appendChild(messageText);
        messageBody.appendChild(messageButton);
        messageModal.appendChild(messageContent);
        return messageModal

    }

    clearMessage():void {

        this.message = null;
        this.render();

    }

    submit():void {
        axios.post('/api', {auth: true, username: this.username})
        .then(response => {
            console.log(response.data)
            if (response.data.error) {
                console.log('error');
            }
            else if (response.data.newUser) {
                console.log('new user');

                this.sendMessage('New User', 'Successfully added "' + response.data.username + '".',  this.clearMessage.bind(this));
                localStorage.setItem('userId', response.data.userId);
            }
            else {
                localStorage.setItem('userId', response.data.userId);
            }
        })
    }

}

type Message = {

    header:string;
    text:string;
    callback:()=>void;

};

Auth.new();
