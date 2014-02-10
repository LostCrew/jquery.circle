/* ========================================================================
 * jquery-circle - v0.0.1
 * 
 * ========================================================================
 * Copyright 2012-2013 
 *
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

(function() {
  var __slice = [].slice;

  (function($, window) {
    "use strict";
    var Circle;
    Circle = (function() {
      Circle.prototype.defaults = {
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        width: 10,
        text: true,
        animate: 1000,
        duration: false
      };

      function Circle(element, options) {
        if (options == null) {
          options = {};
        }
        this.$element = $(element);
        this.options = $.extend({}, this.defaults, options, {
          value: this.$element.data("value"),
          min: this.$element.data("min"),
          max: this.$element.data("max"),
          step: this.$element.data("step"),
          width: this.$element.data("width"),
          text: this.$element.data("text"),
          animate: this.$element.data("animate"),
          duration: this.$element.data("duration")
        });
        this.$value = $("<div>", {
          "class": "circle-value"
        }, this.$slice = $("<div>", {
          "class": "circle-slice"
        }));
        this.$first = $("<div>", {
          "class": "circle-first"
        });
        this.$second = $("<div>", {
          "class": "circle-second"
        });
        if (!this.$element.is(":empty")) {
          this.$element.data("original-text", this.$element.html());
          this.$element.empty();
        }
        this.$element.addClass("circle");
        if (this._isMoreHalf()) {
          this.$element.addClass("circle-half");
        }
        if (this.options.animate) {
          this.$slice.add(this.$first).add(this.$second).css({
            "-webkit-transition": "all " + this.options.animate + "ms",
            "-moz-transition": "all " + this.options.animate + "ms",
            "-o-transition": "all " + this.options.animate + "ms",
            "transition": "all " + this.options.animate + "ms"
          });
        }
        this.$first.add(this.$second).css(this._getSize());
        if (this.options.text) {
          this.$value.text(this.options.value);
        }
        this.$element.append(this.$value, this.$slice.append(this.$first, this.$second));
        this.$first.css(this._getTransform(this._getFirstDegrees(this.options.value)));
        this._duration();
        this.$element;
      }

      Circle.prototype.value = function(value) {
        if (typeof value === "undefined") {
          return this.options.state;
        }
        if (value == null) {
          return this.options.value;
        }
        this.options.value = value;
        this.$element[this._isMoreHalf() ? "addClass" : "removeClass"]("circle-half");
        this.$first.css(this._getTransform(this._getFirstDegrees(value)));
        if (this.options.text) {
          this.$value.text(value);
        }
        return this.$element;
      };

      Circle.prototype.destroy = function() {
        this.$value.remove();
        this.$slice.remove();
        return this.$element.removeClass("circle circle-half");
      };

      Circle.prototype._duration = function() {
        var _this = this;
        if (!this.options.duration) {
          return;
        }
        return this._timer = window.setInterval(function() {
          var value;
          value = _this.options.value + _this.options.step;
          if (value > _this.options.min && value < _this.options.max) {
            return _this.value(value);
          } else {
            return window.clearInterval(_this._timer);
          }
        }, parseInt(this.options.animate, 10) || this.defaults.animate);
      };

      Circle.prototype._getTransform = function(degrees) {
        return {
          "-webkit-transform": "rotate(" + degrees + "deg)",
          "-ms-transform": "rotate(" + degrees + "deg)",
          transform: "rotate(" + degrees + "deg)"
        };
      };

      Circle.prototype._getSize = function() {
        return {
          "border-width": "" + (this.options.width / 100) + "em"
        };
      };

      Circle.prototype._getFirstDegrees = function(value) {
        return 360 / this.options.max * value;
      };

      Circle.prototype._isMoreHalf = function() {
        return this.options.value > this.options.max / 2;
      };

      return Circle;

    })();
    return $.fn.extend({
      circle: function() {
        var args, option, ret;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        ret = this;
        this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data("circle");
          if (!data) {
            $this.data("circle", data = new Circle(this, option));
          }
          if (data[option]) {
            return data[option].apply(data, args);
          }
        });
        return ret;
      }
    });
  })(window.jQuery, window);

}).call(this);
