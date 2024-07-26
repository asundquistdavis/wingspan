import Card from "../binoculars/card";
import { Renderable, newElement, sentence } from "./master";
import '../styles/gameboard.scss';



export default class GameBoard implements Renderable {

    element: Element;
    forestCards: Card[];
    meadowCards: Card[];
    wetlandsCards: Card[];

    createCard = (id:string, emblem:string, entityEmblem:string, quantity:number, optionalEmblem?:string, hidden?:boolean) => {

        const card = newElement('div', id + '-card', {class: 'game-board-card'});
        const top = newElement('div', id + '-top', {class: 'gb-card-top'});
        const timg = newElement('img', id+ 'timg', {class: 'gb-card-top-img', src: emblem, draggable: 'false'});
        hidden? null:top.appendChild(timg);
        const mid = newElement('div', id + '-mid', {class: 'gb-card-mid'});
        const createEntity = (index:number) => {
            const entity = newElement('div', id + '-entity-' + index, {class: 'gb-card-entity'});
            entity.appendChild(newElement('img', id + '-entity-' + index + '-img', {class:'gb-card-entity-img', src: entityEmblem, draggable: 'false'}));
            return entity
        }
        console.log(Array.from(Array(quantity)));
        Array.from(Array(quantity)).forEach((_, index)=>mid.appendChild(createEntity(index)));
        card.appendChild(top);
        card.appendChild(mid);
        const bot = newElement('div', id + '-bot', {class: 'gb-card-bot'});
        if (optionalEmblem) {
            const opl = newElement('div', id + '-bot-left', {class: 'gb-card-bot-left'});
            const opm = newElement('div', id + '-bot-mid', {class: 'gb-card-bot-mid'});
            const opr = newElement('div', id + '-bot-right', {class: 'gb-card-bot-right'});
            const opt = newElement('img', id + '-bottom-opt', {class: 'gb-card-bot-opt', src:optionalEmblem, draggable: 'false'});
            const arrow = newElement('img', id + '-bottom-arrow', {class: 'gb-card-bot-arrow', src:'./assets/arrow.svg', draggable: 'false'});
            const ent = newElement('img', id + '-bottom-ent', {class: 'gb-card-bot-ent', src:entityEmblem, draggable: 'false'});
            opl.appendChild(opt);
            opm.appendChild(arrow);
            opr.appendChild(ent);
            bot.appendChild(opl);
            bot.appendChild(opm);
            bot.appendChild(opr);
            card.appendChild(newElement('div', id+'-hr', {class: 'gb-hr'}))
        }
        card.appendChild(bot);
        return card

    };

    createRow = (id:string, action:string, emblem:string, entityEmblem:string, contentArr:{quantity:number, optionalEmblem?:string, hidden?:boolean}[]) => {
        
        const row = newElement('div', id + '-row', {class: 'game-board-row'});
        const primary = newElement('div', id + '-primary', {class: 'game-board-card primary'});
        const ptop = newElement('div', id + '-primary-top', {class: 'gb-primary-top'});
        const pleft = newElement('div', id + '-primary-left', {class: 'gb-primary-left'});
        const pimg = newElement('img', id + '-primary-img', {class: 'gb-primary-img', src: emblem, draggable: 'false'});
        const pright = newElement('div', id + '-primary-right', {class: 'gb-primary-right'}, sentence(action));
        const pbottom = newElement('div', id + '-primary-bottom', {class: 'gb-primary-bottom'}, sentence('then activate any brown powers in this row'));
        ptop.appendChild(pleft);
        ptop.appendChild(pright);
        pleft.appendChild(pimg)
        primary.appendChild(ptop);
        primary.appendChild(pbottom);
        row.appendChild(primary);
        contentArr.forEach(({quantity, optionalEmblem, hidden}, index) => row.appendChild(this.createCard(id+'-'+index, emblem, entityEmblem, quantity, optionalEmblem, hidden)));
        return row
    };
    
    createElement:()=>void = () => {

        this.element = newElement('div', 'game-board', {class: 'game-board'});
        const top = newElement('div', 'top', {class: 'game-board-row top'});
        const forest = this.createRow('forest', 'gain food from supply', './assets/forest.webp', './assets/die.webp', [
            {quantity: 1},
            {quantity: 1, optionalEmblem: './assets/card.webp'},
            {quantity: 2},
            {quantity: 2, optionalEmblem: './assets/card.webp'},
            {quantity: 3}, 
            {quantity: 3, optionalEmblem: './assets/card.webp', hidden:true}, 
        ]);
        const grassland = this.createRow('grassland', 'lay eggs on birds', './assets/grassland.webp', './assets/egg.webp', [
            {quantity: 2}, 
            {quantity: 2, optionalEmblem: './assets/wild.webp'}, 
            {quantity: 3}, 
            {quantity: 3, optionalEmblem: './assets/wild.webp'}, 
            {quantity: 4}, 
            {quantity: 4, optionalEmblem: './assets/wild.webp', hidden:true}, 
        ]);
        const wetland = this.createRow('wetland', 'lay eggs on birds', './assets/wetland.webp', './assets/card.webp', [
            {quantity: 1}, 
            {quantity: 1, optionalEmblem: './assets/egg.webp'}, 
            {quantity: 2}, 
            {quantity: 2, optionalEmblem: './assets/egg.webp'}, 
            {quantity: 3}, 
            {quantity: 3, optionalEmblem: './assets/egg.webp', hidden:true}, 
        ]);
        this.element.appendChild(top);
        this.element.appendChild(forest);
        this.element.appendChild(grassland);
        this.element.appendChild(wetland);

    };
    
    render: (parent: Element) => void = (parent)=> {

        this.createElement();
        parent.appendChild(this.element);

    };
    
    renderDown: () => void = () => {

        if (!this.element) {return};
        const parent = this.element.parentElement;
        this.element.remove();
        this.createElement();
        parent.appendChild(this.element);

    };



}