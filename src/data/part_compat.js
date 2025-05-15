export const exclusiveCompat = {
    "Destroyer/Perseus (Defense)": ["Gravity"],
    "Destroyer/Perseus (Attack)": ["Gravity"],
    "Destroyer/Perseus (Stamina)": ["Gravity"],
    "L-Drago I": ["Lightning"],
    "L-Drago II": ["Meteo"],
    "L-Drago Rush": ["Meteo"],
    "L-Drago Assault": ["Meteo"],
    "Nemesis X": ["Proto"]
};

export const reverseCompat = {};
for (const [key, values] of Object.entries(exclusiveCompat)) {
    values.forEach(val => {
        if (!reverseCompat[val]) reverseCompat[val] = [];
        reverseCompat[val].push(key);
    });
}
