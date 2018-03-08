import { PaceCalculator as pc } from './calculator'

export class DistanceSlider extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let wrapper = document.createElement('div');
        wrapper.className = "wrapper";

        let subwrapper = document.createElement('span');
        subwrapper.className = "subwrapper";

        let pace = document.createElement("span");
        pace.className = "pace";

        let minutes = document.createElement("span");
        minutes.textContent = "00";
        let seconds = document.createElement("span");
        seconds.textContent = "00";
        let divider = document.createElement("span");
        divider.textContent = ":";
        pace.appendChild(minutes);
        pace.appendChild(divider)
        pace.appendChild(seconds);

        let result = document.createElement("span");
        result.className = "distance";
        result.textContent = "0km"

        var duration;
        if(this.hasAttribute('duration')) {
          duration = +this.getAttribute('duration');
        } else {
          duration = 6*60;
        }

        let distance = pc.distance(duration);

        let inputelement = document.createElement("input");
        inputelement.type = "range";
        inputelement.className = "slider";
        inputelement.min = 3;
        inputelement.max = 8;
        inputelement.setAttribute('value', 8);
        inputelement.step = 0.0001;
        inputelement.addEventListener("input", ev => {
            updatePace(ev.target.value);
        });

        this.refreshPace = () => {
            updatePace(inputelement.value);
        }

        let updatePace = value =>  {
            let pretty = pc.prettyMinutes(value);
            minutes.textContent = ('0' + pretty.minutes).slice(-2);
            seconds.textContent = ('0' + pretty.seconds).slice(-2);

            result.textContent = distance(value).toFixed(2) + "km";
        }

        let style = document.createElement('style');

        style.textContent =
`.wrapper {
    position: relative;
    display: block;
}
.slider {
    width: 100%;
}
.subwrapper {
    display: flex;
}
.pace {
    font-size: 1.4rem;
}
.distance {
    font-size: 1.4rem;
    margin-left:auto;
}`;

        wrapper.appendChild(inputelement);
        subwrapper.appendChild(pace);
        subwrapper.appendChild(result);

        wrapper.appendChild(subwrapper);

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        this.refreshPace();
    }
}