/**
 * @class
 * @extends {cc.DrawNode}
 */
var Board = cc.DrawNode.extend(/** @lends Board# */{
  /**
   * @constructs
   * @param {cc.Rect} rect - Board bounding box
   * @param {cc.Color} color - Board color
   * @param {number} figureCount - Number of figures
   * @param {function} FigureClass - Figure class
   * @param {function} [onFigureClicked] - Figure clicked callback
   */
  ctor: function (rect, color, figureCount, FigureClass, onFigureClicked) {
    this._super();
    Object.assign(this, rect);
    this.setColor(color);
    this.figureCount = figureCount;
    this.FigureClass = FigureClass;
    this.onFigureClickedCallback = onFigureClicked;
    this.setLineWidth(2);
    this.setCascadeOpacityEnabled(true);
    this.drawRect(cc.p(0, 0), cc.p(this.width, this.height)); // Draw border
    this.container = new cc.SpriteBatchNode(res.atlasTexture); // Batch rendering
    this.container.setCascadeOpacityEnabled(true);
    this.addChild(this.container);
    this.fill();
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: (touch, event) => {
        let pos = this.convertTouchToNodeSpace(touch);
        if (!cc.rectContainsPoint(cc.rect(0, 0, this.width, this.height), pos))
          return false;
        let sqrRadius = Board.CLICK_RADIUS * Board.CLICK_RADIUS;
        for (let figure of this.container.getChildren())
          if (cc.pDistanceSQ(pos, figure.getPosition()) < sqrRadius)
            return this.onFigureClicked(figure) || true;
      }
    }, this);
  },

  /**
   * Fill board with figures. Always fill with figure count to prevent locking.
   */
  fill: function() {
    let current = [];
    for (let figure of this.container.getChildren())
      current.push(figure.getPosition());
    for (let p of this.samplePoints(this.figureCount, current)) {
      let figure = new this.FigureClass();
      figure.setPosition(p);
      figure.setColor(Board.FIGURE_COLORS[
        Math.floor(Math.random() * Board.FIGURE_COLORS.length)]);
      this.container.addChild(figure);
    }
  },

  /**
   * Fix DrawNode constant color and opacity.
   * @override
   */
  _createRenderCmd: function () {
    let renderCmd = cc.DrawNode.prototype._createRenderCmd.call(this);
    renderCmd._updateColor = function () {
      let color = this.getDisplayedColor();
      color.a *= this.getDisplayedOpacity() / 255;
      for (let e of this._node._buffer) // Set color of each vertex
        e.a.colors = e.b.colors = e.c.colors = color;
      this._node._drawColor = color;
      this._node._dirty = true;
      for (let child of this._node.getChildren()) {
        if (this._node._cascadeColorEnabled)
          child._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.colorDirty);
        if (this._node._cascadeOpacityEnabled)
          child._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.opacityDirty);
      }
    };
    return renderCmd;
  },

  /**
   * Generate samples using Robert Bridson's Poisson disc sampling algorithm:
   * http://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
   *
   * @param {number} number - Number of samples
   * @param {cc.Point[]} initial - Initial set of samples
   * @return {cc.Point[]} Array containing samples
   */
  samplePoints: function (total, initial) {
    let offset = cc.p(Math.floor(Board.MIN_DISTANCE_BETWEEN_FIGURES / 2),
                      Math.floor(Board.MIN_DISTANCE_BETWEEN_FIGURES / 2)),
        width = this.width - Board.MIN_DISTANCE_BETWEEN_FIGURES,
        height = this.height - Board.MIN_DISTANCE_BETWEEN_FIGURES,
        radius = Board.MIN_DISTANCE_BETWEEN_FIGURES,
        sqrRadius = radius * radius,
        rScale = 3 * sqrRadius,
        cellSize = radius * Math.SQRT1_2,
        gridWidth = Math.ceil(width / cellSize),
        gridHeight = Math.ceil(height / cellSize),
        number = total - initial.length,
        set, grid, active;
    do {
      grid = new Array(gridWidth * gridHeight);
      active = [];
      set = initial.length > 0 ? [] : [cc.pAdd(insert(Math.random() * width,
                                                      Math.random() * height),
                                               offset)]; // First is random
      for (let p of initial)
        insert(p.x - offset.x, p.y - offset.y); // Fill active list
      let aux;
      while (set.length < number && (aux = next())) // Options can be exhausted
        set.push(cc.pAdd(aux, offset));
    } while (set.length < number); // Try again if total was not achieved
    return set;

    function next () {
      while (active.length) {
        let i = Math.floor(Math.random() * active.length),
            s = active[i], // Pick a random active sample
            k = 50; // Maximum number of candidates per sample
        do {
          // Make a new random candidate between [radius, 2 * radius]
          // from the chosen sample
          let r = Math.sqrt(Math.random() * rScale + sqrRadius),
              t = 2 * Math.PI * Math.random(),
              x = s.x + r * Math.cos(t),
              y = s.y + r * Math.sin(t);
          // Reject candidates that are outside the allowed extent,
          // or closer than radius to any existing sample
          if (0 <= x && x < width && 0 <= y && y < height && far(x, y))
            return insert(x, y);
        } while (--k); // Try k candidates before deactivation
        s = active.pop();
        if (i < active.length)
          active[i] = s;
      }
    }

    function far (x, y) {
      let i = Math.floor(x / cellSize),
          j = Math.floor(y / cellSize),
          i0 = Math.max(i - 2, 0),
          j0 = Math.max(j - 2, 0),
          i1 = Math.min(i + 3, gridWidth),
          j1 = Math.min(j + 3, gridHeight);
      for (j = j0; j < j1; ++j) {
        let o = j * gridWidth;
        for (i = i0; i < i1; ++i) {
          let s = grid[o + i];
          if (!s)
            continue;
          let dx = s.x - x,
              dy = s.y - y;
          if (dx * dx + dy * dy < sqrRadius)
            return false;
        }
      }
      return true;
    }

    function insert (x, y) {
      let s = cc.p(x, y);
      active.push(s);
      grid[Math.floor(y / cellSize) * gridWidth +
           Math.floor(x / cellSize)] = s;
      return s;
    }
  },

  onEnter: function () {
    this._super();
  },

  /**
   * @param {Figure} figure
   */
  onFigureClicked: function (figure) {
    figure.retain();
    figure.removeFromParent(false); // Prevent multiple clicks
    figure.setPosition(this.convertToWorldSpace(figure.getPosition()));
    this.getParent().addChild(figure);
    figure.release();
    if (this.onFigureClickedCallback)
      this.onFigureClickedCallback(figure);
  },
});

Board.MIN_DISTANCE_BETWEEN_FIGURES = 48; // Harder to get, but looks better
Board.CLICK_RADIUS = 30;
Board.FIGURE_COLORS = [cc.color(255, 255, 0),
                       cc.color(0, 255, 0),
                       cc.color(0, 0, 255),
                       cc.color(255, 0, 255)];
