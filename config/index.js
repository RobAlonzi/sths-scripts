// const CURRENT_LEAGUE = 'OTHL';
// const ROSTER_URL = 'https://othl.ca/File/2021-RegularSeason/OTHL-ProTeamRoster.php';
// const PLAYER_INFO_URL = 'https://othl.ca/File/2021-RegularSeason/OTHL-ProTeamPlayersInfo.php';
const CURRENT_LEAGUE = 'BRHL';
const ROSTER_URL = 'https://brhl.net/File/2022-Preseason/BRHL2-ProTeamRoster.html';
const PLAYER_INFO_URL = 'https://brhl.net/File/2022-Preseason/BRHL2-ProTeamPlayersInfo.html';
const SKATER_WAIVER_AGE = 1997;
const GOALIE_WAIVER_AGE = 1996;
const FREE_AGENT_AGE = 1993;
const MIN_SALARY_THRESHOLD = 750000;
const ONE_WAY_SALARY_THRESHOLD = 4000000;
// const BIRTHDATE_FORMAT = 'Y/M/D';
// const BIRTHDATE_SEPARATOR = '-';
const BIRTHDATE_FORMAT = 'M/D/Y';
const BIRTHDATE_SEPARATOR = '/';

// Full name mapping
const FULL_TEAM_NAMES = {
    anaheimducks: 'ana',
    arizonacoyotes: 'arz',
    bostonbruins: 'bos',
    buffalosabres: 'buf',
    calgaryflames: 'cgy',
    carolinahurricanes: 'car',
    chicagoblackhawks: 'chi',
    coloradoavalanche: 'col',
    columbusbluejackets: 'cbj',
    dallasstars: 'dal',
    detroitredwings: 'det',
    edmontonoilers: 'edm',
    floridapanthers: 'fla',
    losangeleskings: 'lak',
    minnesotawild: 'min',
    montrealcanadiens: 'mtl',
    nashvillepredators: 'nsh',
    newjerseydevils: 'njd',
    newyorkislanders: 'nyi',
    newyorkrangers: 'nyr',
    ottawasenators: 'ott',
    philadelphiaflyers: 'phi',
    pittsburghpenguins: 'pit',
    sanjosesharks: 'sjs',
    seattlekraken: 'sea',
    stlouisblues: 'stl',
    tampabaylightning: 'tbl',
    torontomapleleafs: 'tor',
    vancouvercanucks: 'van',
    vegasgoldenknights: 'vgk',
    washingtoncapitals: 'wsh',
    winnipegjets: 'wpg'
}

// Nickname Mapping
const TEAM_NICKNAMES = {
  ducks : 'ana',
  coyotes : 'arz',
  bruins : 'bos',
  sabres : 'buf',
  flames : 'cgy',
  hurricanes : 'car',
  blackhawks : 'chi',
  avalanche : 'col',
  bluejackets : 'cbj',
  stars : 'dal',
  redwings : 'det',
  oilers : 'edm',
  panthers : 'fla',
  kings : 'lak',
  wild : 'min',
  canadiens : 'mtl',
  predators : 'nsh',
  devils : 'njd',
  islanders : 'nyi',
  rangers : 'nyr',
  senators : 'ott',
  flyers : 'phi',
  penguins : 'pit',
  sharks : 'sjs',
  kraken: 'sea',
  blues : 'stl',
  lightning : 'tbl',
  mapleleafs : 'tor',
  canucks : 'van',
  goldenknights : 'vgk',
  capitals : 'wsh',
  jets : 'wpg',
}

// All Team info
const TEAM_INFO = {
	ana: {
        id: 24,
        name: "Anaheim Ducks",
        abbr: "ANA",
	},
	arz: {
		id: 53,
        name: "Arizona Coyotes",
        abbr: 'ARZ'
	},
	bos: {
		id: 6,
        name: "Boston Bruins",
        abbr: 'BOS'
	},
	buf: {
		id: 7,
        name: "Buffalo Sabres",
        abbr: 'BUF'
	},
	cgy: {
		id: 20,
        name: "Calgary Flames",
        abbr: 'CGY'
	},
	car: {
		id: 12,
        name: "Carolina Hurricanes",
        abbr: 'CAR'
	},
	chi: {
		id: 16,
        name: "Chicago Blackhawks",
        abbr: 'CHI'
	},
	col: {
		id: 21,
        name: "Colorado Avalanche",
        abbr: 'COL'
	},
	cbj: {
		id: 29,
        name: "Columbus Blue Jackets",
        abbr: 'CBJ'
	},
	dal: {
		id: 25,
        name: "Dallas Stars",
        abbr: 'DAL'
	},
	det: {
		id: 17,
        name: "Detroit Red Wings",
        abbr: 'DET'
	},
	edm: {
		id: 22,
        name: "Edmonton Oilers",
        abbr: 'EDM'
	},
	fla: {
		id: 13,
        name: "Florida Panthers",
        abbr: 'FLA'
	},
	lak: {
		id: 26,
        name: "Los Angeles Kings",
        abbr: 'LAK'
	},
	min: {
		id: 30,
        name: "Minnesota Wild",
        abbr: 'MIN'
	},
	mtl: {
		id: 8,
        name: "Montréal Canadiens",
        abbr: 'MTL'
	},
	nsh: {
		id: 18,
        name: "Nashville Predators",
        abbr: 'NSH'
	},
	njd: {
		id: 1,
        name: "New Jersey Devils",
        abbr: 'NJD'
	},
	nyi: {
		id: 2,
        name: "New York Islanders",
        abbr: 'NYI'
	},
	nyr: {
		id: 3,
        name: "New York Rangers",
        abbr: 'NYR'
	},
	ott: {
		id: 9,
        name: "Ottawa Senators",
        abbr: 'OTT'
	},
	phi: {
		id: 4,
        name: "Philadelphia Flyers",
        abbr: 'PHI'
	},
	pit: {
		id: 5,
        name: "Pittsburgh Penguins",
        abbr: 'PIT'
	},
	sjs: {
		id: 28,
        name: "San Jose Sharks",
        abbr: 'SJS'
	},
    sea: {
		id: 55,
        name: "Seattle Kraken",
        abbr: 'SEA'
	},
	stl: {
		id: 19,
        name: "St. Louis Blues",
        abbr: 'STL'
	},
	tbl: {
		id: 14,
        name: "Tampa Bay Lightning",
        abbr: 'TBL'
	},
	tor: {
		id: 10,
        name: "Toronto Maple Leafs",
        abbr: 'TOR'
	},
	van: {
		id: 23,
        name: "Vancouver Canucks",
        abbr: 'VAN'
	},
	vgk: {
		id: 54,
        name: "Vegas Golden Knights",
        abbr: 'VGK'
	},
	wsh: {
		id: 15,
        name: "Washington Capitals",
        abbr: 'WSH'
	},
	wpg: {
		id: 52,
        name: "Winnipeg Jets",
        abbr: 'WPG'
	}
};

module.exports = {
  BIRTHDATE_FORMAT,
  BIRTHDATE_SEPARATOR,
  CURRENT_LEAGUE,
  ROSTER_URL,
  PLAYER_INFO_URL,
  FULL_TEAM_NAMES,
  TEAM_NICKNAMES,
  TEAM_INFO,
  SKATER_WAIVER_AGE,
  GOALIE_WAIVER_AGE,
  FREE_AGENT_AGE,
  MIN_SALARY_THRESHOLD,
  ONE_WAY_SALARY_THRESHOLD
}