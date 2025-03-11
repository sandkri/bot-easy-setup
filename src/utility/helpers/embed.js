import { EmbedBuilder } from "discord.js";

class ReaxionBuilder extends EmbedBuilder {
  constructor({ title, description, color, footer } = {}) {
    super();
    this.setTitle(title || "Reaxion");
    if (description) this.setDescription(description);
    if (color) this.setColor(color);
    this.setFooter({ text: footer || "Reaxion" });
  }

  addField(name, value, inline = false) {
    this.addFields({ name, value, inline });
    return this;
  }

  setPreset(type, content) {
    const presets = {
      error: { title: "Error", color: 0xff0000 },
      success: { title: "Success", color: 0x00ff00 },
      info: { title: "Info", color: 0x0099ff },
    };

    if (presets[type]) {
      this.setTitle(`${presets[type].title} | ${content}`);
      this.setColor(presets[type].color);
    }
    return this;
  }
}

export function reaxionEmbed(options) {
  return new ReaxionBuilder(options);
}
