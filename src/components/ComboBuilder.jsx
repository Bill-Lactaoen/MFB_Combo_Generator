
import React, { useState, useEffect } from "react";
import Dropdown from "src/components/Dropdown";

import { bolts } from "src/data/bolts";
import { clearWheels } from "src/data/clear_wheels";
import { chromeWheels } from "src/data/chrome_wheels";
import { crystalWheels} from "src/data/crystal_wheels";
import { metalWheels } from "src/data/metal_wheels";
import { phWheels } from "src/data/phw_wheels";
import { weirdParts } from "src/data/weird_parts";
import { tracks } from 'src/data/tracks';
import { tips } from '.srcdata/tips';
import { cwmwCompat, trackTipCompat, wheelTrackcompat } from "src/data/part_compat";

const fullyCompatibleWeirdParts = ['L-Drago Destructor', 'L-Drago Guardian'];
const incompatibleWeirdParts = ['Proto Nemesis'];

export default function ComboBuilder() {
    const [topWheel, setTopWheel] = useState(null);
    const [secondWheelOptions, setSecondWheelOptions] = useState([]);
    const [secondWheel, setSecondWheel] = useState(null);

    const [facebolt, setFacebolt] = useState(null);
    const [track, setTrack] = useState(null);
    const [tip, setTip] = useState(null);

    const topWheelOptions = [
        ...clearWheels,
        ...chromeWheels,
        ...crystalWheels,
        ...weirdParts,
        ...phWheels
    ].map(name => ({ value: name, label: name }));

    const buildSecondWheelOptions = (selected) => {
        if (!selected) return [];
        const name = selected.value;

        if (cwmwCompat[name]) {
            return cwmwCompat[name].map(w => ({ value: w, label: w }));
        }

        if (chromeWheels.includes(name)) {
            return [...chromeWheels, ...crystalWheels].map(w => ({ value: w, label: w }));
        }

        if (crystalWheels.includes(name)) {
            return chromeWheels.map(w => ({ value: w, label: w }));
        }

        if (clearWheels.includes(name)) {
            const invalidMetal = ['Gravity', 'Lightning', 'Meteo', 'Proto'];
            return metalWheels.filter(w => !invalidMetal.includes(w)).map(w => ({ value: w, label: w }));
        }

        if (metalWheels.includes(name)) {
            const invalidClear = [
                'Destroyer/Perseus(Defense)',
                'Destroyer/Perseus(Attack)',
                'Destroyer/Perseus(Stamina)',
                'L-Drago I',
                'L-Drago II',
                'L-Drago Rush',
                'L-Drago Assault',
                'Nemesis X',
            ];
            return clearWheels.filter(w => !invalidClear.includes(w)).map(w => ({ value: w, label: w }));
        }

        if (phWheels.includes(name) || weirdParts.includes(name)) {
            return []; // cannot have second wheel
        }

        return [];
    };

    useEffect(() => {
        setSecondWheel(null);
        setSecondWheelOptions(buildSecondWheelOptions(topWheel));
    }, [topWheel]);

    const getAccessoryOptions = (category) => {
        if (topWheel && incompatibleWeirdParts.includes(topWheel.value)) return [];
        return category.map(name => ({ value: name, label: name }));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Beyblade Combo Builder</h1>

            <div className="grid gap-4">
                <Select options={topWheelOptions} onChange={setTopWheel} placeholder="Select Top Wheel" />
                <Select options={secondWheelOptions} onChange={setSecondWheel} value={secondWheel} placeholder="Select Second Wheel" isDisabled={secondWheelOptions.length === 0} />
                <Select options={getAccessoryOptions(facebolts)} onChange={setFacebolt} value={facebolt} placeholder="Select Facebolt" isDisabled={getAccessoryOptions(facebolts).length === 0} />
                <Select options={getAccessoryOptions(tracks)} onChange={setTrack} value={track} placeholder="Select Track" isDisabled={getAccessoryOptions(tracks).length === 0} />
                <Select options={getAccessoryOptions(tips)} onChange={setTip} value={tip} placeholder="Select Tip" isDisabled={getAccessoryOptions(tips).length === 0} />
            </div>
        </div>
    );
};

export default ComboBuilder;
