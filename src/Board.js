/**
 * @class
 * @extends {cc.Node}
 */
var Board = cc.Node.extend(/** @lends Board# */{
  /**
   * @constructs
   */
  ctor: function () {
    this._super();
    this.setCascadeOpacityEnabled(true);
  },

  onEnter: function () {
    this._super();
  },
  /**
   * @param {Figure} figure
   */
  onFigureClicked: function (figure) {
  },
});

Board.MIN_DISTANCE_BETWEEN_FIGURES = 40;
Board.CLICK_RADIUS = 30;