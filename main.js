psicool.runGame({
  // This is the name of your game.
  // This name must be the same that appears in your psicool.json manifest.
  gameId: "psicool-exam",
  sceneClass: GameScene,
  preload: {
    files: g_resources,
    fonts: {
      // This is how you add custom fonts: You need to declare them in a CSS file
      // and include them here.
      fontFamilies: ["Delius Unicase", "Delius Unicase Bold"],
      cssPaths: ["css/fonts.css"],
    }
  }
});