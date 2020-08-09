module.exports = class Validator {
  constructor(value) {
    this.value = value;
    this.length = this.value.length;
    this.result = [];
  }

  addError(error) {
    this.result.push(error);
  }

  isMaxLength(maxLength) {
    if (this.length > maxLength) this.addError(`не больше ${maxLength} симв.`);
    return this;
  }

  isDigit() {
    if (/^\d+$/.test(this.value)) return this;
    this.addError('состоять из цифр');
    return this;
  }

  fixedLength(lengthValues) {
    const isArray = Array.isArray(lengthValues);
    if ((isArray && lengthValues.includes(this.length)) || this.length.toString() === lengthValues.toString())
      return this;

    let text = 'только';
    if (isArray) {
      lengthValues.forEach((value) => {
        text += ` ${value};`;
      });
    } else {
      text += ` ${lengthValues}`;
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
