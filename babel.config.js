module.exports = {
  presets: [
    // Transpile modern JS (ES2015+ → CommonJS for Jest)
    [
      "@babel/preset-env",
      {
        targets: { node: "current" }
      }
    ],
    // Transpile JSX — runtime: "automatic" means no need to import React in every file
    [
      "@babel/preset-react",
      {
        runtime: "automatic"
      }
    ]
  ]
};
