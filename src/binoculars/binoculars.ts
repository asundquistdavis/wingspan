import Bird from "../lib/bird";
import BirdCard from "../lib/birdCard";
import { Renderable, newElement } from "../lib/master";
import Form from "./form";
import '../styles/binoculars.scss';
import Header from "../lib/header";


export default class Binoculars {

    id:string = 'binoculars';
    element: Element;
    children: Renderable[];
    form:Form;
    card:BirdCard;
    header:Header;

    left = newElement('div', this.id + '-left', {class: 'nocular nocular-left'});
    right = newElement('div', this.id + '-right', {class: 'nocular nocular-right'});

    static new(bird:Bird):Binoculars {

        const binoculars = new Binoculars();
        binoculars.card = BirdCard.new(binoculars.id + '-card', bird, {width: 224})
        binoculars.form = Form.new(binoculars.id + '-form', bird, () => binoculars.card.render(binoculars.left))
        binoculars.element = document.getElementById('root');
        binoculars.header = Header.new();
        window.onresize = () => binoculars.render();
        return binoculars

    };

    render(): void {

        Array.from(this.element.children).forEach(element=>element.remove());

        this.element.className = 'binoculars'

        const bridge = newElement('div', this.id + '-bridge', {class: 'bridge'});

        const connector = newElement('div', this.id + '-connector', {class: 'connector'})


        
        this.header.render(this.element);
        this.element.appendChild(bridge);
        this.element.appendChild(connector);
        this.element.appendChild(this.left);
        this.element.appendChild(this.right);
        this.card.props.height = (.85 * this.left.clientHeight);

        this.card.render(this.left);
        this.form.render(this.right);

    };
    
}
