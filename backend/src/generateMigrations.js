const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Your model names
const modelNames = ["user"];

// Loop through each model and generate a migration file
modelNames.forEach((modelName) => {
  try {
    // Dynamically load the model definition
    const modelPath = path.resolve(__dirname, "models", modelName.toLowerCase() + ".js");
    const modelDefinition = require(modelPath);

    // Ensure that attributes is an object before attempting to access its properties
    if (
      typeof modelDefinition.attributes === "object" &&
      modelDefinition.attributes !== null
    ) {
      const attributes = Object.entries(modelDefinition.attributes)
        .map(([name, def]) => {
          const type = def.type.key || def.type.toSql?.() || def.type.toString();
          return `${name}:${type.toLowerCase()}`;
        })
        .join(",");

      const migrationCommand = `npx sequelize-cli model:generate --name ${modelName} --attributes ${attributes} --force`;
      console.log(`📦 Running: ${migrationCommand}`);
      // const migrationCommand = `npx sequelize-cli model:generate --name ${modelName} --attributes ${attributes}`;

      execSync(migrationCommand, { stdio: "inherit" });

      console.log(`Migration for ${modelName} generated successfully.`);
    } else {
      console.error(
        `Error: Model definition for ${modelName} is missing or invalid.`
      );
    }
  } catch (error) {
    console.error(
      `Error generating migration for ${modelName}:`,
      error.message
    );
    // Optionally, log the error to a file for future reference
    fs.appendFileSync(
      "migration_errors.log",
      `${new Date().toISOString()} - ${modelName}: ${error.message}\n`
    );
  }
});


// after successful migration, run the following command to create the database ensure we do this
// npx sequelize-cli db:migrate
// after a success create the seeders
// npx sequelize-cli seed:generate --name demo-user
// after a success create the seeders
// npx sequelize-cli db:seed:all
