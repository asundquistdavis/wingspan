import { newElement } from "./master";
import '../styles/message.scss';

export default class MessageAble {
    
    message:Message;
    messageElement:HTMLDivElement;

    createMessageElement = () => {

        const messageModal = newElement('div', 'message-modal', {class: 'message-modal'});
        const messageContent = newElement('div', 'message-content', {class: 'message-content'});
        const messageHeader = newElement('div', 'message-header', {class: 'message-header'}, this.message.header);
        const messageBody = newElement('div', 'message-body', {class: 'message-body'});
        const messageBottom = newElement('div', 'message-bottom', {class: 'message-bottom'});
        const messageText = newElement('div', 'message-text', {class: 'message-text'}, this.message.text);
        const messageButton = newElement('button', 'message-button', {class: 'message-button'}, 'Close');
        messageButton.onclick = this.message.callback;
        messageContent.appendChild(messageHeader);
        messageContent.appendChild(messageBody);
        this.message.components?.forEach(component=>messageBody.appendChild(component.element));
        messageBody.appendChild(messageBottom);
        messageBottom.appendChild(messageText);
        messageBottom.appendChild(messageButton);
        messageModal.appendChild(messageContent);
        this.messageElement = messageModal;

    };

    removeMessage = () => {

        this.message = null;
        this.messageElement?.remove();

    };

}

export type Message = {

    header:string;
    text:string;
    callback?:()=>void;
    components?:{element:HTMLElement}[]

};

