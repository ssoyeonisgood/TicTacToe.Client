import * as signalR from "@microsoft/signalr";

let connection = null;
const HUB_URL = import.meta.env.VITE_HUB_URL || "http://localhost:5025/game";

export async function startConnection(onOpen = () => {}, onClose = () => {}) {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL)
    .withAutomaticReconnect()
    .build();

  connection.onclose(() => onClose());
  connection.onreconnected(() => onOpen());

  // Generic handler registrars will be set by caller via connection.on(...)
  await connection
    .start()
    .then(() => console.log("Connected"))
    .catch((err) => console.error(err));
  onOpen();
  return connection;
}

export function getConnection() {
  return connection;
}

export async function invoke(method, ...args) {
  if (!connection) throw new Error("Connection not started.");
  return connection.invoke(method, ...args);
}

export function on(method, handler) {
  if (!connection) throw new Error("Connection not started.");
  connection.on(method, handler);
}

export function off(method, handler) {
  if (!connection) return;
  connection.off(method, handler);
}
