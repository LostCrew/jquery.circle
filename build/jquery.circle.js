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

(function($, window) {
  var Circle;
  Circle = (function() {
    Circle.prototype.defaults = {
      value: 0,
      min: 0,
      max: 0,
      step: 1,
      animate: true
    };

    function Circle(element, options) {
      this.options = $.extend({}, this.defaults, options);
      this.$element = $(element);
      this;
    }

    Circle.prototype.method = function(a, b, c) {
      return console.log(arguments);
    };

    return Circle;

  })();
  return $.fn.extend({
    circle: function(option) {
      return this.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data("circle");
        if (!data) {
          $this.data("circle", data = new Circle(this, option));
        }
        if (data[option]) {
          return data[option].apply(data, Array.prototype.slice.call(arguments, 1));
        }
      });
    }
  });
})(window.jQuery, window);
