const PlayerRatings = require('./PlayerRatings');
const PlayerInfo = require('./PlayerInfo');

class PlayerList {
	constructor(type, roster_url, player_info_url) {
		this.type = type;
    this.roster_url = roster_url;
    this.player_info_url = player_info_url;
	}

  async getPlayerData() {
		const ratings = new PlayerRatings(this.roster_url, this.type);
    const info = new PlayerInfo(this.player_info_url, this.type);
    const { skaters: skater_ratings, goalies: goalie_ratings } = await ratings.getPlayerRatings();
    const { skaters: skater_info, goalies: goalie_info } = await info.getPlayerInfo();

    return {
      skaters: this._mergeSkaterData(skater_ratings, skater_info),
      goalies: this._mergeGoalieData(goalie_ratings, goalie_info),
    }

	}

  _mergeSkaterData(skater_ratings, skater_info) {
    const merged_data = [];

    for(const skater of skater_ratings) {
      const info = skater_info.find(info => skater.name.last === info.name.last && skater.name.first === info.name.first && skater.team === info.team);

      if(!info) {
        console.error(`No match found for ${skater.name.first} ${skater.name.last}`)
        merged_data.push(skater);
        continue;
      }

      const combined_skater = {
        id: skater.id,
        age: info.age,
        birthday: info.birthday,
        contract: {
          ...info.contract,
          is_ntc: skater.contract.is_ntc
        },
        height: info.height,
        name: skater.name,
        nationality: info.nationality,
        position: skater.position,
        status: skater.status,
        team: skater.team,
        ratings: skater.ratings,
        weight: info.weight,
      }

      merged_data.push(combined_skater);

    }

    return merged_data;
  }

  _mergeGoalieData(goalie_ratings, goalie_info) {
    const merged_data = [];

    for(const goalie of goalie_ratings) {
      const info = goalie_info.find(info => goalie.name.last === info.name.last && goalie.name.first === info.name.first && goalie.team === info.team);

      if(!info) {
        console.error(`No match found for ${goalie.name.first} ${goalie.name.last}`)
        merged_data.push(goalie);
        continue;
      }

      const combined_goalie = {
        id: goalie.id,
        age: info.age,
        birthday: info.birthday,
        contract: {
          ...info.contract,
          is_ntc: goalie.contract.is_ntc
        },
        height: info.height,
        name: goalie.name,
        nationality: info.nationality,
        position: goalie.position,
        status: goalie.status,
        team: goalie.team,
        ratings: goalie.ratings,
        weight: info.weight,
      }

      merged_data.push(combined_goalie);

    }

    return merged_data;
  }
}

module.exports = PlayerList;