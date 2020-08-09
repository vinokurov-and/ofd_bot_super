module.exports = class Validator {
  constructor(value) {
    this.value = value;
    this.result = [];
  }

  addError(error) {
    this.result.push(error);
  }

  isMaxLength(maxLength) {
    if (this.value) this.addError(`больше ${maxLength} симв.`);
    return this;
  }

  fixedLength(lengthValues) {
    let text = 'только';
    if (Array.isArray(lengthValues)) {
      lengthValues.forEach((value) => {
        text += ` ${value};`;
      });
    } else {
      text += ` ${value}`;
    }
    this.addError(`${text} симв.`);
    return this;
  }

  execute() {
    if (this.result.length) {
      let text = 'Значение должно быть: \n';
      this.result.forEach((error) => {
        text += `- ${error};\n`;
      });
      this.result = [];
      return text;
    }
  }
};
