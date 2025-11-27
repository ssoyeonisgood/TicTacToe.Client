import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
const HUB_URL: string =
  (import.meta.env.VITE_HUB_URL as string) || "http://localhost:5025/game";

type Callback = () => void;
type Handler = (...args: unknown[]) => void;

export async function startConnection(
  onOpen: Callback = () => {},
  onClose: Callback = () => {}
): Promise<signalR.HubConnection> {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL)
    .withAutomaticReconnect()
    .build();

  connection.onclose(() => onClose());
  connection.onreconnected(() => onOpen());

  try {
    await connection.start();
    console.log("Connected");
    onOpen();
  } catch (err) {
    console.error("SignalR connection error:", err);
    throw err;
  }

  return connection;
}

export function getConnection(): signalR.HubConnection | null {
  return connection;
}

export async function invoke<T = unknown>(
  method: string,
  ...args: unknown[]
): Promise<T> {
  if (!connection) throw new Error("Connection not started.");
  return connection.invoke<T>(method, ...args);
}

export function on(method: string, handler: Handler): void {
  if (!connection) throw new Error("Connection not started.");
  connection.on(method, (...args: unknown[]) => {
    try {
      handler(...args);
    } catch (err) {
      console.error(`Error in handler for ${method}:`, err);
    }
  });
}

export function off(method: string, handler?: Handler): void {
  if (!connection) return;
  if (handler) connection.off(method, handler);
  else connection.off(method);
}
