
import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import { bolts } from "../data/bolts";
import { clearWheels } from "../data/clear_wheels";
import { chromeWheels } from "../data/chrome_wheels";
import { crystalWheels} from "../data/crystal_wheels";
import { metalWheels } from "../data/metal_wheels";
import { phWheels } from "../data/phw_wheels";
import { weirdParts } from "../data/weird_parts";
import { tracks } from '../data/tracks';
import { tips } from '../data/tips';
import { cwmwCompat, trackTipCompat, wheelTrackCompat } from "../data/part_compat";

const fullyCompatibleWeirdParts = ['L-Drago Destructor', 'L-Drago Guardian'];
const incompatibleWeirdParts = ['Proto Nemesis'];

const allTopWheelOptions = [
    ...clearWheels,
    ...chromeWheels,
    ...crystalWheels,
    ...weirdParts,
    ...phWheels
];

const allSecondWheels = [...metalWheels, ...chromeWheels, ...crystalWheels];

const toOptions = (arr) => arr.map(name => ({ value: name, label: name }));

export default function ComboBuilder() {
    const [topWheel, setTopWheel] = useState(null);
    const [secondWheel, setSecondWheel] = useState(null);

    const [secondWheelOptions, setSecondWheelOptions] = useState(toOptions(allSecondWheels));
    const [topWheelOptions, setTopWheelOptions] = useState(toOptions(allTopWheelOptions));

    const [facebolt, setFacebolt] = useState(null);
    const [track, setTrack] = useState(null);
    const [tip, setTip] = useState(null);


    const buildCompatibleSecondWheels = (top) => {
        if (!top) return toOptions(allSecondWheels);
        const name = top.value;

        if (cwmwCompat[name]) {
            return toOptions(cwmwCompat[name]);
        }

        if (chromeWheels.includes(name)) {
            return toOptions([...chromeWheels, ...crystalWheels]);
        }

        if (crystalWheels.includes(name)) {
            return toOptions([...chromeWheels]);
        }

        if (clearWheels.includes(name)) {
            const invalidMetal = ['Gravity', 'Lightning', 'Meteo', 'Proto'];
            return toOptions(metalWheels.filter(w => !invalidMetal.includes(w)));
        }

        if (phWheels.includes(name) || weirdParts.includes(name)) {
            return [];
        }

        return toOptions(allSecondWheels);
    };

    const buildCompatibleTopWheels = (second) => {
        if (!second) return toOptions(allTopWheelOptions);
        const name = second.value;

        // Reverse mapping from exclusiveCompat
        const compatible = Object.entries(cwmwCompat)
            .filter(([, list]) => list.includes(name))
            .map(([key]) => key);

        if (compatible.length > 0) {
            return toOptions(compatible);
        }

        if (chromeWheels.includes(name)) {
            return toOptions([...chromeWheels, ...crystalWheels]);
        }

        if (crystalWheels.includes(name)) {
            return toOptions([...chromeWheels]);
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
            return toOptions(clearWheels.filter(w => !invalidClear.includes(w)));
        }

        return toOptions(allTopWheelOptions);
    };

    const getTrackOptions = () => {
        const baseOptions = tracks.map(name => ({ value: name, label: name }));

        if (topWheel?.value === 'Proto Nemesis') return [];

        let validTracks = null;

        if (secondWheel && wheelTrackCompat[secondWheel.value]) {
            validTracks = wheelTrackCompat[secondWheel.value];
        } else if (topWheel && wheelTrackCompat[topWheel.value]) {
            validTracks = wheelTrackCompat[topWheel.value];
        }

        if (validTracks) {
            return baseOptions.filter(track => validTracks.includes(track.value));
        }

        return baseOptions;
    };

    const getTipOptions = () => {
        const baseOptions = tips.map(name => ({ value: name, label: name }));

        if (topWheel?.value === 'Proto Nemesis') return [];

        if (track && trackTipCompat[track.value]) {
            const validTips = trackTipCompat[track.value];
            return baseOptions.filter(tip => validTips.includes(tip.value));
        }

        return baseOptions;
    };

    useEffect(() => {
        if (!topWheel) {
            setSecondWheelOptions(toOptions(allSecondWheels));
            return;
        }

        const options = buildCompatibleSecondWheels(topWheel);
        setSecondWheelOptions(options);

        // Auto-select if only one option (e.g. exclusive compat)
        if (options.length === 1) {
            setSecondWheel(options[0]);
        } else if (!options.find(o => secondWheel && o.value === secondWheel.value)) {
            setSecondWheel(null); // Clear if invalid
        }
    }, [topWheel]);

    useEffect(() => {
        if (!secondWheel) {
            setTopWheelOptions(toOptions(allTopWheelOptions));
        }

        const validTopOptions = buildCompatibleTopWheels(secondWheel);
        setTopWheelOptions(validTopOptions);

        // If the current top wheel is not valid, clear it
        if (topWheel && !validTopOptions.find(o => o.value === topWheel.value)) {
            setTopWheel(null);
        }

        // Optional: auto-select top if only one valid option
        if (!topWheel && validTopOptions.length === 1) {
            setTopWheel(validTopOptions[0]);
        }
    }, [secondWheel]);

    const getAccessoryOptions = (category) => {
        if (topWheel && incompatibleWeirdParts.includes(topWheel.value)) return [];
        return toOptions(category);
    };

    const clearAll = () => {
        setTopWheel(null);
        setSecondWheel(null);
        setFacebolt(null);
        setTrack(null);
        setTip(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Beyblade Combo Builder</h1>
            {/* Top Wheel */}
            <div className="flex items-center gap-2">
                <Dropdown
                    options={topWheelOptions}
                    value={topWheel}
                    onChange={setTopWheel}
                    placeholder="Select Top Wheel"
                />
                {topWheel && (
                    <button onClick={() => setTopWheel(null)} className="text-red-500 text-xl hover:text-red-700" title="Clear Top">
                        ✖
                    </button>
                )}
            </div>

            {/* Second Wheel */}
            <div className="flex items-center gap-2">
                <Dropdown
                    options={secondWheelOptions}
                    value={secondWheel}
                    onChange={setSecondWheel}
                    placeholder="Select Second Wheel"
                    isDisabled={secondWheelOptions.length === 0}
                />
                {secondWheel && (
                    <button onClick={() => setSecondWheel(null)} className="text-red-500 text-xl hover:text-red-700" title="Clear Second Wheel">
                        ✖
                    </button>
                )}
            </div>

            {/* Facebolt */}
            <div className="flex items-center gap-2">
                <Dropdown
                    options={getAccessoryOptions(bolts)}
                    value={facebolt}
                    onChange={setFacebolt}
                    placeholder="Select Facebolt"
                    isDisabled={getAccessoryOptions(bolts).length === 0}
                />
                {facebolt && (
                    <button onClick={() => setFacebolt(null)} className="text-red-500 text-xl hover:text-red-700" title="Clear Facebolt">
                        ✖
                    </button>
                )}
            </div>

            {/* Track */}
            <div className="flex items-center gap-2">
                <Dropdown
                    options={getTrackOptions()}
                    value={track}
                    onChange={setTrack}
                    placeholder="Select Track"
                    isDisabled={getTrackOptions().length === 0}
                />
                {track && (
                    <button onClick={() => setTrack(null)} className="text-red-500 text-xl hover:text-red-700" title="Clear Track">
                        ✖
                    </button>
                )}
            </div>

            {/* Tip */}
            <div className="flex items-center gap-2">
                <Dropdown
                    options={getTipOptions()}
                    value={tip}
                    onChange={setTip}
                    placeholder="Select Tip"
                    isDisabled={getTipOptions().length === 0}
                />
                {tip && (
                    <button onClick={() => setTip(null)} className="text-red-500 text-xl hover:text-red-700" title="Clear Tip">
                        ✖
                    </button>
                )}
            </div>


            <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-fit"
                >
                    Clear All
            </button>
        </div>
    );
}

