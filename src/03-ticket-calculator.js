/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const tickets = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */

function calculateTicketPrice(tickets, ticketInfo) {
  const { ticketType, entrantType, extras } = ticketInfo;

  // Check if the ticket type is valid and not "extras"
  if (!(ticketType in tickets) || ticketType === "extras") {
    return `Ticket type '${ticketType}' cannot be found.`;
  }

  // Check if the entrant type is valid for the specified ticket type
  if (!(entrantType in tickets[ticketType].priceInCents)) {
    return `Entrant type '${entrantType}' cannot be found.`;
  }

  // Check if all extras are valid
  if (extras.some((extra) => !tickets.extras[extra])) {
    return `Extra type '${extras.find(
      (extra) => !tickets.extras[extra],
    )}' cannot be found.`;
  }

  // Calculate the total price including base price and extras
  const basePrice = tickets[ticketType].priceInCents[entrantType];
  const extrasPrice = extras.reduce(
    (total, extra) => total + tickets.extras[extra].priceInCents[entrantType],
    0,
  );

  return basePrice + extrasPrice;
}

// function calculateTicketPrice(tickets, ticketInfo) {
//   const { ticketType, entrantType, extras } = ticketInfo;

//   // Check if the ticket type is valid and not "extras"
//   if (!(ticketType in tickets) || ticketType === "extras") {
//     return `Ticket type '${ticketType}' cannot be found.`;
//   }

//   // Check if the entrant type is valid for the specified ticket type
//   if (!(entrantType in tickets[ticketType].priceInCents)) {
//     return `Entrant type '${entrantType}' cannot be found.`;
//   }

//   // Loop through extras to check validity and calculate extrasPrice
//   let extrasPrice = 0;
//   for (let i = 0; i < extras.length; i++) {
//     const extra = extras[i];

//     // Check if the extra is valid
//     if (!tickets.extras[extra]) {
//       return `Extra type '${extra}' cannot be found.`;
//     }

//     // Calculate extrasPrice
//     extrasPrice += tickets.extras[extra].priceInCents[entrantType];
//   }

//   // Calculate the total price including base price and extras
//   const basePrice = tickets[ticketType].priceInCents[entrantType];

//   return basePrice + extrasPrice;
// }


const ticketInfo1 = {
  ticketType: "general",
  entrantType: "adult",
  extras: [],
};
console.log(calculateTicketPrice(tickets, ticketInfo1));

const ticketInfo2 = {
  ticketType: "membership",
  entrantType: "child",
  extras: ["movie"],
};
console.log(calculateTicketPrice(tickets, ticketInfo2));

const ticketInfo3 = {
  ticketType: "general",
  entrantType: "kid", // Incorrect
  extras: ["movie"],
};
console.log(calculateTicketPrice(tickets, ticketInfo3));

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */

function purchaseTickets(ticketData, purchases) {
  let total = 0;
  let receipt =
    "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n";

  // Loop through each purchase to calculate total price and generate receipt lines
  for (const purchase of purchases) {
    const priceInCents = calculateTicketPrice(tickets, purchase);

    // Check for errors in ticket price calculation
    if (typeof priceInCents === "string") {
      return priceInCents;
    }

    total += priceInCents;
    receipt += getReceiptLine(ticketData, purchase, priceInCents);
  }

  // Generate the final receipt with total price
  return `${receipt}-------------------------------------------
TOTAL: $${(total / 100).toFixed(2)}`;
}

//used helper function to print receipts
function getReceiptLine(ticketData, purchase, priceInCents) {
  const { entrantType, ticketType, extras } = purchase;
  const entrant = entrantType[0].toUpperCase() + entrantType.slice(1);
  const ticketTypeDescription = ticketData[ticketType].description;
  const price = (priceInCents / 100).toFixed(2);
  let line = `${entrant} ${ticketTypeDescription}: $${price}`;

  // Add extras to the line if there are any
  if (extras.length > 0) {
    line +=
      " (" +
      extras.map((extra) => ticketData.extras[extra].description).join(", ") +
      ")";
  }

  return `${line}\n`;
}

const purchases1 = [
  {
    ticketType: "general",
    entrantType: "adult",
    extras: ["movie", "terrace"],
  },
  {
    ticketType: "general",
    entrantType: "senior",
    extras: ["terrace"],
  },
  {
    ticketType: "general",
    entrantType: "child",
    extras: ["education", "movie", "terrace"],
  },
  {
    ticketType: "general",
    entrantType: "child",
    extras: ["education", "movie", "terrace"],
  },
];
console.log(purchaseTickets(tickets, purchases1));

const purchases2 = [
  {
    ticketType: "discount", // Incorrect
    entrantType: "adult",
    extras: ["movie", "terrace"],
  }
]
console.log(purchaseTickets(tickets, purchases2));

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
