
const d = document;

let touching = false;

export class PointerObserver {
    constructor(el, options) {

        this.options = Object.assign({
            mouse: true,
            touch: true,
            passive: true,
        }, options);

        this.el   = el;
        this.pos  = {};
        this.last = {};
        this.posStart = {};

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.stop = this.stop.bind(this);

        if (!touching) {
			el.addEventListener('mousedown', this.start); // not before mousedown when touching, (because touch is triggering mousedown also?)
		}
        el.addEventListener('touchstart', this.start, {passive: this.options.passive});
    }
	start(e) {
		if (e.type === 'mousedown'  && !this.options.mouse) return; // why is the "start" listener added at all?
		if (e.type === 'touchstart' && !this.options.touch) return; // Be be able to change options after creating the observer?

		let pointer = e;
		if (e.touches) {
			pointer = e.touches[0];
			if (e.touches.length > 1) return; // only the first finger is interesting
			this.identifier = pointer.identifier;
		}

		this.posStart = this.pos = {
			x:pointer.pageX,
			y:pointer.pageY
		};
		if (this.options.mouse) {
            d.addEventListener('mousemove', this.move);
            d.addEventListener('mouseup'  , this.stop);
			d.addEventListener('dragstart', this.stop);
		}
		if (this.options.touch) {
			d.addEventListener('touchmove', this.move, {passive: this.options.passive});
            d.addEventListener('touchend' , this.stop);
            //d.addEventListener('touchstart', gstart);
		}
		this.onstart && this.onstart(e);
		touching = true;
	}
	move(e) {

		let pointer = e;

		if (e.touches) {
			pointer = e.touches[0];

			// const finger2 = e.touches[1];
			// if (finger2 && this.ongesture) {
			// 	const deltaX = pointer.pageX - finger2.pageX;
			// 	const deltaY = pointer.pageY - finger2.pageY;
			// 	const deg = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
			// 	e.rotate = deg -= this.degStart;
		    //     const dist = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
			// 	e.scale = dist / this.distStart;
			// 	this.ongesture && this.ongesture(e);
			// }

			if (pointer.identifier !== this.identifier) return;
		}

		this.last = this.pos;
		this.pos = {
			x: pointer.pageX,
			y: pointer.pageY,
			time: e.timeStamp,
		};
        if (this.last.x===this.pos.x && this.last.y === this.pos.y) return;

        this.onmove && this.onmove(e);
	}
	stop(e) {
		if (e.changedTouches && e.changedTouches[0].identifier !== this.identifier) return;
		this.onstop && this.onstop(e);
		d.removeEventListener('mousemove', this.move);
		d.removeEventListener('mouseup'  , this.stop);
		d.removeEventListener('dragstart', this.stop);
        d.removeEventListener('touchmove', this.move);
		d.removeEventListener('touchend' , this.stop);
        //d.removeEventListener('touchstart', this.gstart);
		touching = false;
	}

    get diff() { // should we direct calculate this before onmove? i think .startDiff is almost ever used
        return {
            x: this.pos.x - this.last.x,
            y: this.pos.y - this.last.y,
            time: this.pos.time - this.last.time,
        };
    }
    /*
    get startDiff() {
        return {
            x: this.posStart.x - this.pos.x,
            y: this.posStart.y - this.pos.y,
            time: this.pos.time - this.posStart.time,
        };
    }
    */

}


// todo?
// gstart = function(e) {
// 	var pointer = e.touches[0];
// 	var finger2 = e.touches[1];
// 	if (finger2) {
// 		var deltaX = pointer.pageX - finger2.pageX;
// 		var deltaY = pointer.pageY - finger2.pageY;
// 		self.degStart = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
// 		self.distStart = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
// 		self.ongesturestart && self.ongesturestart(e);
// 	}
// },