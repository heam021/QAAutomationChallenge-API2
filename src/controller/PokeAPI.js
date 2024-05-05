// PokeAPI.js
const axios = require('axios');
const PokeBerry = require('../plain-object/PokeBerry');

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

module.exports = PokeAPI;
