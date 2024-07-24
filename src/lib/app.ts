import Header from "./header";
import { Renderable, newElement } from "./master";
import MessageAble, { Message } from "./messageable";

export default class App extends MessageAble {

    rootElement:HTMLElement = document.getElementById('root');
    element:HTMLElement;
    header:Header;
    content:Renderable;
    message:Message;

    static new():App {

        const app = new App();
        window.onresize = app.render.bind(app);
        const header = Header.new();
        const content = new Content();
        app.header = header;
        header.registerNewRoute('log in', () => app.auth(), 'end')
        app.content = content;
        return app

    };

    login = () => {

        this.sendMessage('Success', 'Loading...', this.removeMessage);
    };

    auth = () => {

        let username = '';
        const usernameInput = newElement('input', 'username-input');
        usernameInput.onkeydown = () => username = usernameInput.value;
        this.sendMessage('Log In', 'username', this.login, [{element: usernameInput}]);
    };

    createElement():void {

        const height = this.rootElement.clientHeight;
        const width = this.rootElement.clientWidth;

        this.element = newElement('div', 'app');

        // small view
        if ((height < 600) || (width < 500)) {
            this.header.render(this.element, {badge: true})
            this.content.render(this.element, {width, height});
        } else {
            this.header.render(this.element, {width, height: .1 * height, badge: false});
            this.content.render(this.element, {width, height: .9 * height});
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


class Content implements Renderable {
    
    element: Element;
    render: (parent: Element, params?: Partial<{ badge: boolean; width: number; height: number; }>) => void =
    () => {
        
    };
    renderDown: () => void;

}
