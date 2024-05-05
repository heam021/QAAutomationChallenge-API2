const axios = require('axios');
const assert = require('assert');

class PokeBerry {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}

class PokeAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getAllBerries() {
        try {
            const response = await axios.get(`${this.baseUrl}/berry`);
            const berries = response.data.results.map(result => new PokeBerry(result.name, result.url));
            return berries;
        } catch (error) {
            throw new Error(`Failed to fetch berries: ${error.message}`);
        }
    }
}

describe('PokeAPI', function () {
    const pokeAPI = new PokeAPI('https://pokeapi.co/api/v2');

    it('should retrieve a list of all Poke Berries', async function () {
        const berries = await pokeAPI.getAllBerries();

        // Verify that at least one berry has been found
        assert.ok(berries.length > 0, 'No se encontraron berries');
        console.log('Número de berries encontradas:', berries.length);

        // Print the berry array
        console.log('Arreglo de bayas:', berries);

        console.log("=======================");

        // Print the name and URL of each berry
        berries.forEach((berry, index) => {
            console.log(`Berry ${index + 1}: Name - ${berry.name}, URL - ${berry.url}`);
        });

        // Generate the POJO schema from a berry
        const berrySchema = new PokeBerry('string', 'string');

        // Validate each berry against the POJO scheme
        berries.forEach((berry, index) => {
            assert.strictEqual(typeof berry.name, typeof berrySchema.name, `Tipo de dato de nombre de baya ${index + 1} no coincide`);
            assert.strictEqual(typeof berry.url, typeof berrySchema.url, `Tipo de dato de URL de baya ${index + 1} no coincide`);
        });
    });
});
