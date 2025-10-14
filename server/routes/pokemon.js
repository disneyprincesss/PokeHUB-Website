import express from 'express';
import { getNickname, getNicknamesForIds, setNickname, deleteNickname } from '../db.js';
const router = express.Router();

// Mock Pokemon data - in a real app, this would come from a database
const pokemonData = [
  {
    id: 1,
    name: 'bulbasaur',
    type: ['grass', 'poison'],
    hp: 45,
    attack: 49,
    defense: 49,
    speed: 45,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  {
    id: 2,
    name: 'ivysaur',
    type: ['grass', 'poison'],
    hp: 60,
    attack: 62,
    defense: 63,
    speed: 60,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
  },
  {
    id: 3,
    name: 'venusaur',
    type: ['grass', 'poison'],
    hp: 80,
    attack: 82,
    defense: 83,
    speed: 80,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
  },
  {
    id: 4,
    name: 'charmander',
    type: ['fire'],
    hp: 39,
    attack: 52,
    defense: 43,
    speed: 65,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  },
  {
    id: 5,
    name: 'charmeleon',
    type: ['fire'],
    hp: 58,
    attack: 64,
    defense: 58,
    speed: 80,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'
  },
  {
    id: 6,
    name: 'charizard',
    type: ['fire', 'flying'],
    hp: 78,
    attack: 84,
    defense: 78,
    speed: 100,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
  }
];

// GET /api/pokemon - Get all Pokemon
router.get('/', (req, res) => {
  try {
    const { type, limit = 20, offset = 0 } = req.query;
    
    let filteredPokemon = pokemonData;
    
    // Filter by type if specified
    if (type) {
      filteredPokemon = pokemonData.filter(pokemon => 
        pokemon.type.some(t => t.toLowerCase() === type.toLowerCase())
      );
    }
    
    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);

    // Attach nicknames from DB if present
    const ids = paginatedPokemon.map(p => p.id);
    const idToNickname = getNicknamesForIds(ids);
    const withNicknames = paginatedPokemon.map(p => ({ ...p, nickname: idToNickname.get(p.id) || null }));

    res.json({
      data: withNicknames,
      total: filteredPokemon.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
});

// GET /api/pokemon/:id - Get Pokemon by ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pokemon = pokemonData.find(p => p.id === id);
    
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    
    const nickname = getNickname(id);
    res.json({ data: { ...pokemon, nickname: nickname || null } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
});

// GET /api/pokemon/search/:name - Search Pokemon by name
router.get('/search/:name', (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const pokemon = pokemonData.filter(p => 
      p.name.toLowerCase().includes(name)
    );
    
    res.json({ data: pokemon });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search Pokemon' });
  }
});

// POST /api/pokemon - Create new Pokemon (for future use)
router.post('/', (req, res) => {
  try {
    const { name, type, hp, attack, defense, speed, image } = req.body;
    
    // Basic validation
    if (!name || !type || !Array.isArray(type)) {
      return res.status(400).json({ error: 'Invalid Pokemon data' });
    }
    
    const newPokemon = {
      id: pokemonData.length + 1,
      name: name.toLowerCase(),
      type,
      hp: hp || 50,
      attack: attack || 50,
      defense: defense || 50,
      speed: speed || 50,
      image: image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
    };
    
    pokemonData.push(newPokemon);
    
    res.status(201).json({ data: newPokemon });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Pokemon' });
  }
});

// GET /api/pokemon/:id/nickname - Get nickname for a Pokemon
router.get('/:id/nickname', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid Pokemon ID' });
    }
    const nickname = getNickname(id) || null;
    res.json({ data: { pokemonId: id, nickname } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get nickname' });
  }
});

// PUT /api/pokemon/:id/nickname - Set or update nickname
router.put('/:id/nickname', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nickname } = req.body;
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid Pokemon ID' });
    }
    
    if (typeof nickname !== 'string') {
      return res.status(400).json({ error: 'Nickname must be a string' });
    }
    
    const trimmed = nickname.trim();
    if (trimmed.length > 40) {
      return res.status(400).json({ error: 'Nickname must be 40 characters or fewer' });
    }
    
    setNickname(id, trimmed);
    res.json({ data: { pokemonId: id, nickname: trimmed } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set nickname' });
  }
});

// DELETE /api/pokemon/:id/nickname - Remove nickname
router.delete('/:id/nickname', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid Pokemon ID' });
    }
    
    deleteNickname(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete nickname' });
  }
});

export default router;
