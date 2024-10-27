/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('marriage_certificates', (table)=>{
        table.increments('id').primary(); // Auto-incrementing primary key

        // Basic information fields
        table.string('province');
        table.string('cityOrMunicipality');
        table.string('RegistryNumber');

        // Husband and wife personal information
        table.string('one_first');
        table.string('one_middle');
        table.string('one_last');
        table.string('one_first_wife');
        table.string('one_middle_wife');
        table.string('one_last_wife');

        // Husband and wife birth information
        table.string('two_day_husband');
        table.string('two_month_husband');
        table.string('two_year_husband');
        table.string('two_age_husband');
        table.string('two_day_wife');
        table.string('two_month_wife');
        table.string('two_year_wife');
        table.string('two_age_wife');

        // Location details for both husband and wife
        table.string('three_CityOrMunicipality_husband');
        table.string('three_Province_husband');
        table.string('three_Country_husband');
        table.string('three_CityOrMunicipality_wife');
        table.string('three_Province_wife');
        table.string('three_Country_wife');

        // Sex and citizenship information
        table.string('four_sex_husband');
        table.string('four_citizenship_husband');
        table.string('four_sex_wife');
        table.string('four_citizenship_wife');

        // Residence information for husband and wife
        table.string('five_Residence_husband');
        table.string('five_Residence_wife');

        // Religion information
        table.string('six_Religion_husband');
        table.string('six_Religion_wife');

        // Civil status information
        table.string('seven_CivilStatus_husband');
        table.string('seven_CivilStatus_wife');

        // Parent information for both husband and wife
        table.string('eight_first_husband');
        table.string('eight_middle_husband');
        table.string('eight_last_husband');
        table.string('eight_first_wife');
        table.string('eight_middle_wife');
        table.string('eight_last_wife');

        // Citizenship details for both husband and wife
        table.string('nine_Citizenship_husband');
        table.string('nine_Citizenship_wife');

        // Guardian details for both husband and wife
        table.string('ten_first_husband');
        table.string('ten_middle_husband');
        table.string('ten_last_husband');
        table.string('ten_first_wife');
        table.string('ten_middle_wife');
        table.string('ten_last_wife');

        // Citizenship of the guardian
        table.string('eleven_Citizenship_husband');
        table.string('eleven_Citizenship_wife');

        // Witness details for both husband and wife
        table.string('twelve_first_husband');
        table.string('twelve_middle_husband');
        table.string('twelve_last_husband');
        table.string('twelve_first_wife');
        table.string('twelve_middle_wife');
        table.string('twelve_last_wife');

        // Relationship details
        table.string('thirteen_relationship_husband');
        table.string('thirteen_relationship_wife');

        // Additional residence information
        table.string('fourteen_Residence_husband');
        table.string('fourteen_Residence_wife');

        // Office and location information
        table.string('fifteen_Office');
        table.string('fifteen_CityOrMunicipality');
        table.string('fifteen_Province');

        // Date information
        table.string('sixteen_Day');
        table.string('sixteen_Month');
        table.string('sixteen_Year');

        // Time information
        table.string('seventeen_Time');

        // Decision and witness details
        table.string('eighteen_nameOne');
        table.string('eighteen_nameTwo');
        table.string('eighteen_decision');
        table.string('eighteen_day');
        table.string('eighteen_dayOf');

        // Selection and choice information
        table.string('nineteen_choices');
        table.string('nineteen_choose_A_first');
        table.string('nineteen_choose_A_second');
        table.string('nineteen_choose_A_third');
        table.string('nineteen_choose_B');
        table.string('nineteen_PrintedName');
        table.string('nineteen_Position');
        table.string('nineteen_Religion');

        // Additional witness and signature details
        table.string('twenty_nameOne');
        table.string('twenty_nameTwo');
        table.string('twenty_nameThree');
        table.string('twenty_nameFour');
        table.string('twentyOne_NameInPrint');
        table.string('twentyOne_TitleOfPosition');
        table.string('twentyOne_Date');
        table.string('twentyTwo_NameInPrint');
        table.string('twentyTwo_TitleAndPosition');
        table.string('twentyTwo_Date');

        // Signature file uploads
        table.string('eighteenHusbandSignature');
        table.string('eighteenWifeSignature');
        table.string('nineTeenSignature');
        table.string('twentySignatureOne');
        table.string('twentySignatureTwo');
        table.string('twentySignatureThree');
        table.string('twentySignatureFour');
        table.string('twentyOneSignature');
        table.string('twentyTwoSignature');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('marriage_certificates');
};
