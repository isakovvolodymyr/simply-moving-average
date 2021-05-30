import * as WebSocket from 'ws';

export abstract class BaseWebSocketServer {
    protected readonly webSocket: WebSocket;

    protected constructor(private readonly url, private readonly message) {
        this.webSocket = new WebSocket(url);
        this.onMessage();
        this.onOpen(message);
        this.onClose();
    }
    
    protected abstract handleMessage(message: any): Promise<void>;

    protected onMessage(): void {
        this.webSocket.on('message', async (message) => {
            await this.handleMessage(message);
        })
    }

    protected onOpen(message: string): void {
        this.webSocket.on('open', () => this.sendMessage(message));
    }
    
    protected sendMessage(message: string): void {
        this.webSocket.send(message);
    }
    
    protected onClose(): void {
        this.webSocket.on('close', () => console.log('Connection close'));
    }
}
