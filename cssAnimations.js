const css = {};
Array.isNodeList = function (nodes) {
    var stringRepr = Object.prototype.toString.call(nodes);

    return typeof nodes === 'object' &&
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
        (typeof nodes.length === 'number') &&
        (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
};
class cssFunction {
    constructor(toChanges, changes, time) {
        this.toChanges = toChanges;
        this.changes = changes;
        this.time = time;
    }
    run(element, then, thenArgs) {
        let length = (Array.isNodeList(element) || Array.isArray(element)) ? Object.keys(element).length : 1;
        if (this.toChanges.setUp !== undefined) {
            for (let i = 0; i < length; i++) {
                let change = (Array.isNodeList(element) || Array.isArray(element)) ? element[i] : element;
                for (let j = 0; j < this.toChanges.setUp.length; j++) {
                    change.style[this.toChanges.setUp[j]] = eval(this.changes.setUp[j]);
                }
            }
        }
        let start = null;
        const animate = (timeStamp) => {
            if (!start) start = timeStamp;
            let progress = timeStamp - start;
            for (let i = 0; i < length; i++) {
                let change = (Array.isNodeList(element) || Array.isArray(element)) ? element[i] : element;
                change.style[this.toChanges.animate] = eval(this.changes.animate);
            }
            if (progress < this.time) {
                window.requestAnimationFrame(animate);
            } else {
                if (this.toChanges.end !== undefined) {
                    {
                        for (let i = 0; i < length; i++) {
                            let change = (Array.isNodeList(element) || Array.isArray(element)) ? element[i] : element;
                            for (let j = 0; j < this.toChanges.end.length; j++) {
                                change.style[this.toChanges.end[j]] = eval(this.changes.end[j]);
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
        animate: "`translateY(${-((progress/100)**2.5 - (progress/100)*10)}px)`",
        end: ["'none'", "`${change.style.top + (-((progress/100)**2.5 - (progress/100)*10))}px`"]
    },
    2000
);

css.fadeIn = new cssFunction({
        setUp: ["display"],
        animate: "opacity"
    }, {
        setUp: ["'block'"],
        animate: "progress/300"
    },
    300
);

css.fadeOut = new cssFunction({
        animate: "opacity",
        end: ["display"]
    }, {
        animate: "1 - progress/300",
        end: ["'none'"]
    },
    300
);

css.slideDownToMiddle = new cssFunction({
        setUp: ["display", "top"],
        animate: "transform",
        end: ["top"]
    }, {
        setUp: ["'block'", "`${-change.offsetHeight}px`"],
        animate: "`translateY(${-((progress/35 - (innerHeight/1.5 + 20)**.5)**2 - innerHeight/1.5 + 20)}px)`",
        end: ["`${change.style.top + (-((progress/35 - (innerHeight/1.5 + 20)**.5)**2 - innerHeight/1.5 + 20))}px`"]
    },
    1100
);
