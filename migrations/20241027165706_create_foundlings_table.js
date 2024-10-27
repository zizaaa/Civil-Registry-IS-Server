/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('foundlings_certificate', (table)=>{
        table.increments('id').primary(); // Auto-incrementing primary key

        // Basic information fields
        table.string('province');
        table.string('cityOrMunicipality');
        table.string('registryNumber');
        table.string('one_name');
        table.string('two_sex');
        table.string('three_age');
        table.string('four_dateAndTime'); // Using timestamp for date and time
        table.string('five_place');
        table.string('six_eyesColor');
        table.string('seven_hairColor');
        table.string('eight_bodyFeature'); // Consider text for detailed descriptions
        table.string('nine_condition'); // Consider text for detailed descriptions

        // Information fields related to 'ten'
        table.string('ten_name');
        table.string('ten_address');
        table.string('ten_telephone');
        table.string('ten_occupation');

        // Information fields related to 'eleven'
        table.string('eleven_name');
        table.string('eleven_address');
        table.string('eleven_telephone');
        table.string('eleven_occupation');

        // Information fields related to 'twelve'
        table.string('twelve_address');
        table.string('twelve_dateIssued'); // Using date type for date
        table.string('twelve_placeIssued');
        table.string('twelve_firstLine');
        table.string('twelve_secondLine');
        table.string('twelve_thirdLine');
        table.string('twelve_fourthLine');
        table.string('twelve_printedName');

        // Signature file uploads (store file paths or names)
        table.string('twelveInformantSignature'); // Signature file for 'twelveInformant'
        table.string('twelveRegistrarSignature'); // Signature file for 'twelveRegistrar'
        table.string('thirteenSignature'); // Signature file for 'thirteen'

        // Information fields related to 'thirteen'
        table.string('thirteen_certification');
        table.string('thirteen_printedName');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('foundlings_certificate');
};
