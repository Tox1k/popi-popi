const axios = require('axios')
const utf8 = require('utf8')

class Api {
  constructor (config) {
    // eslint-disable-next-line camelcase
    const {
      api_key
    } = config
    this.api = axios.create({
      // change this based on region
      baseURL: 'https://euw1.api.riotgames.com/lol/',
      params: {
        api_key
      }
    })
  }

  async getUser (username) {
    return (await this.api.get(utf8.encode(`/summoner/v4/summoners/by-name/${username}`))).data
  }

  async getId (username) {
    return (await this.getUser(username)).id
  }

  async getTier (username) {
    const {
      data
    } = await this.api.get(utf8.encode(`/league/v4/positions/by-summoner/${await this.getId(username)}`))
    if (!data.length) return 'UNRANKED'
    return data[0].tier
  }

  async getVersion (field) {
    const {
      data: {
        n
      }
    } = await axios.get(utf8.encode('https://ddragon.leagueoflegends.com/realms/euw.json'))
    return n[field]
  }

  async getChampion (id) {
    const {
      data: {
        data
      }
    } = await axios.get(utf8.encode(`https://ddragon.leagueoflegends.com/cdn/${await this.getVersion('champion')}/data/en_US/champion.json`))

    for (let [key, value] of Object.entries(data)) {
      if (value.key === id) {
        return value.name
      }
      // console.log(`${key}: ${value.key}`);
    }
    // console.log(ciao)
    return 'undefined'
  }
  async getChampionMasteries (username) {
    const {
      data
    } = await this.api.get(utf8.encode(`/champion-mastery/v4/champion-masteries/by-summoner/${await this.getId(username)}`))
    return data.slice(0, 3)
  }
}

module.exports = config => new Api(config)
