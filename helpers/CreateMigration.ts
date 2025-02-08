import * as fs from 'fs'
import moment from 'moment'
import * as path from 'path'

/**
 * Set the directory where migration files are located.
 * `__dirname` is the current directory of the file, and `./templates` is the relative path to the templates directory.
 */
const migrationDirectory = path.resolve(__dirname, '../src/migrations')

/**
 * The second command line argument is expected to be the migration name.
 * `process.argv` contains the command line arguments where the first two are 'node' and the script name.
 */
const migrationName = process.argv[2]

if (!migrationName) {
  console.error('Please provide a name for the migration.')
  process.exit(1)
}

/**
 * Converts a string to camelCase. It finds hyphenated letters and
 * transforms them to uppercase, following the camelCase naming convention.
 */
const camelCase = (str: string): string => str.replace(/-([a-z])/gi, (_all, letter) => letter.toUpperCase())

/**
 * Generate the filename using a function to get the next migration number and the provided migration name,
 * appending '.migration.ts' to create a TypeScript file.
 */
const timestamp = new Date().getTime()
const filename = `${timestamp}-${camelCase(migrationName)}.migration.ts`
const filepath = path.join(migrationDirectory, filename)

const content = `import { MigrationInterface, QueryRunner } from "typeorm"

export class ${camelCase(migrationName)}${timestamp} implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Write your migration here.
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Write the reverse of the above migration here.
  }
}
`

fs.writeFileSync(filepath, content)
console.log(`Migration created: ${filename}`)
