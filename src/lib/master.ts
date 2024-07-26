import axios from "axios";

export const CONNECTION = {
    CONFIG: { method:'POST', headers: {"Content-Type": "application/json"}},
    // DOMAIN: 'http://127.0.0.1:5000',
    APIURI: '/api',
    api:async (payload:any, currentState:ServerSate, reset?:()=>void)=>{return await 
        axios.post(CONNECTION.APIURI, payload, CONNECTION.CONFIG)
        .then(
            response=>{
                currentState.parseResponseIntoState(response.data);
                reset();
            }, 
            reason => currentState.httpErrorIntoState(reason)
        )
    }
};

export class State {

    events: {name:string, callback:()=>void}[] = [];

    constructor() {}

    dispatchEvents = () => {

        this.events.forEach(event=>event.callback());

    };

    registerEvent = (event:{name:string, callback:()=>void}) => {

        this.events.push(event);

    };

    removeEvent = (name:string) => {

        this.events = this.events.filter(event => event.name!==name);

    };

}

export class ServerSate extends State {
    
    page: string = 'index';
    connectionId: null | string = null;
    user: UserState = UserState.NO_USER();
    isError: boolean = false;
    errorString: string = '';

    constructor() {
        super();
    }

    static new():ServerSate {
        
        const state = new ServerSate();
        return state 

    };

    parseResponseIntoState = (response:any) => {

        if (response.isError) {

            this.isError = true;
            this.errorString = response.errorString;
            
        };

        if (response.user) {
            
            console.log(response.user);
            
            this.user.updateUser(response.user);

        }

        this.dispatchEvents();

    };

    httpErrorIntoState = (reason:any) => {

        console.error(reason);
        this.isError = true;
        this.errorString = 'Http Error';

        this.dispatchEvents();

    };

}


class UserState extends State {

    id:string = '';
    name:string = '';

    static NO_USER():UserState {
        
        const user = new UserState();
        user.id = 'NO_USER'
        return user
    
    };

    updateUser = (userProto:any) => {

        if (userProto.name) {this.name = userProto.name;};
        if (userProto.id) {this.id = userProto.id;};
        this.dispatchEvents();
        
    }

}

export type Renderable = {

    element:Element;
    render:(parent:Element)=>void;
    renderDown:()=>void;

};


export function newElement<K extends keyof HTMLElementTagNameMap>(key:K, id:string, attrs?:Partial<NewElementOptions>, innerText?:string):HTMLElementTagNameMap[K] {

    const elem = document.createElement(key);
    elem.id = id;
    attrs? Object.entries(attrs).forEach(([key, value])=>elem.setAttribute(key, value)): null;
    innerText? elem.innerText = innerText: null;
    return elem

}

export type NewElementOptions = {

    type:string;
    class:string;
    placeholder:string;
    autocomplete:string;
    src:string;
    width:string;
    draggable:string;

}


export function capitalize(string:string):string {

    return string.length > 0? (string[0].toUpperCase()  +string.slice(1)) : string

}

export function title(string:string):string {

    const subs = string.split(new RegExp('\\s'));
    return subs.length>0? subs.map(capitalize).join(' '): string

}

export function sentence(string:string):string {

    const sentences = string.split('. ')
    return sentences.length>0? sentences.map(capitalize).join('. '): string
}