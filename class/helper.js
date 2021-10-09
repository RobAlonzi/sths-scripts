const { TEAM_NICKNAMES } = require('../config');

function cleanName(name) {
  const full_name = name.split('(')[0];
  const [first, ...last] = full_name.split(" ");

  return {
    first,
    last: last.join(" ")
  }
}

function findTeam(team) {
  const cleanName = team.replace(/[\W_]+/g,'').toLowerCase();

  if(TEAM_NICKNAMES[cleanName]) {
    return TEAM_NICKNAMES[cleanName].toUpperCase();
  }

  return 'N/A';
}

function formatSalary(salary) {
  return salary.replace(/\D/g,'');
}

function formatBirthday(birthday) {
  const [year, month, day] = birthday.split('-');

  return {
    year: Number(year), month: Number(month), day: Number(day)
  }
}

function formatWeight(weight) {
  return Number(weight.split(' ')[0]);
}

function formatHeight(height) {
  const [feet, inches] = height.split(' ft');
  return (Number(feet) * 12) + Number(inches);
}

function formatPosition({ is_center, is_left_wing, is_right_wing, is_defense, is_goalie }) {
  const positions = [];

  if(is_center) {
    positions.push('C');
  }

  if(is_left_wing) {
    positions.push('LW');
  }

  if(is_right_wing) {
    positions.push('RW');
  }

  if(is_defense) {
    positions.push('D');
  }

  if(is_goalie) {
    positions.push('G');
  }

  return positions.join(" / ");
}

module.exports = {
  cleanName,
  findTeam,
  formatBirthday,
  formatWeight,
  formatHeight,
  formatPosition,
  formatSalary
}