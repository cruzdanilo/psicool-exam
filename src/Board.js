/**
 * @class
 * @extends {cc.DrawNode}
 */
var Board = cc.DrawNode.extend(/** @lends Board# */{
  /**
   * @constructs
   * @param {cc.Rect} rect
   * @param {cc.Color} color
   * @param {number} figureCount
   * @param {cc.Node} Figure
   */
  ctor: function (rect, color, figureCount, Figure) {
    this._super();
    Object.assign(this, rect);
    this.setColor(color);
    this.setCascadeOpacityEnabled(true);
    this.drawRect(cc.p(0, 0), cc.p(this.width, this.height),
                  cc.color(0, 0, 0, 0), 2, this.color);
    for (let p of this.samplePoints(figureCount)) {
      let figure = new Figure();
      figure.setPosition(p);
      figure.setColor(Board.FIGURE_COLORS[
        Math.floor(Math.random() * Board.FIGURE_COLORS.length)]);
      this.addChild(figure);
    }
  },

  /**
   * Generate samples using Robert Bridson's Poisson disc sampling algorithm:
   * http://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
   *
   * @param {number} number Number of samples
   * @return {cc.Point[]} Array containing samples
   */
  samplePoints: function (number) {
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
        set, grid, active;
    do {
      grid = new Array(gridWidth * gridHeight);
      active = [];
      set = [cc.pAdd(sample(Math.random() * width, Math.random() * height),
                     offset)];
      let aux;
      while (set.length < number && (aux = next()))
        set.push(cc.pAdd(aux, offset));
    } while (set.length < number); // Try again with new random first sample
    return set;

    function next () {
      while (active.length) {
        let i = Math.floor(Math.random() * active.length),
            s = active[i]; // Pick a random active sample.
        for (let j = 0; j < 50; ++j) { // Try k candidates before deactivation
          // Make a new random candidate between [radius, 2 * radius]
          // from the chosen sample.
          let r = Math.sqrt(Math.random() * rScale + sqrRadius),
              t = 2 * Math.PI * Math.random(),
              x = s.x + r * Math.cos(t),
              y = s.y + r * Math.sin(t);
          // Reject candidates that are outside the allowed extent,
          // or closer than 2 * radius to any existing sample.
          if (0 <= x && x < width && 0 <= y && y < height && far(x, y))
            return sample(x, y); // Remove sample from the active queue.
        }
         // Remove sample from the active queue.
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

    function sample (x, y) {
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
  },
});

Board.MIN_DISTANCE_BETWEEN_FIGURES = 48; // Harder to get, but looks better
Board.CLICK_RADIUS = 30;
Board.FIGURE_COLORS = [cc.color(255, 255, 0),
                       cc.color(0, 255, 0),
                       cc.color(0, 0, 255),
                       cc.color(255, 0, 255)];
