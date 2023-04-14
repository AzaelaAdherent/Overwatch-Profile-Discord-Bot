module.exports.run = async interaction => {
  const overwatch = require('overwatch-api');

  const platform = interaction.options.get('platform').value;
  const region = interaction.options.get('region').value;
  const tag = interaction.options.get('tag').value.replace('#', '-');
  
  interaction.deferReply();

  overwatch.getStats(platform, region, tag, (err, json) => {
    if (err) console.error(err);
    else console.log(json);
    
    const axios = require('axios');

    let config = JSON.parse(fs.readFileSync('../config.json'));
    const key = config.pastebinApiKey;
    console.log(key);

    axios.post('https://pastebin.com/api/api_post.php', `api_dev_key=${key}&api_paste_name=${tag}&api_paste_code=${JSON.stringify(json, null, 2)}&api_paste_format=json&api_option=paste&api_paste_private=1`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      console.log(response.data);
      interaction.editReply(response.data);
    });
  });
}