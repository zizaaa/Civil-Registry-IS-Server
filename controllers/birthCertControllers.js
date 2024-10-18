import { getPaginatedBirthCertificates, getRegistryNumber, getSingleBirthCertificate, insertData } from "../models/birthCertModels.js";

// register birth certificate
export const registerBirthCert = async (req, res) => {
    const nineteenB_SignaturePath = req.files['nineteenB_Signature'] ? req.files['nineteenB_Signature'][0].path : null;
    const twenty_SignaturePath = req.files['twenty_Signature'] ? req.files['twenty_Signature'][0].path : null;
    const twentyOne_SignaturePath = req.files['twentyOne_Signature'] ? req.files['twenty_Signature'][0].path : null;
    const twentyTwo_SignaturePath = req.files['twentyTwo_Signature'] ? req.files['twenty_Signature'][0].path : null;
    try {
        const certData = {
            province:req.body.province,
            cityOrMunicipality:req.body.cityOrMunicipality,
            one_first:req.body.one_first,
            one_middle:req.body.one_middle,
            one_last:req.body.one_last,
            two_sex:req.body.two_sex,
            three_day:req.body.three_day,
            three_month:req.body.three_month,
            three_year:req.body.three_year,
            four_nameOf:req.body.four_nameOf,
            four_cityOrMunicipality:req.body.four_cityOrMunicipality,
            four_province:req.body.four_province,
            fiveA_typeOfBirth:req.body.fiveA_typeOfBirth,
            fiveB_IfMultiple:req.body.fiveB_IfMultiple,
            fiveC_birthOrder:req.body.fiveC_birthOrder,
            fiveD_weight:req.body.fiveD_weight,
            six_first:req.body.six_first,
            six_middle:req.body.six_middle,
            six_last:req.body.six_last,
            seven_citizenship:req.body.seven_citizenship,
            eight_religion:req.body.eight_religion,
            nineA_totalNumber:req.body.nineA_totalNumber,
            nineB_numberOfChild:req.body.nineB_numberOfChild,
            nineC_numberOfChildDead:req.body.nineC_numberOfChildDead,
            ten_occupation:req.body.ten_occupation,
            eleven_ageAtTheTime:req.body.eleven_ageAtTheTime,
            twelve_house:req.body.twelve_house,
            twelve_cityOrMunicipality:req.body.twelve_cityOrMunicipality,
            twelve_province:req.body.twelve_province,
            thirteen_first:req.body.thirteen_first,
            thirteen_middle:req.body.thirteen_middle,
            thirteen_last:req.body.thirteen_last,
            fourteen_citizenship:req.body.fourteen_citizenship,
            fifteen_religion:req.body.fifteen_religion,
            sixteen_occupation:req.body.sixteen_occupation,
            seventeen_ageAtTheTime:req.body.seventeen_ageAtTheTime,
            eighteen_DateAndPlaceOfMarriageOfParents:req.body.eighteen_DateAndPlaceOfMarriageOfParents,
            nineteenA_attendant:req.body.nineteenA_attendant,
            nineteenB_Signature:nineteenB_SignaturePath,    //* the sigenature file the formdata name is "nineteenB_Signature"
            nineteenB_nameInPrint:req.body.nineteenB_nameInPrint,
            nineteenB_titleAndPosition:req.body.nineteenB_titleAndPosition,
            nineteenB_address:req.body.nineteenB_address,
            nineteenB_date:req.body.nineteenB_date,
            nineteenB_bornAliveAt:req.body.nineteenB_bornAliveAt,
            twenty_Signature:twenty_SignaturePath,          //* the sigenature file the formdata name is "twenty_Signature"
            twenty_nameInPrint:req.body.twenty_nameInPrint,
            twenty_relationToChild:req.body.twenty_relationToChild,
            twenty_address:req.body.twenty_address,
            twenty_date:req.body.twenty_date,
            twentyOne_Signature:twentyOne_SignaturePath,    //* the sigenature file the formdata name is "twentyOne_Signature"
            twentyOne_nameInPrint:req.body.twentyOne_nameInPrint,
            twentyOne_titleOrPosition:req.body.twentyOne_titleOrPosition,
            twentyOne_date:req.body.twentyOne_date,
            twentyTwo_Signature:twentyTwo_SignaturePath,    //* the sigenature file the formdata name is "twentyTwo_Signature"
            twentyTwo_nameInPrint:req.body.twentyTwo_nameInPrint,
            twentyTwo_titleOrPosition:req.body.twentyTwo_titleOrPosition,
            twentyTwo_date:req.body.twentyTwo_date,
            remarksAnnotation:req.body.remarksAnnotation,
            populationReferenceNumber:req.body.populationReferenceNumber,
            fourtyOne:req.body.fourtyOne,
            fourtyEight:req.body.fourtyEight,
            fourtyNine:req.body.fourtyNine,
            fifthy:req.body.fifthy,
            fiftySix:req.body.fiftySix,
            sixtyOne:req.body.sixtyOne,
            sixtyTwo:req.body.sixtyTwo,
            sixtyFour:req.body.sixtyFour,
            sixtyEight:req.body.sixtyEight,
            sixtyNine:req.body.sixtyNine,
            seventy:req.body.seventy,
            seventyTwo:req.body.seventyTwo,
            seventyFour:req.body.seventyFour,
            seventySix:req.body.seventySix,
            seventyNine:req.body.seventyNine,
            eightyOne:req.body.eightyOne,
            eightySix:req.body.eightySix,
            eightySeven:req.body.eightySeven,
            eightyEight:req.body.eightyEight,
            ninetyOne:req.body.ninetyOne,
            ninetyThree:req.body.ninetyThree,
            ninetyFour:req.body.ninetyFour,
            registryNumber:req.body.registryNumber
        }
        await insertData(certData);

        return res.status(201).json({message:"Successfully registered!"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error registering birth ceritificate.' });
    }
}

export const handleGetRegistryNumber = async (req, res) => {
    try {
        console.log('Handling registry number request...');
        const registryNumber = await getRegistryNumber();
        console.log('Registry number:', registryNumber);
    
        return res.status(200).json({ registryNumber });
    } catch (error) {
        console.error('Error in handleGetRegistryNumber:', error);
        return res.status(500).json({ message: 'Error retrieving birth certificate.' });
    }
};

// Controller to handle paginated request
export const handleGetPaginatedBirthCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page from query params
        const limit = parseInt(req.query.limit) || 10;  // Set a default limit if not provided
        console.log('queryyyy....');
        console.log(page)
        console.log(limit)
        const result = await getPaginatedBirthCertificates(page, limit);

        console.log(result)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching paginated data.' });
    }
};

export const handleGetSingleCertificate = async (req,res) => {
    const { id } = req.query;

    if(!id){
        return res.status(403).json({message:'Invalid ID'});
    }
    try {
        const response = await getSingleBirthCertificate(id);

            if(!response){
                return res.status(404).json('Birth certificate not found.');
            }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding certificate.' });
    }
}