import { useState } from 'react';
import { SpellDetails } from './SpellDetails';
import { SpellForm } from './SpellForm';


export const SpellBook = () => {
    const [completedSpells, setCompletedSpells] = useState([{
        id: 1,
        name: 'Fireball',
        baseLevel: 1,
        type: 'Fire',
        modifier: 'Str',
        radius: 15,
        range: 50,
        focus: false,
        concentration: true,
        duration: 0,
        targets: undefined,
        effect: 'All characters at least partially inside the radius of the fireball gain 1 stack of Fire and must make a Strength Save against the caster. On a failed save, take 8d8 damage, half that amount on a successful save.',
        flavorText: 'You hurl a giant ball of fire at your enemies. The Kamehameha stance is optional.'
    }]);

    const [selectedSpell, setSelectedSpell] = useState();

    const handleNewSpell = () => {
        const highestCurrentId = completedSpells.reduce((accumulator, spell) => accumulator >= spell.id ? accumulator : spell.id, 0);
        const newSpell = {...selectedSpell, id: highestCurrentId + 1};
        const spells = [...completedSpells, newSpell];
        setCompletedSpells(spells);
    };

    const handleEditSpell = (spell) => {
        const spells = [...completedSpells];
        const index = spells.findIndex((completeSpell) => completeSpell.id === spell.id);
        if (index >= 0) {
            spells[index] = spell;
            setCompletedSpells(spells);
        }
    };

    const handleDeleteSpell = (spellId) => {
        const spells = [...completedSpells];
        const index = spells.findIndex((completeSpell) => completeSpell.id === spellId);
        if (index >= 0) {
            spells.splice(index, 1);
            setCompletedSpells(spells);
        }
    };

    return (
    <div className="main">
        <h1 className="application-title">Chronicler SpellBook 2.0</h1>
        <section className="spellbook">
            {completedSpells.map((spell) => {
                return <SpellDetails key={spell.id} selectSpell={() => setSelectedSpell(spell)} spell={spell} onDeleteSpell={handleDeleteSpell} />
            })}
        </section>
        <aside className="form-drawer">
            <SpellForm onSpellChanges={handleEditSpell} spell={selectedSpell} />
            <button onClick={handleNewSpell}>Create New Spell</button>
            <button onClick={() => setSelectedSpell()}>Clear Form</button>
        </aside>
    </div>);
};