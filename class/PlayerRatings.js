const axios = require('axios');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');

const { cleanName, findTeam, formatSalary, formatPosition } = require('./helper');

class PlayerRatings {
	constructor(url, type) {
		this.url = url;
		this.type = type;
	}
	
	async getPlayerRatings() {
		const response = await axios.get(this.url);
		return this._scrapeRosterPage(response.data);
	}

	_scrapeRosterPage(html) {
		let skaters = [];
		let goalies = [];
		const dom = new JSDOM(html);
		const $ = jquery(dom.window);
		const teams = $("h1");

		for(const team of teams) {
			const team_name = $(team).children('a').first().text();
			const pro_team = $(team).nextAll('div').eq(1);
      const farm_team = $(team).nextAll('div').eq(3);

			const [pro_skaters, pro_goalies] = this._scrapeTables($, pro_team, team_name, true);
      const [farm_skaters, farm_goalies] = this._scrapeTables($, farm_team, team_name, false);

      skaters = [...skaters, ...pro_skaters, ...farm_skaters];
      goalies = [...goalies, ...pro_goalies, ...farm_goalies];
		}

    return { skaters, goalies }
	}

	_scrapeTables($, div, team, is_pro) {
		const skater_table = $(div).find('table.STHSRoster_PlayersTable').eq(0);
		const goalie_table = $(div).find('table.STHSRoster_GoaliesTable').eq(0);
		
		const skaters = this._scrapeSkaterTable($, skater_table, team, is_pro);
		const goalies = this._scrapeGoalieTable($, goalie_table, team, is_pro);

		return [skaters, goalies];
	}

	_scrapeSkaterTable($, table, team, is_pro) {
		const skaters = [];
		const rows = $(table).find('tr');
		// Remove first element
		rows.splice(0, 1);

		for(const row of rows) {
			skaters.push(this._scrapeSkaterRow($, row, team, is_pro));
		}

		return skaters;
	}

	_scrapeSkaterRow($, row, team, is_pro) {
		const skater = {
      position: {},
      ratings: {},
      status: {},
      contract: {},
    };

		const cells = $(row).find('td');
    skater.id = Number($(cells).eq(1).find('a').attr('href').split('=')[1]);
    skater.name = cleanName($(cells).eq(1).find('a').text());
    skater.team = findTeam(team);
    skater.age = Number($(cells).eq(28).text());

    // Position
    skater.position.is_center = Boolean($(cells).eq(2).text());
    skater.position.is_left_wing = Boolean($(cells).eq(3).text());
    skater.position.is_right_wing = Boolean($(cells).eq(4).text());
    skater.position.is_defense = Boolean($(cells).eq(5).text());
    skater.position.is_goalie = false;
    skater.position.formatted = formatPosition(skater.position);

    // Ratings
    skater.ratings.checking = Number($(cells).eq(8).text());
    skater.ratings.fighting = Number($(cells).eq(9).text());
    skater.ratings.dicipline = Number($(cells).eq(10).text());
    skater.ratings.skating = Number($(cells).eq(11).text());
    skater.ratings.strength = Number($(cells).eq(12).text());
    skater.ratings.endurance = Number($(cells).eq(13).text());
    skater.ratings.durability = Number($(cells).eq(14).text());
    skater.ratings.puck_handling = Number($(cells).eq(15).text());
    skater.ratings.faceoffs = Number($(cells).eq(16).text());
    skater.ratings.passing = Number($(cells).eq(17).text());
    skater.ratings.scoring = Number($(cells).eq(18).text());
    skater.ratings.defense = Number($(cells).eq(19).text());
    skater.ratings.penalty_shot = Number($(cells).eq(20).text());
    skater.ratings.experience = Number($(cells).eq(21).text());
    skater.ratings.leadership = Number($(cells).eq(22).text());
    skater.ratings.overall = Number($(cells).eq(25).text());


    // Status
    skater.status.is_rookie = $(cells).eq(1).find('a').text().includes('(R)');
    skater.status.is_pro = is_pro;
    
    // Contract
    skater.contract.length = Number($(cells).eq(29).text());
    skater.contract.salary = formatSalary($(cells).eq(30).text());
    skater.contract.is_ntc = $(cells).eq(26).text() === 'N';

    return skater;
	}

	_scrapeGoalieTable($, table, team, is_pro) {
		const goalies = [];
		const rows = $(table).find('tr');
		// Remove first element
		rows.splice(0, 1);

		for(const row of rows) {
			goalies.push(this._scrapeGoalieRow($, row, team, is_pro));
		}

		return goalies;
	}

  _scrapeGoalieRow($, row, team, is_pro) {
		const goalie = {
      position: {},
      ratings: {},
      status: {},
      contract: {},
    };

		const cells = $(row).find('td');
    
    // Main
    goalie.id = Number($(cells).eq(0).find('a').attr('href').split('=')[1]);
    goalie.name = cleanName($(cells).eq(0).find('a').text());
    goalie.team = findTeam(team);
    goalie.age = Number($(cells).eq(22).text());

    // Position
    goalie.position.is_center = false;
    goalie.position.is_left_wing = false;
    goalie.position.is_right_wing = false;
    goalie.position.is_defense = false;
    goalie.position.is_goalie = true;
    goalie.position.formatted = 'G';

    // Ratings
    goalie.ratings.skating = Number($(cells).eq(4).text());
    goalie.ratings.durability = Number($(cells).eq(5).text());
    goalie.ratings.endurance = Number($(cells).eq(6).text());
    goalie.ratings.size = Number($(cells).eq(7).text());
    goalie.ratings.agility = Number($(cells).eq(8).text());
    goalie.ratings.rebound_control = Number($(cells).eq(9).text());
    goalie.ratings.style_control = Number($(cells).eq(10).text());
    goalie.ratings.hand_speed = Number($(cells).eq(11).text());
    goalie.ratings.reaction_time = Number($(cells).eq(12).text());
    goalie.ratings.puck_handling = Number($(cells).eq(13).text());
    goalie.ratings.penalty_shot = Number($(cells).eq(14).text());
    goalie.ratings.experience = Number($(cells).eq(15).text());
    goalie.ratings.leadership = Number($(cells).eq(16).text());
    goalie.ratings.overall = Number($(cells).eq(19).text());

    // Status
    goalie.status.is_rookie = $(cells).eq(0).find('a').text().includes('(R)');
    goalie.status.is_pro = is_pro;
    
    // Contract
    goalie.contract.length = Number($(cells).eq(23).text());
    goalie.contract.salary = formatSalary($(cells).eq(24).text());
    goalie.contract.is_ntc = $(cells).eq(20).text() === 'N';

    return goalie;
	}
}

module.exports = PlayerRatings