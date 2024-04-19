const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (channel, ...args) => {
      console.log(`Invoking channel: ${channel} with args:`, args);
      return ipcRenderer.invoke(channel, ...args).then(result => {
        console.log(`Channel ${channel} invoked successfully.`);
        return result;
      }).catch(error => {
        console.error(`Error invoking channel: ${channel}`, error);
        throw error;
      });
    },
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => {
        console.log(`Received message on channel: ${channel} with args:`, args);
        func(event, ...args);
      });
    },
    removeAllListeners: (channel) => {
      ipcRenderer.removeAllListeners(channel);
      console.log(`Removed all listeners from channel: ${channel}`);
    }
  },
});