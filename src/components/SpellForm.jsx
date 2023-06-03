import { memo, useState, useEffect } from 'react';

const SpellTypeDropdown = memo(({ value, onSelectionChange }) => {

    return (
      <select name="type" value={value} onChange={onSelectionChange}>
        {[undefined, 'Arcane', 'Chaos', 'Fire', 'Force', 'Frost', 'Holy', 'Infernal', 'Lightning', 'Necrotic', 'Psychic', 'Sonic', 'Wild', 'Bless', 'Charmed', 'Potential'].map((spellType) => (
          <option key={spellType || 'default'} value={spellType}>{spellType}</option>
        ))}
      </select>
    );
});

export const SpellForm = (props) => {
    const [focus, setFocus] = useState(props?.spell?.focus || false);
    const [concentration, setConcentration] = useState(props?.spell?.concentration || false);
    const [name, setName] = useState(props?.spell?.name || '');
    const [baseLevel, setBaseLevel] = useState(props?.spell?.baseLevel || '');
    const [type, setType] = useState(props?.spell?.type || '');
    const [radius, setRadius] = useState(props?.spell?.radius || '');
    const [range, setRange] = useState(props?.spell?.range || '');
    const [duration, setDuration] = useState(props?.spell?.duration || '');
    const [targets, setTargets] = useState(props?.spell?.targets || '');
    const [effect, setEffect] = useState(props?.spell?.effect || '');
    const [flavorText, setFlavorText] = useState(props?.spell?.flavorText || '');
    const [id, setId] = useState(props?.spell?.id);

    useEffect(() => {
        setFocus(props?.spell?.focus || false);
        setConcentration(props?.spell?.concentration || false);
        setName(props?.spell?.name || '');
        setBaseLevel(props?.spell?.baseLevel || '');
        setType(props?.spell?.type || '');
        setRadius(props?.spell?.radius || '');
        setRange(props?.spell?.range || '');
        setDuration(props?.spell?.duration || '');
        setTargets(props?.spell?.targets || '');
        setEffect(props?.spell?.effect || '');
        setFlavorText(props?.spell?.flavorText || '');
        setId(props?.spell?.id);
    }, [props.spell]);

    const handleSubmit = (formEntry) => {
        formEntry.preventDefault();
        const updatedSpell = {
            id,
            name,
            baseLevel,
            type,
            modifier: getModifier(type),
            radius,
            range,
            focus,
            concentration,
            duration,
            targets,
            effect,
            flavorText
        }
        props.onSpellChanges(updatedSpell);
    };

    const getModifier = (type) => {
        switch(type) {
            case 'Arcane':
            case 'Psychic':
            case 'Potential':
                return 'Int';
            case 'Chaos':
            case 'Necrotic':
            case 'Bless':
                return 'Wis';
            case 'Holy':
            case 'Infernal':
            case 'Charmed':
                return 'Cha';
            case 'Fire':
            case 'Force':
                return 'Str';
            case 'Frost':
            case 'Wild':
                return 'Vit';
            case 'Sonic':
            case 'Lightning':
                return 'Dex';
            default:
                return '';
        }
    };

    return (<>
        <form onSubmit={handleSubmit}>
            <h1>Spell Details</h1>
            <label>Name:</label>
            <input type="text" name="name" key="name" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <label>Base Level:</label>
            <input type="text" name="baseLevel" key="baseLevel" value={baseLevel} onChange={(e) => {setBaseLevel(e.target.value)}}></input>
            <label>Type:</label>
            <SpellTypeDropdown key="type" value={type} onSelectionChange={(e) => {setType(e.target.value)}}/>
            <label key={type}>Modifier: {getModifier(type)}</label>
            <label>Radius (in ft.):</label>
            <input type="number" key="radius" name="radius" value={radius} onChange={(e) => {setRadius(e.target.value)}}></input>
            <label>Range (in ft.):</label>
            <input type="number" key="range" name="range" value={range} onChange={(e) => {setRange(e.target.value)}}></input>
            <div className="checkbox-container">
                <label>Concentration:</label>
                <input type="checkbox" name="concentration" key="concentration" value={concentration} checked={concentration} onChange={(e) => {setConcentration(e.target.checked)}}></input>
            </div>
            <div className="checkbox-container">
                <label>Focus:</label>
                <input type="checkbox" name="focus" key="focus" value={focus} checked={focus} onChange={(e) => {setFocus(e.target.checked)}}></input>
            </div>
            <label>Duration (in rounds):</label>
            <input type="number" name="duration" key="duration" value={duration} onChange={(e) => {setDuration(e.target.value)}}></input>
            <label>Targets:</label>
            <input type="number" name="targets" key="targets" value={targets} onChange={(e) => {setTargets(e.target.value)}}></input>
            <label>Effect:</label>
            <textarea rows="5" type="text" name="effect" key="effect" value={effect} onChange={(e) => {setEffect(e.target.value)}}></textarea>
            <label>Flavor Text:</label>
            <textarea rows="3" name="flavorText" key="flavorText" value={flavorText} onChange={(e) => {setFlavorText(e.target.value)}}></textarea>
            <button type="submit">Submit Spell</button>
        </form>
    </>);
};