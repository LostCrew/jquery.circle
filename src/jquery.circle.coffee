(($, window) ->
  class Circle
    defaults:
      value: 0
      min: 0
      max: 100
      step: 1
      width: 10
      text: true
      animate: true

    constructor: (element, options) ->
      @options = $.extend {}, @defaults, options
      @$element = $ element
      @$value = $ "<div>", class: "value",
      @$slice = $ "<div>", class: "slice"
      @$first = $ "<div>", class: "first"
      @$second = $ "<div>", class: "second"

      # add main classes
      @$element.addClass "circle"
      @$element.addClass "fifty" if @_isMoreHalf()

      # set element content as value
      if not @$element.is ":empty"
        @options.value = @$element.text()
        @$element.empty()

      # set width and border
      @$first.add(@$second).css @_getSize()

      # add text
      @$value.text @options.value if @options.text

      # inject elements to dom
      @$element.append @$value, @$slice.append @$first, @$second

      # set rotate
      @$first.css @_getTransform()
      @$element

    value: (value) ->
      return @options.value unless value?

      # TODO: validation
      @options.value = value
      degrees = @_getDegrees value

      @$element[if @_isMoreHalf() then "addClass" else "removeClass"]("fifty")
      @$first.css @_getTransform()
      @$value.text value if @options.text
      @$element

    destroy: ->
      @$value.remove()
      @$slice.remove()
      @$element.removeClass "circle fifty"

    _getTransform: ->
      degrees = @_getDegrees @options.value

      "-webkit-transform": "rotate(#{degrees}deg)"
      "-ms-transform": "rotate(#{degrees}deg)"
      transform: "rotate(#{degrees}deg)"

    _getSize: ->
      "border-width": "#{@options.width / 100}em"

    _getDegrees: (value) ->
      360 / 100 * value

    _isMoreHalf: ->
      @options.value > @options.max / 2

  $.fn.extend circle: (option, args...) ->
    @each ->
      $this = $(@)
      data = $this.data "circle"

      $this.data "circle", data = new Circle @, option if not data
      data[option].apply data, args if data[option]

)(window.jQuery, window)