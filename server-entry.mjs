// Keep the application and EasyPanel's reverse proxy on the same known port.
// Runtime variables configured in the panel may otherwise override the
// Dockerfile defaults and make Nitro listen on a different port.
process.env.HOST = "0.0.0.0";
process.env.PORT = "3000";
process.env.NITRO_HOST = "0.0.0.0";
process.env.NITRO_PORT = "3000";

await import("./.output/server/index.mjs");
