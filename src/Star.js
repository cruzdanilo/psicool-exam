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
    this.runAction(new cc.RotateBy(Star.ROTATION_PERIOD, 360).repeatForever());
  },
});

Star.ROTATION_PERIOD = 3;
