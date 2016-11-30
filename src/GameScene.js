/**
 * @class
 * @extends psicool.Scene
 * @property {GameLayer} layerGame
 * @property {BackgroundLayer} layerBackground
 */
var GameScene = psicool.Scene.extend(/** @lends GameScene# */{
  _className: "GameScene",

  /**
   * This method is called when the game is opened, but it's not run again
   * after it has been restarted.
   *
   * Use it to run actions that are longer than a single match, like playing
   * background music (avoiding it being rewound after the player clicks
   * "Play again" in the score screen.
   */
  onFirstMatchStart: function () {
    this._super();

    // Start playing music (automatically respects mute state)
    cc.audioEngine.playMusic(res.bgm, true);

    // Load atlas textures
    cc.spriteFrameCache.addSpriteFrames(res.atlasPlist, res.atlasTexture);
  },

  /**
   * This function is run when the scene is created and the game is ready to start.
   */
  onGameStart: function () {
    this._super();
    window.scene = this; // make available for debugging in the console

    this.setLayerBackground(new BackgroundLayer());
    this.setLayerGame(new GameLayer(this, this.match.startingLevel));

    // Games may enable some indicators.
    // Not all of them are required for all games, and some even may have none.
    // The "lives" indicators comes by default and needs no configuration.

    this.layerHUD.enableScoreIndicator(function () {
      return this.layerGame.score;
    }.bind(this));

    this.layerHUD.enableTimeRemainingIndicator(function () {
      return this.layerGame.clock.getRemainingTimeInteger();
    }.bind(this));
  },
  
  startTutorial: function () {
    // Reset game layer
    this.setLayerGame(new GameLayer(this, 1));
  },

  pause: function () {
    this._super();
    if (this.layerGame && this.layerGame.clock) {
      this.layerGame.clock.pause();
    }
  },

  resume: function () {
    this._super();
    if (this.layerGame && this.layerGame.clock) {
      this.layerGame.clock.resume();
    }
  }
});