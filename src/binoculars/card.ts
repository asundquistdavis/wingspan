import Bird from "../lib/bird";

export default class Card {

    element:HTMLElement


    static from(bird:Bird):Card {

        const card = new Card();

        return card

    };

    render(): void {

        
    } 

}