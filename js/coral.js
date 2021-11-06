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
    this.setup(obj);
    this.init();
  }

  setup(obj) {
    if (obj) {
      this.stepWidth = obj.stepWidth ? obj.stepWidth : 500;
      this.speed = obj.speed ? obj.speed : 1;
      this.autoplaySpeed = obj.autoplaySpeed ? obj.autoplaySpeed : 0;
    }
  }

  init() {
    if ($('.coral-slider')) {
      this.sliderElement = $('.coral-slider').children().clone();
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
    const sliderItems = $('.coral-slider').children();
    if (sliderItems && sliderItems.length) {
      $(sliderItems).each((index, object) => {
        this.sliderWidth += $(object).width();
      });
    }
  }

  handleMouseEnter() {
    $('.coral-slider').on('mouseenter', () => {
      this.destroyRunning();
    });
  }

  handleMouseLeave() {
    $('.coral-slider').on('mouseleave', () => {
      this.runningSlider();
    });
  }

  handleTouchStart() {
    $('.coral-slider').on('touchstart mousedown', (event) => {
      event.preventDefault();
      this.drag = true;
      this.startPoint = event.originalEvent.screenX;
    });
  }

  handleTouchMove() {
    $('.coral-slider').on('touchmove mousemove', (event) => {
      event.preventDefault();
    });
  }

  animation(offset, speed) {
    $('.coral-slider').css('transform', `translate3d(${offset}px, 0px, 0px)`);
    $('.coral-slider').css('transition', `transform ${speed}s`);
  }

  handleTouchEnd() {
    $('.coral-slider').on('touchend mouseup', (event) => {
      event.preventDefault();
      const element = $('.coral-slider').offset();
      const start = this.startPoint;
      const end = event.originalEvent.screenX;
      const leftOffset = element.left - start + end;
      this.animation(leftOffset, this.speed);
      this.startPoint = null;
      this.drag = false;
    });
  }

  handleTouchCancel() {
    $('.coral-slider').on('touchcancel mouseleave', (event) => {
      event.preventDefault();
    });
  }

  runningSlider() {
    this.sliderInterval = setInterval(() => {
      this.leftOffset = Math.ceil($('.coral-slider').find('.coral-item').first().offset().left);
      $('.coral-slider').css('transform', `translate3d(${this.leftOffset - this.stepWidth}px, 0px, 0px)`);
      $('.coral-slider').css('transition', `transform ${this.speed}s`);
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
    this.sliderElement.appendTo('.coral-slider');
    this.sliderElementCount += 1;
  }

  destroyRunning() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }
}
