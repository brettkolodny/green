export { start } from "$fresh/server.ts";

export const getManifest = async () => {
  const config = await import(`${Deno.cwd()}/deno.json`, {
    assert: { type: "json" },
  });

  const routes = [];
  const islands = [];

  try {
    for await (const entry of Deno.readDir(`${Deno.cwd()}/src/routes`)) {
      if (entry.isFile) {
        routes.push(entry);
      }
    }
  } catch (error) {
    console.error(error);
    console.log("No routes found");
  }

  try {
    for await (const entry of Deno.readDir(`${Deno.cwd()}/src/islands`)) {
      islands.push(entry);
    }
  } catch {
    console.log("No Islands found");
  }

  const routesConfig = {};

  for (const route of routes) {
    const [name] = route.name.split(".");
    const fileName = `${name}.mjs`;
    const jsFile = await import(`./routes/${fileName}`);

    routesConfig[`./routes/${name}.mjs`] = { default: jsFile.default$() };
  }

  const islandsConfig = {};

  for (const route of islands) {
    const [name] = route.name.split(".");
    const fileName = `${name}.mjs`;
    const jsFile = await import(`./islands/${fileName}`);

    islandsConfig[`./islands/${name}.mjs`] = { default: jsFile.default$() };
  }

  return {
    routes: routesConfig,
    islands: islandsConfig,
    baseUrl: import.meta.url,
    config: config.default,
  };
};
