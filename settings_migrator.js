"use strict"

const DefaultSettings = {
  "enabled": true,
  "presets": {
    0: { // Warrior
      20: true // Deadly Gamble
    },
    1: { // Lancer
      17: true // Adrenaline Rush
    },
    3: { // Berserker
      21: true // Bloodlust
    },
    4: { // Sorcerer
      34: true // Mana Boost
    },
    5: { // Archer
      35: true // Windsong
    },
    11: { // Ninja
      23: true // Inner Harmony
    },
    12: { // Valkyrie
      12: true // Ragnarok
    }
  },
  "excludeZones": [9713]
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
  if (from_ver === undefined) {
    // Migrate legacy config file
    return DefaultSettings;
  } else if (from_ver === null) {
    // No config file exists, use default settings
    return DefaultSettings;
  } else {
    // Migrate from older version (using the new system) to latest one
    if (from_ver + 1 < to_ver) {
      // Recursively upgrade in one-version steps
      settings = MigrateSettings(from_ver, from_ver + 1, settings);
      return MigrateSettings(from_ver + 1, to_ver, settings);
    }

    switch (to_ver)
    {
    }

    return settings;
  }
}
