class Utility {
    constructor() {
        this.resultData = null;
    }
    tempConversion(body, callback) {
        if (body.unit === "celcius" && body.convertTo === "farenheit") {
            this.resultData = (body.value * 9 / 5) + 32
        } else if (body.unit === "farenheit" && body.convertTo === "celcius") {
            this.resultData = (body.value - 32) * 5 / 9
        } else {
            this.resultData = body.value
        }
        return callback(null, this.resultData)
    }
    lengthConversion(body, callback) {

        switch (body.convertTo) {
            case "yard":
                this.resultData = this.convertToYard(body.unit, body.value);
                break;
            case "inch":
                this.resultData = this.convertToInches(body.unit, body.value);
                break;
            case "centimetre":
                this.resultData = this.convertToCentimetre(body.unit, body.value);
                break;
            default:
                this.resultData = this.convertToFeet(body.unit, body.value);
        }

        return callback(null, this.resultData);
    }

    volumeConversion(body, callback) {

        switch (body.convertTo) {
            case "millilitre":
                this.resultData = this.convertToMillilitre(body.unit, body.value);
                break;
            case "gallon":
                this.resultData = this.convertToGallon(body.unit, body.value);
                break;
            default:
                this.resultData = this.convertToLitre(body.unit, body.value);
        }

        return callback(null, this.resultData);
    }

    convertToMillilitre(unit, value) {
        if (unit === "gallon") {
            return value * 3785
        } else {
            return (unit === "litre" ? value * 1000 : value);
        }
    }

    convertToLitre(unit, value) {
        if (unit === "gallon") {
            return value * 3.78541
        } else {
            return (unit === "millilitre" ? value / 1000 : value);
        }
    }
    convertToGallon(unit, value) {
        if (unit === "litre") {
            return value / 3.78541
        } else {
            return (unit === "millilitre" ? value / 3785 : value);
        }
    }
    convertToYard(unit, value) {
        switch (unit) {
            case "feet":
                return value / 3;
            case "inch":
                return value / 36;
            case "centimetre":
                return value / 91.44;
            default:
                return value
        }
    }

    convertToInches(unit, value) {
        switch (unit) {
            case "feet":
                return value * 12;
            case "yard":
                return value * 36;
            case "centimetre":
                return value / 2.54;
            default:
                return value
        }
    }

    convertToFeet(unit, value) {
        switch (unit) {
            case "inch":
                return value / 12;
            case "yard":
                return value * 3;
            case "centimetre":
                return value / 30.48;
            default:
                return value
        }
    }

    convertToCentimetre(unit, value) {

        switch (unit) {
            case "inch":
                return value * 2.54;
            case "yard":
                return value * 91.44;
            case "feet":
                return value * 30.48;
            default:
                return value
        }
    }
}
module.exports = new Utility;