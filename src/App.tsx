import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import TitleScreen from './screens/TitleScreen'
import BattleScreen from './screens/BattleScreen'

export default function App() {
    return (
        <BrowserRouter basename='arcane-awakening'>
            <Routes>
                <Route path="/" element={<TitleScreen />} />
                <Route path="/battle" element={<BattleScreen />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}