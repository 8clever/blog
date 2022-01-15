module.exports = (api) => {
  const target = api.caller((caller) => caller.target);

  api.cache.using(() => JSON.stringify({ target }));

  const presets = [ "next/babel" ];
  const plugins = [];

  plugins.push(
    "babel-plugin-transform-typescript-metadata",
    [
      "@babel/plugin-proposal-decorators", 
      { 
        "legacy": true 
      }
    ]
  )

  if (target === "web") {
    plugins.push(
      [
        'babel-plugin-import',
        {
          libraryName: '@mui/system',
          libraryDirectory: '',
          camel2DashComponentName: false,
        },
        'system',
    ], [
      'babel-plugin-import',
      {
        libraryName: '@mui/material/styles',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'styles',
  ], [
      'babel-plugin-import',
      {
        libraryName: '@mui/material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ], [
      'babel-plugin-import',
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],);
  }

  console.log(plugins)
  return { presets, plugins };
};