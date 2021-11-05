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
    this.setup(obj);
    this.init();
  }

  setup(obj) {
    if (obj) {
      this.stepWidth = obj.stepWidth ? obj.stepWidth : 500;
      this.speed = obj.speed ? obj.speed : 2;
      this.autoplaySpeed = obj.autoplaySpeed ? obj.autoplaySpeed : 0;
    }
  }

  init() {
    if ($('.coral-slider')) {
      this.sliderElement = $('.coral-slider').children().clone();
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

  runningSlider() {
    this.sliderInterval = setInterval(() => {
      this.leftOffset = Math.ceil($('.coral-slider').find('.coral-item').first().offset().left);
      $('.coral-slider').css('transform', `translate3d(${this.leftOffset - this.stepWidth}px, 0px, 0px)`);
      $('.coral-slider').css('transition', `transform ${this.speed}s`);
    }, this.autoplaySpeed);
  }

  trackingViewport() {
    this.viewportInterval = setInterval(() => {
      const windowWidth = $(window).width();
      if (((this.leftOffset * -1) + windowWidth) >= (this.sliderWidth * this.sliderElementCount - 100)) {
        this.sliderElement.appendTo('.coral-slider');
        this.sliderElementCount += 1;
      }
    }, 1000);
  }
}
