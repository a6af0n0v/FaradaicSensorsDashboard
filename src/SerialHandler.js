//https://wicg.github.io/serial/#serial-interface
//https://github.com/UnJavaScripter/web-serial-example/blob/master/src/serial-handler.ts
class SerialHandler {
    port = null;
    logger = null;
    encoder = new TextEncoder();
    decoder = new TextDecoder();

    async init() {
    }

    setMsg(params) {
        if (!this.logger)
            return;
        this.logger(params);
    }

    async write(data): Promise<void> {
        const dataArrayBuffer = this.encoder.encode(data);
        if (this.port) {
            const writer = this.port.writable.getWriter();
            await writer.write(dataArrayBuffer);
            writer.releaseLock();
            return;
        }
        else {
            this.setMsg({ text: "Port is not open", visible: true, type: "alert alert-danger" });
            return null;
        }
    }

    async read(timeout) {
        var result = "";
        if (!this.port)
            return "Port Closed";
        if (this.port.readable) {
            const reader = this.port.readable.getReader();
            const timer = setTimeout(() => {
                reader.releaseLock();
                return "timeout";
            }, timeout);
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    result += this.decoder.decode(value);
                    if (value.at(-1) === 10 && value.at(-2) === 10) {
                        console.log("script complete")
                        break;
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                reader.releaseLock();
            }
        }
        return result;
    }

    async requestPort() {
        this.setMsg({ text: "Select your device", visible: true, type: "alert alert-success" });

        try {
            const filter = { usbVendorId: 0x0403 };
            this.port = await navigator.serial.requestPort({ filters: [filter] });
            const info = await this.port.getInfo();
            console.log(info);

        } catch (error) {
            this.setMsg({ text: error.toString(), visible: true, type: "alert alert-warning" });
            console.log(error);
            return false;
        }

        try {
            if (this.port) {
                await this.port.open({ baudRate: 230400 });
                this.setMsg({ text: "Port Open", visible: true, type: "alert alert-success" });
            }
        } catch (error) {
            console.log(error.code);
            if (error.code === 11) //Port is already open
            {
                this.setMsg({ text: "Port was already open", visible: true, type: "alert alert-info" });

                return true;
            }
            this.setMsg({ text: error.toString(), visible: true, type: "alert alert-danger" });
            return false;
        }
        return true;
    }
}

export const serialHandler = new SerialHandler();
