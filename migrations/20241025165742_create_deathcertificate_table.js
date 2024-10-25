export function up(knex) {
    return knex.schema.createTable('death_certificates', (table) => {
        table.increments('id').primary(); // Auto-incrementing primary key

        // Fields for death certificate data
        table.string('province');
        table.string('cityOrMunicipality');
        table.string('registryNumber');
        table.string('remarksOrAnnotation');
        table.string('one_first');
        table.string('one_middle');
        table.string('one_last');
        table.string('two_sex');
        table.string('three_religion');
        table.string('four_A_completedYears');
        table.string('four_B_months');
        table.string('four_B_days');
        table.string('four_C_time');
        table.string('five_nameOf');
        table.string('five_cityOrMunicipality');
        table.string('five_province');
        table.string('six_day');
        table.string('six_month');
        table.string('six_year');
        table.string('seven_citizenship');
        table.string('eight_houseNo');
        table.string('eight_cityOrMunicipality');
        table.string('eight_province');
        table.string('nine_civilStatus');
        table.string('ten_occupation');
        table.string('seventeen_I_A');
        table.string('seventeen_I_B');
        table.string('seventeen_I_C');
        table.string('seventeen_II');
        table.string('seventeen_ContributingToDeath');
        table.string('seventeen_Interval');
        table.string('eighteen_A_mannerOfDeath');
        table.string('eighteen_B_PlaceOfOccurance');
        table.string('nineTeen_Attendant');
        table.string('nineTeen_From');
        table.string('nineTeen_To');
        table.string('twenty_time');
        table.string('twenty_nameInPrint');
        table.string('twenty_TitleOrPosition');
        table.string('twenty_Address');
        table.string('twenty_Date');
        table.string('twenty_ReviewedBy_PrintedName');
        table.string('twenty_ReviewedBy_Date');
        table.string('twentyOne_CorpseDisposal');
        table.string('twentyTwo_Burial_Number');
        table.string('twentyTwo_Burial_DateIssued');
        table.string('twentyThree_Autopsy');
        table.string('twentyFour_NameAndAddress');
        table.string('twentyFive_NameInPrint');
        table.string('twentyFive_Relationship');
        table.string('twentyFive_Address');
        table.string('twentyFive_Date');
        table.string('twentySix_NameInPrint');
        table.string('twentySix_TitleOrPosition');
        table.string('twentySix_Date');
        table.string('twentySeven_NameInPrint');
        table.string('twentySeven_TitleOrPosition');
        table.string('twentySeven_Date');
        table.string('populationReference');
        table.string('fourtyOne');
        table.string('fourtyEight');
        table.string('fourtyNine');
        table.string('fifthy');
        table.string('fifthyOne');
        table.string('fifthyFour');
        table.string('fifthyNine');
        table.string('sixtyFive');
        table.string('sixtySix');
        table.string('seventyOne');
        table.string('seventyTwo');
        table.string('seventyFive');
        table.string('seventyNine');
        table.string('eighty');
        table.string('eightyTwo');
        table.string('eightyThree');
        table.string('eightyFive');
        table.string('eightySix');
        table.string('ninety');
        
        // Signature fields
        table.string('twentySignature');
        table.string('twentyReviewedSignature');
        table.string('twentyFiveSignature');
        table.string('twentySixSignature');
        table.string('twentySevenSignature');
    });
};

export function down(knex) {
    return knex.schema.dropTableIfExists('death_certificates'); // Rollback function
};