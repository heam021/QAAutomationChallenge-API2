// PokeAPI.spec.js
const assert = require('assert');
const PokeAPI = require('../controller/PokeAPI');
const PokeBerry = require('../plain-object/PokeBerry');

describe('PokeAPI', function () {
    const pokeAPI = new PokeAPI('https://pokeapi.co/api/v2');

    it('should retrieve a list of all Poke Berries', async function () {
        const berries = await pokeAPI.getAllBerries();

        // Verify that at least one berry has been found.
        assert.ok(berries.length > 0, 'No se encontraron berries');
        console.log('Number of berries found:', berries.length);

        // Print the berry arrangement
        console.log('Array of berrys:', berries);

        console.log("=======================");

        // Print the name and URL of each berry
        berries.forEach((berry, index) => {
            console.log(`Berry ${index + 1}: Name - ${berry.name}, URL - ${berry.url}`);
        });

        // Generate POJO scheme from a berry
        const berrySchema = new PokeBerry('string', 'string');

        // Validate each berry against the POJO scheme
        berries.forEach((berry, index) => {
            assert.strictEqual(typeof berry.name, typeof berrySchema.name, `Berry name data type ${index + 1} not match`);
            assert.strictEqual(typeof berry.url, typeof berrySchema.url, `Berry URL data type ${index + 1} not match`);
        });
    });
});
