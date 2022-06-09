// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|

// did you see casperMusic? chack out: https://discord.gg/ws9jA2cR5s

/**
   ⚠️ stop right there ⚠️
   did you know you are stealing my project when you remove the copyright?
   you can just contact me http://discord.com/users/933856726770413578 for publish it
   or if you are using it for your server know the no one will see the copyrights only you in the project
   so why you are removing it?, be nice and just leave it
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
 */

require("dotenv").config();

const TEMPCHANNELSVOICECHANNELID = process["env"]["TEMPCHANNELSVOICECHANNELID"];
const TEMPCHANNELSCATEGORY = process["env"]["TEMPCHANNELSCATEGORY"];
const noBANNER = process["env"]["NOBANNERIMGURL"];
const noSERVERicon = process["env"]["NOSERVERIMGURL"];

const { Modal, TextInputComponent, showModal } = require("discord-modals");
const {
  Client,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  Permissions,
} = require("discord.js");
const base = require("quick.db").QuickDB;
const db = new base();

const client = new Client({
  intents: 32767,
  allowedMentions: { repliedUser: false },
});

const discordModals = require("discord-modals");
discordModals(client);

client["login"](process["env"]["TOKEN"]);

client["on"]("ready", function () {
  console.log("the bot is ready, made by def.");
})
  ["on"]("messageCreate", async function (message) {
    if (message["content"] == "setup")
      do {
        message.channel
          .send("مرحباَ, جاري ضبط بعض الأعدادات لتشغيل وظائف البوت.")
          .then((ي) => {
            setTimeout(() => {
              ي.edit(
                "تم تشغيل وظائف البوت ، تأكد من أعدادات البوت الخاصه في المشروع قبل استعمال البوت"
              );
              message.channel.permissionOverwrites.set([
                {
                  id: message.guild.roles.everyone.id,
                  deny: [
                    Permissions.FLAGS.SEND_MESSAGES,
                    Permissions.FLAGS.ADD_REACTIONS,
                  ],
                },
              ]);
              if (!message["member"]["permissions"]["has"]("ADMINISTRATOR"))
                return message["reply"]({
                  content:
                    "you don't have the right to call your self `ADMINISTRATOR`",
                });
              message["channel"]["send"]({
                embeds: [
                  {
                    color: 0x7289da,
                    author: {
                      iconURL:
                        message["guild"]["iconURL"]({ dynamic: true }) ||
                        noSERVERicon,
                      name: "Temporary Settings | اعدادات الرومات المؤقتة",
                    },
                    description:
                      "قم/ي بالضغط على الأزرار ادنا للتحم بالروم الصوتي المؤقت الخاص بك/ي",
                    image: {
                      url:
                        message["guild"]["bannerURL"]({ size: 2048 }) ||
                        noBANNER,
                    },
                  },
                ],
                components: [
                  new MessageActionRow().setComponents(
                    new MessageButton()
                      .setCustomId("public")
                      .setLabel("🔓 public")
                      .setStyle("SECONDARY"),
                    new MessageButton()
                      .setCustomId("privite")
                      .setLabel("🔓 privite")
                      .setStyle("SECONDARY"),
                    new MessageButton()
                      .setCustomId("mute")
                      .setLabel("🤐 mute all")
                      .setStyle("SECONDARY"),
                    new MessageButton()
                      .setCustomId("unmute")
                      .setLabel("😐 unmute all")
                      .setStyle("SECONDARY"),
                    new MessageButton()
                      .setCustomId("rename")
                      .setLabel("✏ rename channel")
                      .setStyle("SECONDARY")
                  ),
                  new MessageActionRow().setComponents(
                    new MessageSelectMenu()
                      .setCustomId("menu")
                      .setMaxValues(1)
                      .setMinValues(1)
                      .setPlaceholder("عدد الأعضاء")
                      .setOptions([
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                        { label: "5", value: "5" },
                        { label: "10", value: "10" },
                        { label: "15", value: "15" },
                        { label: "20", value: "20" },
                        { label: "25", value: "25" },
                        { label: "30", value: "30" },
                        { label: "35", value: "35" },
                        { label: "40", value: "40" },
                        { label: "45", value: "45" },
                        { label: "50", value: "50" },
                        { label: "60", value: "60" },
                        { label: "70", value: "70" },
                        { label: "80", value: "80" },
                        { label: "90", value: "90" },
                        { label: "95", value: "95" },
                        { label: "0", value: "0" },
                      ])
                  ),
                ],
              });
            }, 4872);
          });
        message.delete();
      } while (false);
  })
  ["on"]("voiceStateUpdate", async function (oldState, newState) {
    let rooms = await db.get(`ROOMS_${newState["guild"]["id"]}`);
    if (rooms !== null) {
      if (rooms.includes(oldState.channelId)) {
        if (oldState.channel?.members.size == 0) oldState.channel.delete();
      }
    }

    if (newState.channelId == TEMPCHANNELSVOICECHANNELID) {
      newState["guild"]["channels"]
        ["create"]("voice - " + newState["member"]["user"]["username"], {
          type: "GUILD_VOICE",
        })
        .then(async (c) => {
          let category =
            newState["guild"]["channels"]["cache"]["get"](TEMPCHANNELSCATEGORY);
          c.setParent(category);
          newState.member.voice.setChannel(c);
          db.set(`ROOM_${newState["member"]["user"]["id"]}`, {
            channel: c.id,
          });
          let checker = await db.get(`ROOMS_${newState["guild"]["id"]}`);
          if (checker == null)
            db.set(`ROOMS_${newState["guild"]["id"]}`, [c.id]);
          else db.push(`ROOMS_${newState["guild"]["id"]}`, c.id);
        });
    }
  })
  ["on"]("interactionCreate", async function (interaction) {
    if (interaction.isButton()) {
      let room = await db.get(`ROOM_${interaction.user.id}`);
      if (room == null) return;
      else {
        let channel = interaction.member?.voice?.channel;
        if (!channel) return;
        if (room.channel !== channel.id)
          return interaction.followUp({
            content: "فقط صاحب الغرفه يستطيع ان يتحكم بها.",
            ephemeral: true,
          });
        const modal = new Modal()
          .setCustomId("modal-" + channel.id)
          .setTitle("rename channel")
          .addComponents(
            new TextInputComponent()
              .setCustomId("name")
              .setLabel("The new channel name:")
              .setStyle("SHORT")
              .setPlaceholder("Write the channel name here")
              .setRequired(true)
          );
        switch (interaction.customId) {
          case "public":
            {
              await interaction.deferUpdate().catch(() => {});
              channel.permissionOverwrites.set([
                {
                  id: interaction.guild.roles.everyone.id,
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.CONNECT,
                    Permissions.FLAGS.SPEAK,
                    Permissions.FLAGS.PRIORITY_SPEAKER,
                    Permissions.FLAGS.USE_VAD,
                  ],
                },
              ]);
            }
            break;
          case "privite":
            {
              await interaction.deferUpdate().catch(() => {});
              channel.permissionOverwrites.set([
                {
                  id: interaction.guild.roles.everyone.id,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: interaction.user.id,
                  allow: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.CONNECT,
                    Permissions.FLAGS.SPEAK,
                    Permissions.FLAGS.PRIORITY_SPEAKER,
                    Permissions.FLAGS.USE_VAD,
                  ],
                },
              ]);
            }
            break;
          case "mute":
            {
              await interaction.deferUpdate().catch(() => {});
              channel.members.forEach((member) => {
                let Tmember = interaction.guild.members.cache.get(member.id);
                if (Tmember.id !== interaction.user.id)
                  Tmember.voice.setMute(true);
              });
            }
            break;
          case "unmute":
            {
              await interaction.deferUpdate().catch(() => {});
              channel.members.forEach((member) => {
                let Tmember = interaction.guild.members.cache.get(member.id);
                if (Tmember.id !== interaction.user.id)
                  Tmember.voice.setMute(false);
              });
            }
            break;
          case "rename":
            {
              await showModal(modal, {
                client: client,
                interaction: interaction,
              });
            }
            break;
          default:
            break;
        }
      }
    }
  });

client["on"]("modalSubmit", async function (modal) {
  const channel = modal.guild.channels.cache.get(
    modal.customId.split("modal-").join("")
  );
  const nameResponse = modal.getTextInputValue("name");
  channel.setName(nameResponse);
  modal.reply({
    content: "your room name has changed to: `" + nameResponse + "`",
    ephemeral: true,
  });
});

client["on"]("interactionCreate", async function (interaction) {
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "menu") {
      await interaction.deferUpdate().catch(() => {});
      let room = await db.get(`ROOM_${interaction.user.id}`);
      if (room == null) return;
      else {
        let channel = interaction.member?.voice?.channel;
        if (!channel) return;
        if (room.channel !== channel.id)
          return interaction.followUp({
            content: "فقط صاحب الغرفه يستطيع ان يتحكم بها.",
            ephemeral: true,
          });
        if (
          interaction.guild.channels.cache.get(channel.id).type == "GUILD_VOICE"
        ) {
          interaction.guild.channels.cache
            .get(channel.id)
            .setUserLimit(interaction.values[0]);
        }
      }
    }
  }
});

// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|

// did you see casperMusic? chack out: https://discord.gg/ws9jA2cR5s

/**
   ⚠️ stop right there ⚠️
   did you know you are stealing my project when you remove the copyright?
   you can just contact me http://discord.com/users/933856726770413578 for publish it
   or if you are using it for your server know the no one will see the copyrights only you in the project
   so why you are removing it?, be nice and just leave it
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
 */