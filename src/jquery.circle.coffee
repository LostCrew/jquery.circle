(($, window) ->
  "use strict"

  class Circle
    defaults:
      value: 0
      min: 0
      max: 100
      step: 1
      width: 10
      text: true
      animate: 1000
      duration: false

    constructor: (element, options = {}) ->
      @$element = $ element
      @options = $.extend {}, @defaults, options,
        value: @$element.data "value"
        min: @$element.data "min"
        max: @$element.data "max"
        step: @$element.data "step"
        width: @$element.data "width"
        text: @$element.data "text"
        animate: @$element.data "animate"
        duration: @$element.data "duration"
      @$value = $ "<div>", class: "circle-value",
      @$slice = $ "<div>", class: "circle-slice"
      @$first = $ "<div>", class: "circle-first"
      @$second = $ "<div>", class: "circle-second"

      # store element content
      unless @$element.is ":empty"
        @$element.data "original-text", @$element.html()
        @$element.empty()

      # add main classes
      @$element.addClass "circle"
      @$element.addClass "circle-half" if @_isMoreHalf()

      # add animate
      if @options.animate
        @$slice.add(@$first).add(@$second).css
          "-webkit-transition": "all #{@options.animate}ms"
          "-moz-transition": "all #{@options.animate}ms"
          "-o-transition": "all #{@options.animate}ms"
          "transition": "all #{@options.animate}ms"

      # set width and border
      @$first.add(@$second).css @_getSize()

      # add text
      @$value.text @options.value if @options.text

      # inject elements to dom
      @$element.append @$value, @$slice.append @$first, @$second

      # set rotate
      @$first.css @_getTransform @_getFirstDegrees @options.value

      # autoplay
      @_duration()
      @$element

    value: (value) ->
      return @options.value if typeof value is "undefined"
      return @options.value unless value?

      @options.value = value
      @$element[if @_isMoreHalf() then "addClass" else "removeClass"] "circle-half"
      @$first.css @_getTransform @_getFirstDegrees value
      @$value.text value if @options.text
      @$element

    width: (value) ->
      return @options.width if typeof value is "undefined"
      return @options.width unless value?

      @options.width = width
      @$first.add(@$second).css @_getSize()
      @$element

    destroy: ->
      @$value.remove()
      @$slice.remove()
      @$element.removeClass "circle circle-half"

    _duration: ->
      return unless @options.duration

      @_timer = window.setInterval( =>
        value = @options.value + @options.step

        if value > @options.min and value < @options.max then @value value else window.clearInterval @_timer
      , parseInt(@options.animate, 10) or @defaults.animate)

    _getTransform: (degrees) ->
      "-webkit-transform": "rotate(#{degrees}deg)"
      "-ms-transform": "rotate(#{degrees}deg)"
      transform: "rotate(#{degrees}deg)"

    _getSize: ->
      "border-width": "#{@options.width / 100}em"

    _getFirstDegrees: (value) ->
      360 / @options.max * value

    _isMoreHalf: ->
      @options.value > @options.max / 2

  $.fn.extend circle: (option, args...) ->
    ret = @
    @each ->
      $this = $(@)
      data = $this.data "circle"

      $this.data "circle", data = new Circle @, option if not data
      data[option].apply data, args if data[option]
    ret

) window.jQuery, window
