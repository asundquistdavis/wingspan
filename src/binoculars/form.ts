import Bird from "../lib/bird";
import BirdCard from "../lib/birdCard";
import { Renderable, newElement } from "../lib/master";
import '../styles/form.scss';


export default class Form implements Renderable {

    element: Element;
    bird: Bird; 
    trigger:()=>void;
    id:string = 'form';
    card:BirdCard;

    static new( id:string, bird:Bird, trigger:()=>void): Form {

        const form = new Form();
        form.bird = bird;
        form.id = id;
        form.trigger = trigger;
        return form;

    };

    render(parent:Element):void {

        this?.element?.remove();  
        this.element = newElement('div', this.id, {class: 'form'});

        const field = (name:string, type:string) => {return newElement('input', this.id + name, {type: type, placeholder: name})};

        const name = field('name', 'text');
        const latin = field('latin', 'text');
        const habitat = field('habitat', 'text');
        const food = field('food', 'text');
        const feathers = field('feathers', 'number');
        const nest = field('nest', 'text');
        const eggCapacity = field('egg-capacity', 'number');
        const ability = field('ability', 'text');
        const wingspan = field('wingspan', 'number');
        const flavor = field('flavor', 'text');

        const fields = [name, latin, habitat, food, feathers, nest, eggCapacity, ability, wingspan, flavor];

        const left = newElement('div', this.id + '-left', {class: 'form-left'});
        const right = newElement('div', this.id + '-right', {class: 'form-right'});
        left.appendChild(name);
        left.appendChild(habitat);
        left.appendChild(food);
        left.appendChild(nest);
        left.appendChild(eggCapacity);
        right.appendChild(latin);
        right.appendChild(feathers);
        right.appendChild(wingspan);
        right.appendChild(ability);
        right.appendChild(flavor);

        const update = (event:Event) => {

            this.bird.name = name.value;
            this.bird.latin = latin.value;
            this.bird.habitat = habitat.value;
            this.bird.food = food.value;
            this.bird.feathers = parseInt(feathers.value);
            this.bird.nest = nest.value;
            this.bird.eggCapacity = parseInt(eggCapacity.value);
            this.bird.ability = ability.value;
            this.bird.wingspan = parseInt(wingspan.value);
            this.bird.flavor = flavor.value;

            console.log(this.trigger)
            this.trigger();
            
        };

        fields.forEach(field=>{
            field.onkeyup = update;
            field.onchange = update;
        });

        
        this.element.appendChild(left);
        this.element.appendChild(right);

        parent.appendChild(this.element)

    };

}

