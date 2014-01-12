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
    var Circle;
    Circle = (function() {
      Circle.prototype.defaults = {
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        width: 10,
        text: true,
        animate: true
      };

      function Circle(element, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$element = $(element);
        this.$value = $("<div>", {
          "class": "value"
        }, this.$slice = $("<div>", {
          "class": "slice"
        }));
        this.$first = $("<div>", {
          "class": "first"
        });
        this.$second = $("<div>", {
          "class": "second"
        });
        this.$element.addClass("circle");
        if (this._isMoreHalf()) {
          this.$element.addClass("fifty");
        }
        if (!this.$element.is(":empty")) {
          this.options.value = this.$element.text();
          this.$element.empty();
        }
        this.$first.add(this.$second).css(this._getSize());
        if (this.options.text) {
          this.$value.text(this.options.value);
        }
        this.$element.append(this.$value, this.$slice.append(this.$first, this.$second));
        this.$first.css(this._getTransform());
        this.$element;
      }

      Circle.prototype.value = function(value) {
        var degrees;
        if (value == null) {
          return this.options.value;
        }
        this.options.value = value;
        degrees = this._getDegrees(value);
        this.$element[this._isMoreHalf() ? "addClass" : "removeClass"]("fifty");
        this.$first.css(this._getTransform());
        if (this.options.text) {
          this.$value.text(value);
        }
        return this.$element;
      };

      Circle.prototype.destroy = function() {
        this.$value.remove();
        this.$slice.remove();
        return this.$element.removeClass("circle fifty");
      };

      Circle.prototype._getTransform = function() {
        var degrees;
        degrees = this._getDegrees(this.options.value);
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

      Circle.prototype._getDegrees = function(value) {
        return 360 / 100 * value;
      };

      Circle.prototype._isMoreHalf = function() {
        return this.options.value > this.options.max / 2;
      };

      return Circle;

    })();
    return $.fn.extend({
      circle: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this.each(function() {
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
      }
    });
  })(window.jQuery, window);

}).call(this);
