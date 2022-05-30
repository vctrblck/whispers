class Input {
  constructor() {
    this.current = {
      left: false,
      right: false,
      mouseX: 0,
      mouseY: 0,
    };
    this.previous = null;
    this.currentKeys = {};
    this.previousKeys = {};

    // Event Listeners

    document.addEventListener(
      'mousedown',
      (event) => this.onMouseDown(event),
      false
    );

    document.addEventListener(
      'mouseup',
      (event) => this.onMouseUp(event),
      false
    );

    document.addEventListener(
      'mousemove',
      (event) => this.onMouseMove(event),
      false
    );

    document.addEventListener(
      'keydown',
      (event) => this.onKeyDown(event),
      false
    );

    document.addEventListener('keyup', (event) => this.onKeyUp(event), false);
  }

  onMouseDown(event) {
    switch (event.button) {
      case 0: {
        this.current.left = true;
        break;
      }

      case 2: {
        this.current.right = true;
        break;
      }
    }
  }

  onMouseUp(event) {
    switch (event.button) {
      case 0: {
        this.current.left = false;
        break;
      }

      case 2: {
        this.current.right = false;
        break;
      }
    }
  }

  onMouseMove(event) {
    this.current.mouseX = event.pageX - window.innerWidth / 2;
    this.current.mouseY = event.pageY - window.innerHeight / 2;

    if (this.previous === null) {
      this.previous = { ...this.current };
    }

    this.current.mouseXDelta = this.current.mouseX - this.previous.mouseX;
    this.current.mouseYDelta = this.current.mouseY - this.previous.mouseY;
  }

  onKeyDown(event) {
    this.currentKeys[event.keyCode] = true;
  }

  onKeyUp(event) {
    this.currentKeys[event.keyCode] = false;
  }

  update() {
    this.previous = { ...this.current };
  }
}

export default Input;
