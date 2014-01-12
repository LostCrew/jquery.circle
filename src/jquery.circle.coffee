(($, window) ->
  class Circle
    defaults:
      value: 0
      min: 0
      max: 0
      step: 1
      animate: true

    constructor: (element, options) ->
      @options = $.extend {}, @defaults, options
      @$element = $ element
      @

    method: (a, b, c) -> console.log arguments

  $.fn.extend circle: (option) ->
    @each ->
      $this = $(@)
      data = $this.data "circle"

      $this.data "circle", data = new Circle @, option if not data
      data[option].apply data, Array::slice.call arguments, 1 if data[option]

)(window.jQuery, window)