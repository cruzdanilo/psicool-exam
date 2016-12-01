/**
 * @class
 * @extends {cc.Layer}
 */
var GameLayer = cc.Layer.extend(/** @lends GameLayer# */{
  _className: "GameLayer",

  score: 0,

  /**
   * @constructs
   * @param {psicool.Scene} scene
   * @param {number} startingLevel
   */
  ctor: function (scene, startingLevel) {
    this._super();
    this.scene = scene;
    // By default, nodes in Cocos2D don't cascade opacity, which is needed to
    // fade in and fade out compound objects like layers.
    // Please ensure all your nodes with children have opacity cascade enabled,
    // or otherwise they will not be animated when the score screen is shown.
    this.setCascadeOpacityEnabled(true);
    window.gameLayer = this;

    // Psicool includes a handy clock object for timed games.
    this.clock = new psicool.Clock(this.scene, 45);
    // This function will be run when the time ends
    this.clock.setTimeUpListener(this.onTimeUp.bind(this));

    // Here is just usual game code... Board is a custom node with the game
    // figures, for instance.
    this.board = new Board();
    this.addChild(this.board);


    // PSICOOL GAME DEVELOPER EXAM
    //
    // You have to create 15 stars in random positions within the `board` object.
    // The board must be in the center of the screen and measure 300x200 design
    // pixels.
    //
    // The stars must not overflow from the board. You must show somehow the
    // bounds of the board to make this more visually obvious.
    //
    // The stars must rotate endlessly, all at the same speed, but each starting
    // with different, random angle.
    //
    // Each star must posses a random fill color among a set of four colors you
    // choose.
    //
    // Each star must have a outline of a slightly darker color than its fill
    // color.
    //
    // When a star is clicked, onStarClicked() on this same file must be
    // executed (see below).
    //
    // In the background the track `Fretless.m4a` must be played in loop.


    // This ensures sprites and labels are not blurry in desktop screens (see
    // the SDK documentation for more details)
    moveToNearestIntegerPixels(this.getChildren());
  },

  onStarClicked: function (star) {
    // Make the star a bit bigger and then smaller until it disappears.
    //
    // After the star has disappeared a new one must emerge with an animation
    // in a random position, without overlapping any other stars nor the
    // position of the star that just disappeared.
    //
    // Time must start running if not running yet when this function is called.
    //
    // `sfxCorrect.m4a` must be played.
  },

  onTimeUp: function () {
    // This method sends the score to the server when running in production and
    // shows the score screen.
    this.scene.finishGame({
      score: this.score,
      newStartingLevel: 1,
      additionalScoreRows: []
    })
  },
});