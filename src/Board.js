/**
 * @class
 * @extends {cc.DrawNode}
 */
var Board = cc.DrawNode.extend(/** @lends Board# */{
  /**
   * @constructs
   * @param {cc.Rect} rect
   * @param {cc.Color} color
   */
  ctor: function (rect, color) {
    this._super();
    Object.assign(this, rect);
    this.setColor(color);
    this.setCascadeOpacityEnabled(true);
    this.drawRect(cc.p(0, 0), cc.p(this.width, this.height),
                  cc.color(0, 0, 0, 0), 2, this.color);
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
