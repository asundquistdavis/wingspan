


export default class Bird {

    name:string;
    latin:string;
    habitat:string; 
    food:string;
    feathers:number;
    nest:string;
    eggCapacity:number;
    ability:string;
    wingspan:number;
    flavor:string;

    static new(name:string, latin:string, habitat:string, food:string, feathers:number, nest:string, eggCapacity:number, ability:string, wingspan:number,flavor:string) {
        const bird = new Bird();
        bird.name = name;
        bird.latin = latin;
        bird.habitat = habitat;
        bird.food = food;
        bird.feathers = feathers;
        bird.nest = nest;
        bird.eggCapacity = eggCapacity;
        bird.ability = ability;
        bird.wingspan = wingspan;
        bird.flavor = flavor;
        return bird
    }

    static default():Bird {

        const bird = new Bird();
        bird.name = 'new bird';
        bird.latin = 'novas avis';
        bird.habitat = '';
        bird.food = '';
        bird. feathers = 0;
        bird.nest = '';
        bird.eggCapacity = 0;
        bird.ability = 'apf75'
        bird.wingspan = 0;
        bird.flavor = 'This is a new bird.';
        return bird

    };

    abilityString():string {

        if (this.ability[0] === 'a') {
            switch (this.ability[1]) {
                case 'p':
                
                    switch (this.ability[2]) {
                        case 'w':

                            const value = this.ability.slice(2);
                            return 'look at a bird card from the top of the deck. if it has a wingspan of ' + value + ' tuck it under this bird.'
                        
                        case 'r':

                            return 'roll all dice not in the bird-feeder. if any are rodents, cache 1 rodent from supply on this bird.'

                        case 'f':

                            return 'roll all dice not in the bird-feeder. if any are fish, cache 1 fish from supply on this bird.'

                    }


                default:

                    return ""
            }
        }
        return ""
    }

}
