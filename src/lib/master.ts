import axios from "axios";

export class Connection {
    
    payload:Payload = new Payload();
    listeners:((data:Discharge)=>void)[]=[(data:Discharge)=>{this.payload.connectionId=data.connectionId}];
    discharge: typeof Discharge;
    CONFIG:object = { method:'POST', headers: {"Content-Type": "application/json"}};
    DOMAIN:string = 'http://127.0.0.1:5000';
    APIURI:string = '/api';
    
    get id():number {
        return this.payload.connectionId;
    }
    
    set id(_val:number) {
        this.payload.connectionId = _val;
    };
    
    static async new(userId:number, pageName:string, discharge:typeof Discharge):Promise<Connection> {
        
        const connection = new Connection();
        connection.discharge = discharge;
        connection.payload.userId = userId;
        connection.payload.pageName = pageName;
        console.log(connection.payload)
        connection.poll();
        return connection
        
    };
    
    async poll() {
        
        const data:Discharge = this.discharge.from((await axios.post(this.DOMAIN + this.APIURI, this.payload, this.CONFIG)).data);
        this.listeners.forEach(listener=>listener(data));
        this.poll();
        
    };

    registerListener(listener:(data:Discharge)=>void) {

        this.listeners.push(listener);

    };
    
}


export class Payload {
    
    new:any;
    connectionId:number = null;
    userId:number = 0;
    pageName:string = "";
    
    constructor() {
        
    }
    
}

export class Discharge {
    
    connectionId:number;
    
    static from(object:any):Discharge {
        
        const discharge = new Discharge();
        discharge.connectionId = object.connectionId;
        return discharge;
        
    };
    
}

export type Renderable = {

    element:Element;
    render:(parent:Element, params?:Partial<{badge:boolean, width:number, height:number}>)=>void;
    renderDown:()=>void;

};

export class Root {

    element:Element = document.getElementById('root');
    children:Renderable[] = [];

    static new():Root {

        const root = new Root();

        return root

    };

    render(): void {

        this.children.forEach(child=>{

            child.element?.remove();

            child.render(this.element);
        
        });

    };

}

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

}


export function capitalize(string:string):string {

    return string.length > 0? (string[0].toUpperCase()  +string.slice(1)) : string;

}

export function title(string:string):string {

    const subs = string.split(new RegExp('\\s'));
    return subs.length>0? subs.map(capitalize).join(' '): string;

}