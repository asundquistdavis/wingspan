import axios from "axios"
import { Connection, Discharge } from "../lib/master";


class State {
    
    game:{};
    
    static new():State {
        
        const state = new State();
        return state
        
    };
    
}


class Client {
    
    connection:Connection;
    
    static async new() {
        
        const state = State.new();
        const user_id = parseInt(localStorage.getItem('user_id')) || 0;
        // add listener
        const connection = await Connection.new(user_id, 'game', Discharge);
        const client = new Client();
        client.connection = connection;
        return client
        
    };
    
}

Client.new();
