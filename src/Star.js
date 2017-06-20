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
    this.runAction(cc.rotateBy(Star.ROTATION_PERIOD, 360).repeatForever());
  },

  /**
   * Play destroy action and remove itself from the scene.
   *
   * @param {function} callback - Function to call after action
   */
  destroy: function(callback) {
    this.runAction(cc.sequence(cc.scaleTo(0.3, 0).easing(cc.easeBackIn()),
                               cc.callFunc(this.removeFromParent, this, true),
                               cc.callFunc(callback)));
  }
});

Star.ROTATION_PERIOD = 3;
