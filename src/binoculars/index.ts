import Bird from "../lib/bird";
import { Connection, Discharge, Payload, Root } from "../lib/master";
import Form from "./form";
import '../styles/master.scss';
import Binoculars from "./binoculars";
import App from "../lib/app";


class Client {

    sending:boolean = false;
    state:State;
    app:App;

    static async new():Promise<Client> {

        const userId:number = parseInt(localStorage.getItem('userId'));
        if (!userId) {
            window.location.replace('/static/auth.html');
        }
        const client:Client = new Client();
        const state:State = State.new();
        const app = App.new();
        client.state = state;
        client.app = app;
        client.app.render();

        return client
    
    }

}


class State {

    bird:Bird = Bird.default();
    birds:Bird[] = [];

    static new():State {

        const state = new State();

        return state

    }

}


class BinocularsDischarge extends Discharge {

    birds: Bird[];

 
    static from(object:any):BinocularsDischarge {

        const discharge = new BinocularsDischarge();
        discharge.birds = object.birds;
        discharge.connectionId = object.connectionId;
        return discharge

    }

}

Client.new();
