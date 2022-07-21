// const Hl7lib = require('nodehl7');
// 	const config = {
// 		"mapping": false,
// 		"profiling": true,
// 		"debug": true,
// 		"fileEncoding": "iso-8859-1"
// 	};

// 	let hl7parser = new Hl7lib(config);

// 	let callback = function(err, message){
//         console.log(JSON.stringify(message));
// 		if (err){
// 			console.error(err);
// 		} else {

// 			let pidSegment = message.get('PID');
// 			let patientIDs = pidSegment.get('Patient identifier list');

// 			console.log(patientIDs);
// 		}
// 	};

//     var s = `PID|1|7779|||Test^Test^||19670502|F||White|123 HIGH
//     WAY^^Westboro^MA^01581||5085085085|||Married||32801465^^^AA
//     ^|999999999`;

// 	hl7parser.parse(s.trim(), 'test', callback);



/**
 * parse the serial adt data with delemeter = '|'
 * into provided structure
 */
const parseSerialADTData = (arr, adt, delimeter = '|') => {

	// split the ADT data by delimeter
	let a = adt.split(delimeter);

	// get ADT data indexes from provide structure
	let indexes = Object.keys(arr);

	// the output data
	let obj = {};

	// go through the indexes and fetch data by index from parsed ADT data
	indexes.forEach((e ,i)=> {

		// set the property to output data and attach the related ADT Data
		obj[arr[e] ] = a[ + e] || "";
	});

	return obj;
};

/**
 * split the sub data from a serizlized ADT data
 * @param {*} propertiesArray 
 * @param {*} serielizedData 
 * @param {*} delimeter 
 * @returns 
 */
const parseSubData = (propertiesArray, serielizedData = '', delimeter = "^") => {

	let d = serielizedData.split(delimeter);

	let obj = {};

	propertiesArray.forEach((e, i)=> obj[e] = d[i] || '');

	return obj;
};

/**
 * convert the ADT date string to redable string
 * @param {string} dateNumberString 
 */
const convertADTDateToString = (dateNumberString) => {

	return dateNumberString.substr(0, 4) + '-' + dateNumberString.substr(4, 2) + '-' + dateNumberString.substr(6);
}

const getPatientIdentificationData = (adt) => {

	// the patient data structue by indexes in ADT data

	let patientIdentificationDataPropsIndexedValues = {
		0: 'PID',
		1: 'SequenceNumber',
		2: 'PatientId',
		3: 'ExternalPatientId',
		5: 'PatientName',
		6: 'MotherMaidenName',
		7: 'DateOfBirth',
		8: 'Sex',
		10: 'Race',
		11: 'Address',
		12: 'CountyCode',
		13: 'PhoneHome',
		14: 'PhoneBusiness',
		15: 'PrimaryLanguage',
		16: 'MaritialStatus',
		17: 'Relegion',
		18: 'PatientAccountNumber',
		19: 'SSN',
		22: 'Ethnicity',
		23: 'DefaultLocation',
		24: 'StatementFlag',
		25: 'StatementSignatureDate',
		26: 'PatientPreviousName'
	};


	let patientData = parseSerialADTData(patientIdentificationDataPropsIndexedValues, adt, '|');

	// --- futher deserialize data
	let arr = ['LastName', 'FirstName', 'MiddleName'];
	patientData.PatientName = parseSubData(arr, patientData.PatientName, '^');

	arr = ['Addr1', 'Addr2', 'City', 'State', 'Zip'];
	patientData.Address = parseSubData(arr, patientData.Address, '^');

	arr = ['Number', 'EmailAddress'];
	patientData.PhoneHome = parseSubData(arr, patientData.PhoneHome, "^");

	patientData.DateOfBirth = convertADTDateToString(patientData.DateOfBirth);

	return patientData;
};


//SAMPLE DATA

let s = `PID|1|7779|||Test^Test^||19670502|F||White|123 HIGH
WAY^^Westboro^MA^01581||5085085085|||Married||32801465^^^AA
^|999999999`;

let patientData = getPatientIdentificationData(s);

console.log(patientData)