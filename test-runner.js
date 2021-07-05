const fs = require("fs-extra");
const path = require("path");
const handlebars = require("handlebars");
const exec = require("child_process").exec;

async function test(userCode, testCases = []) {
  const localVars = `private ${userCode.className} calculator;`;
  const setUp = `calculator = new ${userCode.className}();`;
  const templateSource = await fs.readFile(
    path.resolve(__dirname, "./templates/CalculatorTest.hbs"),
    { encoding: "utf-8" }
  );
  const template = handlebars.compile(templateSource);
  const testSource = template({
    userCode, // className, content
    localVars,
    setUp,
    testCases,
  });

  await fs.writeFile(
    path.resolve(__dirname, `./src/${userCode.className}.java`),
    userCode.code,
    { encoding: "utf-8" }
  );
  await fs.writeFile(
    path.resolve(__dirname, `./src/Test${userCode.className}.java`),
    testSource,
    { encoding: "utf-8" }
  );

  return new Promise((resolve, reject) => {
    exec(
      `javac -d bin -sourcepath src -cp .:lib/junit.jar src/Test${userCode.className}.java`,
      function (err, stdout, stderr) {
        console.log("Done compiling");
        if (err) {
          console.error("Error compile", { err, stderr });
          return reject(err);
        }

        exec(
          `java -jar lib/junit.jar --cp bin/ -c Test${userCode.className}`,
          function (err, stdout, stderr) {
            if (err) {
              console.error("Error run", err, stderr);
              return;
            }
            console.log("Done running test");
            console.log(stdout);
            // console.log(stderr);
            resolve(stdout);
          }
        );
      }
    );
  });
}

test(
  {
    className: "Calculator",
    code: `
public class Calculator {
  public int twoSum(int a, int b) {
    return a + b;
  }
}
`,
  },
  [
    { in: "calculator.twoSum(1,2)", out: 3 },
    { in: "calculator.twoSum(3,2)", out: 4 },
  ]
).then(() => console.log("Done"));
