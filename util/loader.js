const { readdirSync } = require("fs");

const loadEvents = (client, dir = "./events") => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(`events Chargé [🛄]: ${evtName}`);
    };
  });
};

module.exports = {
  loadEvents,
}