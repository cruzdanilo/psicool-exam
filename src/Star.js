/**
 * @class
 * @extends {cc.Sprite}
 */
var Star = cc.Sprite.extend(/** @lends Star# */{
  /**
   * @constructs
   */
  ctor: function () {
    this._super("#figureStarFill");
    this.outline = new cc.Sprite("#figureStarOutline");
    this.outline.setAnchorPoint(0, 0);
    this.outline.setColor(cc.color(170, 170, 170)); // Cascade to darker color
    this.addChild(this.outline);
    this.setCascadeColorEnabled(true);
    this.setCascadeOpacityEnabled(true);
    this.setRotation(Math.random() * 360);
    this.setScale(0);
    this.runAction(
      new cc.EaseBackOut(cc.scaleTo(Star.DEFAULT_ACTION_DURATION,1)));
    this.runAction(cc.rotateBy(Star.ROTATION_PERIOD, 360).repeatForever());
  },

  /**
   * Play destroy animation and remove itself from the scene.
   *
   * @param {function} [callback] - Function to call after animation
   */
  destroy: function (callback) {
    this.runAction(cc.sequence(
      new cc.EaseBackIn(cc.scaleTo(Star.DEFAULT_ACTION_DURATION, 0)),
      cc.callFunc(callback),
      cc.callFunc(this.removeFromParent, this)));
  }
});

Star.ROTATION_PERIOD = 3;
Star.DEFAULT_ACTION_DURATION = 0.3;
