import React from 'react';
import Dropdown from './components/Dropdown';

import { bolts } from "./data/bolts";
import { clearWheels} from "./data/clear_wheels";
import { chromeWheels } from "./data/chrome_wheels";
import { crystalWheels} from "./data/crystal_wheels";
import { metalWheels } from "./data/metal_wheels";
import {phWheels} from "./data/phw_wheels";
import {weirdParts} from "./data/weird_parts";
import { tracks } from './data/tracks';
import { performanceTips } from './data/tips';

function App() {
    return (
        <div>
            <h1>Beyblade Combo Builder</h1>
            <Dropdown label="Face Bolt" id="face-select" options={faceBolts} />
            <Dropdown label="Top Wheel" id="top-select" options={topWheels} />
            <Dropdown label="Bottom Wheel" id="bottom-select" options={bottomWheels} />
            <Dropdown label="Track" id="track-select" options={tracks} />
            <Dropdown label="Performance Tip" id="tip-select" options={performanceTips} />
        </div>
    );
}

export default App;
