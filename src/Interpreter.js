// https://regexr.com/ - regexp tester!
class Interpreter {

    //da - control voltage, ba - measured current, eb-timestamp


    convertToRealValue(value) {
        var units = {
            "u": 1E-6,
            "p": 1E-12,
            "m": 1E-3,
            "n": 1E-9,
            "f": 1E-15,
            " ": 1
        };
        const pure_value = value.slice(0, -1);
        var prefix = value.at(-1);

        return (parseInt(pure_value, 16) - Math.pow(2, 27)) * units[prefix];

    }


    interpret(pkg) {
        const re = /Peb([0-9ABCDEF]*[ umnpf]*);da([0-9ABCDEF]*[ umnpf]*);ba([0-9ABCDEF]*[ umnpf]*),[0-9]*,[0-9]*/gm
        for (const match of pkg.matchAll(re)) {
            const time = this.convertToRealValue(match[1]);
            const v = this.convertToRealValue(match[2]);
            const i = this.convertToRealValue(match[3]);
            console.log(`time: ${time.toFixed(3)}\tvoltage:  ${v.toExponential(3)}\tcurrent ${i.toExponential(3)} `);

        }
    }
}
export const interpreter = new Interpreter()