/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.≈≈

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
  
// function getLongestDinosaur(dinosaurs) {
//   // Check if the dinosaurs array is empty
//   if (dinosaurs.length === 0) {
//     // If empty, return an empty object
//     return {};
//   }

//   // Initialize the longestDinosaur variable with the first dinosaur in the array
//   // Use accumulator pattern - probably can use reduce, will try it later
//   let longestDinosaur = dinosaurs[0];

//   // Iterate through the dinosaurs array
//   for (let dinosaur of dinosaurs) {
//     // Check if the length of the current dinosaur is greater than the length of the longest dinosaur
//     if (dinosaur.lengthInMeters > longestDinosaur.lengthInMeters) {
//       // If true, update the longestDinosaur variable with the current dinosaur
//       longestDinosaur = dinosaur;
//     }
//   }

//   // Return an object with the name of the longest dinosaur as the key
//   // and its length converted from meters to feet as the value
//   return {
//     [longestDinosaur.name]: longestDinosaur.lengthInMeters * 3.281,
//   };
// }

function getLongestDinosaur(dinosaurs) {
  if (dinosaurs.length === 0) {
    return {};
  }

  let longestDinosaur = dinosaurs[0];
  let longestLengthInMeters = longestDinosaur.lengthInMeters;

  for (let i = 1; i < dinosaurs.length; i++) {
    const currentDinosaur = dinosaurs[i];

    if (currentDinosaur.lengthInMeters > longestLengthInMeters) {
      longestDinosaur = currentDinosaur;
      longestLengthInMeters = currentDinosaur.lengthInMeters;
    }
  }

  const lengthInFeet = longestLengthInMeters * 3.281;
  const result = {
    [longestDinosaur.name]: lengthInFeet,
  };

  return result;
}


/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */

  // function getDinosaurDescription(dinosaurs, id) {
  //   for (let dinosaur of dinosaurs) {
  //     if (dinosaur.dinosaurId === id) {
  //       const mya = Array.isArray(dinosaur.mya) ? dinosaur.mya[0] : dinosaur.mya;
  //       const description = `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${mya} million years ago.`;
  //       return description;
  //     }
  //   }
  //   return `A dinosaur with an ID of '${id}' cannot be found.`;
  // }

  // function getDinosaurDescription(dinosaurs, id) {
  //   // Find the dinosaur with the specified ID
  //   const findDinosaur = dinosaurs.find(dinosaur => dinosaur.dinosaurId === id);
  
  //   // Check if the dinosaur with the specified ID is found
  //   if (findDinosaur) {
  //     // Extract the first value from the mya array
  //     const mya = findDinosaur.mya[0];
  
  //     // Construct and return the dinosaur description
  //     return `${findDinosaur.name} (${findDinosaur.pronunciation})\n${findDinosaur.info} It lived in the ${findDinosaur.period} period, over ${mya} million years ago.`;
  //   }
  
  //   // Return a message indicating that the dinosaur with the specified ID cannot be found
  //   return `A dinosaur with an ID of '${id}' cannot be found.`;
  // }

  function getDinosaurDescription(dinosaurs, id) {
    // Initialize a variable to store the found dinosaur
    let foundDinosaur = null;
  
    // Iterate through the dinosaurs array to find the one with the specified ID
    for (let i = 0; i < dinosaurs.length; i++) {
      if (dinosaurs[i].dinosaurId === id) {
        foundDinosaur = dinosaurs[i];
        // Exit the loop once the dinosaur is found
        //break;
      }
    }
  
    // Check if a dinosaur with the specified ID was found
    if (foundDinosaur !== null) {
      // Extract the first value from the mya array
      const mya = foundDinosaur.mya[0];
  
      // Construct and return the dinosaur description
      return `${foundDinosaur.name} (${foundDinosaur.pronunciation})\n${foundDinosaur.info} It lived in the ${foundDinosaur.period} period, over ${mya} million years ago.`;
    }
  
    // Return a message indicating that the dinosaur with the specified ID cannot be found
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }
  
  
/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */

// Function to filter dinosaurs based on their existence in a specified time range (in millions of years ago)
// function getDinosaursAliveMya(dinosaurs, mya, key) {
//   // Use the filter function to select dinosaurs that existed during the specified time (mya)
//   return dinosaurs
//     .filter(dinosaur => {
//       // Destructure the mya array into startMya and endMya variables
//       const [startMya, endMya] = dinosaur.mya;

//       // Check if the mya array has only one element, indicating a single point in time
//       if (dinosaur.mya.length === 1) {
//         // Return true if the specified mya is equal to the startMya or one million year earlier
//         return mya === startMya || mya === startMya - 1;
//       } 
//       // Check if the mya array has two elements, indicating a time range
//       else if (dinosaur.mya.length === 2) {
//         // Return true if the specified mya is within the range of endMya to startMya
//         return mya >= endMya && mya <= startMya;
//       }

//       // If the mya array has neither one nor two elements, return false
//       return false;
//     })
//     // Use map to transform the result array, selecting a specific property (key) if provided
//     // or defaulting to the dinosaurId if key is not provided
//     .map(dinosaur => (key && dinosaur[key] !== undefined ? dinosaur[key] : dinosaur.dinosaurId));
// }

// Function to filter dinosaurs based on their existence in a specified time range (in millions of years ago)
function getDinosaursAliveMya(dinosaurs, mya, key) {
  const result = [];

  for (let i = 0; i < dinosaurs.length; i++) {
    const dinosaur = dinosaurs[i];
    const myaValues = dinosaur.mya;

    // Check if the mya array has only one element, indicating a single point in time
    if (myaValues.length === 1) {
      // Return true if the specified mya is equal to the startMya or one million year earlier
      if (mya === myaValues[0] || mya === myaValues[0] - 1) {
        result.push(key && dinosaur[key] !== undefined ? dinosaur[key] : dinosaur.dinosaurId);
      }
    }
    // Check if the mya array has two elements, indicating a time range
    else if (myaValues.length === 2) {
      // Return true if the specified mya is within the range of endMya to startMya
      if (mya >= myaValues[1] && mya <= myaValues[0]) {
        result.push(key && dinosaur[key] !== undefined ? dinosaur[key] : dinosaur.dinosaurId);
      }
    }
  }

  return result;
}


module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
