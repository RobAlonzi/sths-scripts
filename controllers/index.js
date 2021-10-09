const PlayerList = require('../class/PlayerList');
const {
  CURRENT_LEAGUE,
  ROSTER_URL,
  PLAYER_INFO_URL,
  SKATER_WAIVER_AGE,
  GOALIE_WAIVER_AGE,
  FREE_AGENT_AGE,
  ONE_WAY_SALARY_THRESHOLD,
  MIN_SALARY_THRESHOLD
} = require('../config')
/**
 * GET /
 * Home page
 */
 exports.home = (_, res) => {
    res.render('home', {
      title: 'Home'
    });
  };

/**
 * GET /players
 * List all players
 */
 exports.players = async (_, res) => {
    const player = new PlayerList(CURRENT_LEAGUE, ROSTER_URL, PLAYER_INFO_URL);
    const { skaters, goalies } = await player.getPlayerData();

    res.render('players', {
      title: 'Players',
      skaters,
      goalies
    });
  };


  exports.free_agents = async (_, res) => {
    const player = new PlayerList(CURRENT_LEAGUE, ROSTER_URL, PLAYER_INFO_URL);
    const { skaters, goalies } = await player.getPlayerData();

    const fa_skaters = skaters
      .filter(skater => !skater.contract.length && skater.birthday.year <= FREE_AGENT_AGE)
      .sort((a, b) => b.ratings.overall - a.ratings.overall);

    const fa_goalies = goalies
      .filter(goalie => !goalie.contract.length && goalie.birthday.year <= FREE_AGENT_AGE)
      .sort((a, b) => b.ratings.overall - a.ratings.overall);

    res.render('free-agents', {
      title: 'Free Agents',
      skaters: fa_skaters,
      goalies: fa_goalies
    });
  };

  exports.waivers = async (_, res) => {
    const player = new PlayerList(CURRENT_LEAGUE, ROSTER_URL, PLAYER_INFO_URL);
    const { skaters, goalies } = await player.getPlayerData();

    const waived_skaters = skaters
      .filter(skater => skater.contract.length &&  skater.birthday.year <= SKATER_WAIVER_AGE && !skater.status.is_pro)
      .sort((a, b) => {
        if(a.team !== b.team) {
          return a.team.localeCompare(b.team)
        }

        return b.ratings.overall - a.ratings.overall;
      })
    const waived_goalies = goalies
      .filter(goalie => goalie.contract.length && goalie.birthday.year <= GOALIE_WAIVER_AGE && !goalie.status.is_pro)
      .sort((a, b) => {
        if(a.team !== b.team) {
          return a.team.localeCompare(b.team)
        }

        return b.ratings.overall - a.ratings.overall;
      });

    res.render('waivers', {
      title: 'Waived Players',
      skaters: waived_skaters,
      goalies: waived_goalies
    });
  };

  exports.one_way = async (_, res) => {
    const player = new PlayerList(CURRENT_LEAGUE, ROSTER_URL, PLAYER_INFO_URL);
    const { skaters, goalies } = await player.getPlayerData();

    const one_way_players = [...skaters, ...goalies]
      .filter(player => player.contract.salary >= ONE_WAY_SALARY_THRESHOLD)
      .sort((a, b) => {
        if(a.name.last === b.name.last) {
          return a.name.first.localeCompare(b.name.first)
        }
        return a.name.last.localeCompare(b.name.last)
      })

    res.render('one-way', {
      title: 'One Way Contracts',
      players: one_way_players
    });
  };
  
  exports.min_salary = async (_, res) => {
    const player = new PlayerList(CURRENT_LEAGUE, ROSTER_URL, PLAYER_INFO_URL);
    const { skaters, goalies } = await player.getPlayerData();

    debugger;
    const min_salary_players = [...skaters, ...goalies]
      .filter(player => player.contract.salary && player.contract.salary < MIN_SALARY_THRESHOLD)
      .sort((a, b) => {
        if(a.name.last === b.name.last) {
          return a.name.first.localeCompare(b.name.first)
        }
        return a.name.last.localeCompare(b.name.last)
      })

    res.render('min-salary', {
      title: 'Below Min Salary Threshold',
      players: min_salary_players,
      threshold: MIN_SALARY_THRESHOLD
    });
  };