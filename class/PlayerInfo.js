const axios = require('axios');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');

const { cleanName, findTeam, formatBirthday, formatWeight, formatHeight, formatPosition, formatSalary } = require('./helper');

class PlayerInfo {
	constructor(url, type) {
		this.url = url;
		this.type = type;
	}

  async getPlayerInfo() {
		const response = await axios.get(this.url);
		return this._scrapeInfoPage(response.data);
	}

  _scrapeInfoPage(html) {
    let skaters = [];
		let goalies = [];
		const dom = new JSDOM(html);
		const $ = jquery(dom.window);
		
    const teams = $("h1");

		for(const team of teams) {
			const team_name = $(team).children('a').first().text();
			const roster = $(team).nextAll('div').eq(1);

			const [team_skaters, team_goalies] = this._scrapeTable($, roster, team_name);

      skaters = [...skaters, ...team_skaters];
      goalies = [...goalies, ...team_goalies];
		}

    return { skaters, goalies }
  }

  _scrapeTable($, div, team_name) {
    const skaters = [];
    const goalies = [];

    const table = $(div).find('table').eq(0);
		const rows = $(table).find('tr');
		// Remove first element
		rows.splice(0, 1);

		for(const row of rows) {
			const player = this._scrapePlayerRow($, row, team_name);

      if(player.position.is_goalie) {
        goalies.push(player);
      } else {
        skaters.push(player);
      }
		}
    
		return [skaters, goalies];
  }

  _scrapePlayerRow($, row, team_name) {
    const player = {
      position: {}
    };
		const cells = $(row).find('td');
    
    player.team = findTeam(team_name);
    player.name = cleanName($(cells).eq(0).text());
    player.nationality = $(cells).eq(1).text();

    // Position
    player.position.is_center = Boolean($(cells).eq(2).text().includes('C'));
    player.position.is_left_wing = Boolean($(cells).eq(2).text().includes('LW'));
    player.position.is_right_wing = Boolean($(cells).eq(2).text().includes('RW'));
    player.position.is_defense = Boolean($(cells).eq(2).text().includes('D'));
    player.position.is_goalie = Boolean($(cells).eq(2).text().includes('G'));
    player.position.formatted = formatPosition(player.position);

    // Vitals
    player.age = Number($(cells).eq(3).text());
    player.birthday = formatBirthday($(cells).eq(4).text());
    player.weight = formatWeight($(cells).eq(5).text());
    player.height = formatHeight($(cells).eq(6).text());

    // Contract
    player.contract = {};
    player.contract.length = Number($(cells).eq(9).text().split(' ')[0]);
    player.contract.type = $(cells).eq(10).text();
    player.contract.one_way = $(cells).eq(11).text() === 'No' ? false : true;
    player.contract.salary = formatSalary($(cells).eq(12).text());

    return player;
  }

}

module.exports = PlayerInfo;