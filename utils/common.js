const getLabelEnterType = ({ length, name }) =>
  `Введите параметр "${name}" (${length})`;

const identicalCommands = (firstCommand, secondTeam) =>
  firstCommand.toString().toLowerCase().indexOf(secondTeam.toLowerCase()) === 0;

module.exports = {
  getLabelEnterType,
  identicalCommands,
};
