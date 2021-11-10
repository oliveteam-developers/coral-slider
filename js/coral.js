export default class Coral {
  constructor(obj) {
    this.stepWidth = 0;
    this.speed = 0;
    this.autoplaySpeed = 0;
    this.sliderElement = null;
    this.sliderElementCount = 1;
    this.sliderWidth = 0;
    this.sliderInterval = null;
    this.viewportInterval = null;
    this.leftOffset = 0;
    this.drag = false;
    this.startPoint = null;
    this.class = null;
    this.setup(obj);
    this.init();
  }

  setup(obj) {
    this.stepWidth = obj && obj.stepWidth ? obj.stepWidth : 500;
    this.speed = obj && obj.speed ? obj.speed : 1;
    this.autoplaySpeed = obj && obj.autoplaySpeed ? obj.autoplaySpeed : 0;
    this.class = obj && obj.class ? obj.class : 'coral-slider';
  }

  init() {
    if ($(`.${this.class}`)) {
      this.sliderElement = $(`.${this.class}`).children().clone();
      this.handleMouseEnter();
      this.handleMouseLeave();
      this.handleTouchStart();
      this.handleTouchMove();
      this.handleTouchEnd();
      this.handleTouchCancel();
      this.getSliderWidth();
      this.trackingViewport();
      this.runningSlider();
    }
  }

  getSliderWidth() {
    const sliderItems = $(`.${this.class}`).children();
    if (sliderItems && sliderItems.length) {
      $(sliderItems).each((index, object) => {
        this.sliderWidth += $(object).width();
      });
    }
  }

  handleMouseEnter() {
    $(`.${this.class}`).on('mouseenter', () => {
      this.destroyRunning();
    });
  }

  handleMouseLeave() {
    $(`.${this.class}`).on('mouseleave', () => {
      this.runningSlider();
    });
  }

  handleTouchStart() {
    $(`.${this.class}`).on('touchstart mousedown', (event) => {
      event.preventDefault();
      this.drag = true;
      this.startPoint = event.originalEvent.screenX;
    });
  }

  handleTouchMove() {
    $(`.${this.class}`).on('touchmove mousemove', (event) => {
      event.preventDefault();
    });
  }

  animation(offset, speed) {
    $(`.${this.class}`).css('transform', `translate3d(${offset}px, 0px, 0px)`);
    $(`.${this.class}`).css('transition', `transform ${speed}s`);
  }

  handleTouchEnd() {
    $(`.${this.class}`).on('touchend mouseup', (event) => {
      event.preventDefault();
      const element = $(`.${this.class}`).offset();
      const start = this.startPoint;
      const end = event.originalEvent.screenX;
      this.leftOffset = element.left - start + end;
      this.leftOffset = this.leftOffset > 0 ? 0 : this.leftOffset;
      this.animation(this.leftOffset, this.speed);
      this.startPoint = null;
      this.drag = false;
    });
  }

  handleTouchCancel() {
    $(`.${this.class}`).on('touchcancel mouseleave', (event) => {
      event.preventDefault();
    });
  }

  runningSlider() {
    this.sliderInterval = setInterval(() => {
      this.leftOffset = Math.ceil($(`.${this.class}`).find('.coral-item').first().offset().left);
      $(`.${this.class}`).css('transform', `translate3d(${this.leftOffset - this.stepWidth}px, 0px, 0px)`);
      $(`.${this.class}`).css('transition', `transform ${this.speed}s`);
      this.animation(this.leftOffset - this.stepWidth, this.speed);
    }, this.autoplaySpeed);
  }

  trackingViewport() {
    this.viewportInterval = setInterval(() => {
      const windowWidth = $(window).width();
      if (((this.leftOffset * -1) + windowWidth) >= (this.sliderWidth * this.sliderElementCount - 500)) {
        this.appendToSlider();
      }
    }, 1000);
  }

  appendToSlider() {
    this.sliderElement = this.sliderElement.clone();
    this.sliderElement.appendTo(`.${this.class}`);
    this.sliderElementCount += 1;
  }

  prependToSlider() {
    this.sliderElement = this.sliderElement.clone();
    this.sliderElement.prependTo(`.${this.class}`);
    this.sliderElementCount += 1;
  }

  destroyRunning() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }
}
