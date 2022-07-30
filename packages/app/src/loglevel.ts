declare global {
  export let log: any;
}

let internalLog = {
  info(...args: any) {
    return args;
  },
};
// Setup loglevel
try {
  if (process.env.NODE_ENV === "production") {
    log.setLevel(log.levels.INFO);
    internalLog = log;
  } else if (process.env.NODE_ENV === "development") {
    log.setLevel(log.levels.DEBUG);
    internalLog = log;
  }
} catch (ingored) {}
// export default log;

export function $info(...message: any[]) {
  internalLog.info(...message);
}
