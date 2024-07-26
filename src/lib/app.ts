import axios from "axios";
import Header from "./header";
import { Renderable, ServerSate, newElement } from "./master";
import MessageAble, { Message } from "./messageable";
import { auth, loadCurrentUser } from "./auth";
import '../styles/master.scss';
import GameBoard from "./gameboard";

export default class App extends MessageAble {

    rootElement:HTMLElement = document.getElementById('root');
    element:HTMLElement;
    header:Header;
    content:Renderable;
    message:Message;
    state:ServerSate = ServerSate.new();

    static new():App {

        const app = new App();
        console.log(app);
        // window.onresize = app.render.bind(app);
        const header = Header.new();
        const content = new GameBoard();
        app.header = header;
        app.content = content;
        app.state.user.registerEvent({name: 'user change', callback: app.header.renderDown})
        app.loadCurrentUser();
        app.render();
        return app

    };

    auth:()=>void = auth.bind(this);
    loadCurrentUser:()=>void = loadCurrentUser.bind(this);

    createElement():void {

        const height = this.rootElement.clientHeight;
        const width = this.rootElement.clientWidth;

        this.element = newElement('div', 'app');

        // small view
        if ((height < 600) || (width < 700)) {
            console.log(height, width)
            this.header.badge = true;
            this.header.render(this.element);
            this.content.render(this.element);
        } else {
            this.header.render(this.element);
            this.content.render(this.element);
        }

    };

    render():void {

        this.element?.remove();
        this.createElement();
        this.rootElement.appendChild(this.element);

    };

    sendMessage = (header:string, text:string, callback:()=>void, components?:{element:HTMLElement}[]) => {

        this.removeMessage();
        this.message = {header, text, callback, components};
        this.createMessageElement();
        this.element.appendChild(this.messageElement);

    };

}

