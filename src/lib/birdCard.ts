import { Renderable, newElement, title } from "./master";
import '../styles/birdCard.scss';
import Bird from "./bird";


export default class BirdCard implements Renderable {

    renderDown: () => void = () => {};

    id: string;
    bird:Bird;
    element: HTMLElement;
    props:Partial<Props>;

    static new(id:string, bird:Bird, props?:Partial<Props>): BirdCard {

        const card = new BirdCard();
        card.bird = bird;
        card.id = id;
        card.props = props;
        return card

    };

    render: (parent: Element) => void = (parent) => {

        this.element?.remove();

        this.element = newElement('div', this.id, {class: 'bird-card'});

        const top = newElement('div', this.id+'-top', {class: 'bird-card-top'});
        
        const topLeft = newElement('div', this.id+'-top-left', {class: 'bird-card-top-left'});

        const habitat:(type:string)=>HTMLElement = (type:string) => {
        
            const wrapper = newElement('div', this.id + '-habitat-' + type + '-wrapper', {class: 'bird-card-habitat-wrapper'});

            const assetFileName = type === 'f'? 'forest.webp': type === 'g'? 'grassland.webp': 'wetland.webp';

            const symbol = newElement('img', this.id + '-habitat-' + type + '-symbol', {class: 'bird-card-symbol', src: './assets/' + assetFileName, width: '100%'});
            
            wrapper.appendChild(symbol);

            return wrapper

        };
        
        const habitats = newElement('div', this.id+'-habitat', {class: 'bird-card-habitats'});

        habitats.appendChild(habitat('f'));
        habitats.appendChild(habitat('g'));
        habitats.appendChild(habitat('w'));

        const foods = newElement('div', this.id+'-foods', {class: 'bird-card-foods'});

        const food1 = newElement('div', this.id+'rodent', {class: 'food-symbol'}, 'R');
        foods.appendChild(food1);
        const food2 = newElement('div', this.id+'fish', {class: 'food-symbol'}, 'F');
        foods.appendChild(food2);
        const food3 = newElement('div', this.id+'seed', {class: 'food-symbol'}, 'S');
        foods.appendChild(food3);

        topLeft.appendChild(habitats);
        topLeft.appendChild(foods);
        
        top.appendChild(topLeft);
        
        const topRight = newElement('div', this.id+'-top-right', {class: 'bird-card-top-right'});
        
        const name = newElement('div', this.id+'-name', {class: 'bird-card-name'}, title(this.bird.name));
        const latin = newElement('div', this.id+'-latin', {class: 'bird-card-latin'}, title(this.bird.latin));

        topRight.appendChild(name);
        topRight.appendChild(latin);
        
        top.appendChild(topRight);

        const middle = newElement('div', this.id+'-middle');
        
        const feathers = newElement('div', this.id+'-feathers');
        const nest = newElement('div', this.id+'-nest');
        const eggs = newElement('div', this.id+'-eggs');
        const wingspan = newElement('div', this.id+'-wingspan');
        
        const bottom = newElement('div', this.id+'-bottom', {class: 'bird-card-bottom'});
        bottom.style.setProperty('--color', 'brown');

        const ability = newElement('div', this.id + 'ability', {class: 'bird-card-ability'}, this.bird.abilityString())

        bottom.appendChild(ability);

        const flavor = newElement('div', this.id+'-flavor', {class: 'bird-card-flavor'}, this.bird.flavor);

        this.element.appendChild(top);
        this.element.appendChild(middle);
        this.element.appendChild(bottom);this.element.appendChild(flavor);

        this?.props?.height? this.element.style.setProperty('--height', this.props.height + 'px'): null;

        parent.appendChild(this.element);

    };

}

export type Props = {
    width:number;
    height:number;
    top:number;
    bottom:number;
    left:number;
    right:number;
} 