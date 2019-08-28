isNodeList = (nodes) =>  typeof nodes === 'object' && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(nodes)) && (typeof nodes.length ==='number') && (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
const css = {};
class cssFunction {
    constructor(toChanges, changes, time) {
        this.toChanges = toChanges;
        this.changes = changes;
        this.time = time;
    }
    run(element, then, thenArgs) {
        let length = (isNodeList(element) || Array.isArray(element)) ? Object.keys(element).length : 1;
        if (this.toChanges.setUp !== undefined) {
            for (let i = 0; i < length; i++) {
                let change = (isNodeList(element) || Array.isArray(element)) ? element[i] : element;
                for (let j = 0; j < this.toChanges.setUp.length; j++) {
                    change.style[this.toChanges.setUp[j]] = this.changes.setUp[j](change);
                }
            }
        }
        let start = null;
        const animate = (timeStamp) => {
            if (!start) start = timeStamp;
            let progress = timeStamp - start;
            for (let i = 0; i < length; i++) {
                let change = (isNodeList(element) || Array.isArray(element)) ? element[i] : element;
                change.style[this.toChanges.animate] = this.changes.animate(progress, change);
            }
            if (progress < this.time) {
                window.requestAnimationFrame(animate);
            } else {
                if (this.toChanges.end !== undefined) {
                    {
                        for (let i = 0; i < length; i++) {
                            let change = (isNodeList(element) || Array.isArray(element)) ? element[i] : element;
                            for (let j = 0; j < this.toChanges.end.length; j++) {
                                change.style[this.toChanges.end[j]] = this.changes.end[j](progress, change);
                            }
                        }
                    }
                }
                if (then !== undefined) {
                    (Array.isArray(then)) ? then[0].run(then[1], then.splice(0, 2)): then.run(thenArgs);
                }
            }
        };
        window.requestAnimationFrame(animate);
    }
}
css.bounceDownUp = new cssFunction({
        animate: "transform",
        end: ["display", "top"]
    }, {
        animate: (progress) => `translateY(${-((progress/100)**2.5 - (progress/100)*10)}px)`,
        end: [() => 'none', (progress, change) => `${change.style.top + (-((progress/100)**2.5 - (progress/100)*10))}px`]
    },
    2000
);

css.fadeIn = new cssFunction({
        setUp: ["display"],
        animate: "opacity"
    }, {
        setUp: [() => 'block'],
        animate: (progress) => progress/300
    },
    300
);

css.fadeOut = new cssFunction({
        animate: "opacity",
        end: ["display"]
    }, {
        animate: (progress) => 1 - progress/300,
        end: [() => 'none']
    },
    300
);

css.slideDownToMiddle = new cssFunction({
        setUp: ["display", "top"],
        animate: "transform",
        end: ["top"]
    }, {
        setUp: [() => 'block', (progress, change) => `${-change.offsetHeight}px`],
        animate: (progress) => `translateY(${-((progress/35 - (innerHeight/1.5 + 20)**.5)**2 - innerHeight/1.5 + 20)}px)`,
        end: [(progress, change) => `${change.style.top + (-((progress/35 - (innerHeight/1.5 + 20)**.5)**2 - innerHeight/1.5 + 20))}px`]
    },
    1100
);
