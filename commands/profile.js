module.exports.run = async interaction => {
  const overwatch = require('overwatch-api');

  const platform = interaction.options.get('platform').value;
  const region = interaction.options.get('region').value;
  const tag = interaction.options.get('tag').value.replace('#', '-');

  overwatch.getProfile(platform, region, tag, (err, json) => {
    if (err) console.error(err);
    else {
      console.log(json);
      if (json.private) return interaction.reply("This user's profile is private");
      interaction.reply({
        content: '',
        ephemeral: false,
        embeds: [
          {
            color: 0x0055ff,
            author: {
              name: tag.replace('-', '#'),
            },
            thumbnail: {
              url: json.portrait
            },
            fields: [
              {
                name: '__Mode__',
                value: '**Quickplay\nCompetitive**',
                inline: true
              },
              {
                name: '__Playtime__',
                value: json.playtime.quickplay + '\n' + json.playtime.competitive,
                inline: true
              },
              {
                name: '',
                value: '',
              },
              {
                name: '__Mode__',
                value: '**Quickplay\nCompetitive**',
                inline: true
              },
              {
                name: '__Wins__',
                value: json.games.quickplay.won + '\n' + json.games.competitive.won,
                inline: true
              },
              {
                name: '__Losses__',
                value: (json.games.quickplay.played - json.games.quickplay.won) + '\n' + json.games.competitive.lost,
                inline: true
              },
              {
                name: '',
                value: '',
              },
              {
                name: '__Mode__',
                value: '**Quickplay\nCompetitive**',
                inline: true
              },
              {
                name: '__Games Played__',
                value: json.games.quickplay.played + '\n' + json.games.competitive.played,
                inline: true
              },
              {
                name: '__Winrate__',
                value: (json.games.quickplay.won / json.games.quickplay.played * 100).toFixed(2) + '%\n'
                + json.games.competitive.win_rate + '%',
                inline: true
              },
              {
                name: '',
                value: '',
              },
              {
                name: '__Competitive__',
                value: '**Tank\nDps\nSupport**',
                inline: true
              },
              {
                name: '__Rank__',
                value: json.competitive.tank.rank + '\n' + json.competitive.offense.rank + '\n' + json.competitive.support.rank,
                inline: true
              },
            ],
          }
        ],
        components: null
      });
    }
  });
}