
import React, { useState, useEffect } from "react";
import Dropdown from ".src/components/Dropdown";

import { bolts } from "./data/bolts";
import { clearWheels} from "./data/clear_wheels";
import { chromeWheels } from "./data/chrome_wheels";
import { crystalWheels} from "./data/crystal_wheels";
import { metalWheels } from "./data/metal_wheels";
import {phWheels} from "./data/phw_wheels";
import {weirdParts} from "./data/weird_parts";
import { tracks } from './data/tracks';
import { tips } from './data/tips';
import { exclusiveCompat, reverseCompat } from "../data/part_compat";

const boltOptions = bolts.map(bolt => ({ value: bolt, label: bolt }));
const topOptions = [
    clearWheels, chromeWheels, crystalWheels, phWheels, weirdParts].map(name => ({ value: name, label: name }));
const bottomOptions = [metalWheels, chromeWheels, crystalWheels].map(name => ({ value: name, label: name }));
const trackOptions = tracks.map(track => ({ value: track, label: track }));
const tipOptions = tips.map(tip => ({ value: tip, label: tip }));

export default function ComboBuilder() {
    const [bolt, setBolt] = useState(null);
    const [topWheel, setTopWheel] = useState(null);
    const [bottomWheel, setBottomWheel] = useState(null);
    const [disableTop, setDisableTop] = useState(false);
    const [disableBottom, setDisableBottom] = useState(false);
    const [track, setTrack] = useState(null);
    const [tip, setTip] = useState(null);

    useEffect(() => {
        if (topWheel) {
            const compat = exclusiveCompat[clear.value];
            if (compat?.length === 1) {
                const autoMetal = metalOptions.find(m => m.value === compat[0]);
                setMetal(autoMetal || null);
                setDisableMetal(true);
            } else {
                setDisableMetal(false);
            }
        } else {
            setDisableMetal(false);
        }
    }, [clear]);

    useEffect(() => {
        if (bottomWheel) {
            const compat = reverseCompat[metal.value];
            if (compat?.length === 1) {
                const autoClear = clearOptions.find(c => c.value === compat[0]);
                setClear(autoClear || null);
                setDisableClear(true);
            } else {
                setDisableClear(false);
            }
        } else {
            setDisableClear(false);
        }
    }, [metal]);

    const getCompatibleMetals = () => {
        if (!topWheel) return bottomOptions;
        const compat = exclusiveCompat[top.value];
        return compat ? metalOptions.filter(m => compat.includes(m.value)) : metalOptions;
    };

    const getCompatibleClears = () => {
        if (!bottomWheel) return topOptions;
        const compat = reverseCompat[metal.value];
        return compat ? clearOptions.filter(c => compat.includes(c.value)) : clearOptions;
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>Clear Wheel</h2>
            <Select
                options={getCompatibleClears()}
                value={clear}
                onChange={setClear}
                isDisabled={disableClear}
                isSearchable
                placeholder={disableClear ? "Auto-selected by metal wheel" : "Choose a Clear Wheel"}
            />

            <h2>Metal Wheel</h2>
            <Select
                options={getCompatibleMetals()}
                value={metal}
                onChange={setMetal}
                isDisabled={disableMetal}
                isSearchable
                placeholder={disableMetal ? "Auto-selected by clear wheel" : "Choose a Metal Wheel"}
            />
        </div>
    );
}
