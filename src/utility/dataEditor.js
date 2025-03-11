import fs from 'fs';
import path from 'path';

const defaultData = {
    GUILDS: {
        "guildId": {
            set: {
                welcome: {
                    channel: "channelId"
                }
            }
        }
    }
};

export default class DataEditor {
    constructor(filename) {
        this.filePath = path.join(__dirname, './src/data', filename);
        this.data = this.load();
    }

    load() {
        try {
            return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
        } catch {
            return defaultData;
        }
    }

    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 4));
    }

    // Get guild configuration data
    getGuildConfig(guildId) {
        return this.data.GUILDS[guildId];
    }

    // Set guild welcome channel
    setGuildWelcomeChannel(guildId, channelId) {
        if (!this.data.GUILDS[guildId]) {
            this.data.GUILDS[guildId] = { set: { welcome: { channel: "" } } };
        }
        this.data.GUILDS[guildId].set.welcome.channel = channelId;
        this.save();
    }
}
