import { Renderable, newElement, title } from "./master";
import '../styles/header.scss';


export default class Header implements Renderable {
    
    
    element: HTMLElement;
    badge:boolean = false;
    routes: {text:string, callback:()=>void, eClass?:string}[] = [];
    
    static new():Header {

        const header = new Header();


        return header

    };

    subHeader(subTitles:SubTitle[]):HTMLElement {

        const sub = newElement('div', 'sub-header', {class: 'sub-header'});

        subTitles.forEach(subTitle => {

            const temp = sub.appendChild(newElement('button', 'sub-header-' + subTitle.text, {class: 'subTitle'}, title(subTitle.text)));
            temp.onclick = subTitle.callBack;
        
        })

        return sub

    };

    newButton(text:string, callBack:()=>void, eClass?:string):HTMLElement {

        const button = newElement('button', 'header-button-' + text, {class: 'header-button' + (eClass? ' ' + eClass: '')}, title(text));
        button.onclick = callBack;
        return button

    };

    createElement = () => {

        if (this.badge) {

            this.element = newElement('div', 'header', {class: 'header-badge'});
            const child = newElement('div', 'header-badge-child', {class: 'show'});
            child.onclick = ()=>this.element.toggleAttribute('open');
            this.element.appendChild(child);

        } else {

            this.element = newElement('div', 'header', {class: 'header'});
        }
    
        this.routes.forEach(({text, callback, eClass})=>this.element.appendChild(this.newButton(text, callback, eClass)))
        // this.element.appendChild(this.newButton('wingspan', () => window.location.replace('/static/binoculars.html'), 'main'));
        // this.element.appendChild(this.newButton('Binoculars', () => window.location.replace('/static/binoculars.html')));
        // this.element.appendChild(this.newButton('Play Now!', () => window.location.replace('/static/play.html')));
        // this.element.appendChild(this.newButton('Log In', () => window.location.replace('/static/auth.html'), 'end'));

    }

    render = (parent: Element) => { 

        this.createElement();
        parent.appendChild(this.element);

    };

    renderDown:()=>void = () => {

        this.createElement();

    };

    registerNewRoute(text:string, callback:()=>void, eClass?:string):void {

        this.routes.push({text, callback, eClass});
        this.renderDown();

    };

    removeRoute = (text:string) => {

        this.routes = this.routes.filter(route=>route.text!==text);
        this.renderDown();

    };


}

type SubTitle = {

    text: string;
    callBack: ()=>void;

}