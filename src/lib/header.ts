import { Renderable, newElement, title } from "./master";
import '../styles/header.scss';


export default class Header implements Renderable {
    
    
    element: HTMLElement;
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

    createElement(badge:boolean) {

        if (badge) {

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

    render(parent: Element, params?:Partial<{badge:boolean, width:number, height:number}>) { 

        this.createElement(params?.badge);
        parent.appendChild(this.element);

    };

    renderDown():void {

        if (!this.element) {return}
        const parent = this.element.parentElement;
        this.element.remove();
        this.createElement(false);
        parent.appendChild(this.element);

    };

    registerNewRoute(text:string, callback:()=>void, eClass?:string):void {

        this.routes.push({text, callback, eClass})
        
    }

}

type SubTitle = {

    text: string;
    callBack: ()=>void;

}