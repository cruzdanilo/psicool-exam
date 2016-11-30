/**
 * @class
 * @extends cc.Layer
 */
var BackgroundLayer = cc.Layer.extend(/** @lends BackgroundLayer# */{
  _className: "BackgroundLayer",

  /**
   * @constructs
   */
  ctor: function () {
    this._super();

    this.bgRepeat = new cc.Sprite(res.bgRepeat);
    this.bgRepeat.setNormalizedPosition(.5, .5);
    this.bgRepeat.texture.setTexParameters(cc.LINEAR, cc.LINEAR, cc.REPEAT, cc.REPEAT);
    this.bgRepeat.setTextureRect(cc.rect(0, 0, cc.view.getVisibleSize().width, cc.view.getVisibleSize().height));
    this.addChild(this.bgRepeat);

    this.bgShadow9 = new ccui.Scale9Sprite("bgShadow9", cc.rect(60, 60, 1, 1));
    this.bgShadow9.setContentSize(cc.view.getVisibleSize());
    this.bgShadow9.setNormalizedPosition(.5, .5);
    this.addChild(this.bgShadow9);
  },
});