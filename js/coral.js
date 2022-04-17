export default class Coral {
    constructor(obj) {
        this.stepWidth = 0;
        this.mobileStepWidth = 0;
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
        this.position = null;
        this.isRunning = true;
        this.windowHeight = window.innerHeight;
        this.setup(obj);
        this.init();
    }

    setup(obj) {
        this.stepWidth = obj && obj.stepWidth ? obj.stepWidth : 500;
        this.mobileStepWidth = obj && obj.mobileStepWidth ? obj.mobileStepWidth : 500;
        this.speed = obj && obj.speed ? obj.speed : 1;
        this.autoplaySpeed = obj && obj.autoplaySpeed ? obj.autoplaySpeed : 0;
        this.class = obj && obj.class ? obj.class : 'coral-slider';
    }

    init() {
        if ($(`.${this.class}`)[0]) {
            this.sliderElement = $(`.${this.class}`).children().clone();
            this.handleActiveWindow();
            this.handleMouseEnter();
            this.handleMouseLeave();
            this.handleTouchStart();
            this.handleTouchMove();
            this.handleTouchEnd();
            this.handleTouchCancel();
            this.getSliderWidth();
            this.trackingViewport();
            this.runningSlider();
            this.handleOffset();
            this.triggerScrolling();
        }
    }

    handleActiveWindow() {
        $(window).focus(() => {
            if (!this.isRunning) {
                this.reRunningSlider();
                this.isRunning = true;
            }
        });

        $(window).blur(() => {
            if (this.isRunning) {
                this.resetSlider();
                this.isRunning = false;
            }
        });
    }

    triggerScrolling() {
        setTimeout(() => {
            $(document).ready(() => {
                $(window).scroll(() => {
                    const currentScroll = $(window).scrollTop();
                    if (currentScroll <= (this.position.topLine - this.windowHeight - 100) || currentScroll >= (this.position.bottomLine + this.windowHeight + 100)) {
                        if (this.isRunning) {
                            this.resetSlider();
                            this.isRunning = false;
                        }
                    } else {
                        if (!this.isRunning) {
                            this.reRunningSlider();
                            this.isRunning = true;
                        }
                    }
                });
            });
        }, 2000);
    }

    handleOffset() {
        const offsetToTop = $(`.${this.class}`).offset().top;
        const height = $(`.${this.class}`).height();
        this.position = {
            topLine: offsetToTop,
            height,
            bottomLine: offsetToTop + height,
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
            if (!this.isMobile()) {
                event.preventDefault();
            } else {
                this.destroyRunning();
            }
            this.drag = true;
            this.startPoint = !this.isMobile() ? event.originalEvent.screenX : event.originalEvent.changedTouches[0].screenX;
        });
    }

    handleTouchMove() {
        $(`.${this.class}`).on('touchmove mousemove', (event) => {
            // event.preventDefault();
        });
    }

    animation(offset, speed) {
        $(`.${this.class}`).css('transform', `translate3d(${offset}px, 0px, 0px)`);
        $(`.${this.class}`).css('transition', `transform ${speed}s`);
        $(`.${this.class}`).css('-webkit-transform', `translate3d(${offset}px, 0px, 0px)`);
        $(`.${this.class}`).css('-webkit-transition', `transform ${speed}s`);
    }

    handleTouchEnd() {
        $(`.${this.class}`).on('touchend mouseup', (event) => {
            // event.preventDefault();
            const element = $(`.${this.class}`).offset();
            const start = this.startPoint;
            const end = !this.isMobile() ? event.originalEvent.screenX : event.originalEvent.changedTouches[0].screenX;
            this.leftOffset = element.left - 2 * (start - end);
            this.leftOffset = this.leftOffset > 0 ? 0 : this.leftOffset;
            this.animation(this.leftOffset, this.speed);
            this.startPoint = null;
            this.drag = false;
        });
    }

    handleTouchCancel() {
        $(`.${this.class}`).on('touchcancel mouseleave', (event) => {
            // event.preventDefault();
        });
    }

    runningSlider() {
        this.sliderInterval = setInterval(() => {
            this.leftOffset = Math.ceil($(`.${this.class}`).find('.coral-item').first().offset().left);
            const stepWidth = this.isMobile() ? this.mobileStepWidth : this.stepWidth;
            $(`.${this.class}`).css('transform', `translate3d(${this.leftOffset - stepWidth}px, 0px, 0px)`);
            $(`.${this.class}`).css('transition', `transform ${this.speed}s`);
            $(`.${this.class}`).css('-webkit-transform', `translate3d(${this.leftOffset - stepWidth}px, 0px, 0px)`);
            $(`.${this.class}`).css('-webkit-transition', `transform ${this.speed}s`);
            this.animation(this.leftOffset - stepWidth, this.speed);
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

    destroyTrackingViewport() {
        if (this.viewportInterval) {
            clearInterval(this.viewportInterval);
        }
    }

    resetSlider() {
        this.destroyRunning();
        this.destroyTrackingViewport();

        // Reset DOM
        $(`.${this.class}`).css('transform', 'none');
        $(`.${this.class}`).css('-webkit-transform', 'none');
        $(`.${this.class}`).find('.coral-item').remove();
        this.sliderElement = this.sliderElement.clone();
        this.sliderElement.appendTo(`.${this.class}`);

        // Reset variables
        this.leftOffset = 0;
        this.sliderElementCount = 1;
    }

    reRunningSlider() {
        this.trackingViewport();
        this.runningSlider();
    }

    isMobile() {
        const windowWidth = $(window).width();
        return windowWidth > 767 ? false : true;
    }
}
