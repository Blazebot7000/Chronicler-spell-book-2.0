import * as React from 'react';

export const SpellDetails = (props) => {

    return (
        <div className="spell-card" onClick={props.selectSpell}>
            <button onClick={(e) => {props.onDeleteSpell(props.spell.id)}}>X</button>
            <h1>{props.spell.name}</h1>
            <label>Base Level: {props.spell.baseLevel}</label>
            <label>Type: {props.spell.type}</label>
            <label>Modifier: {props.spell.modifier}</label>
            <label>Radius (in ft.): {props.spell.radius}</label>
            <label>Range (in ft.): {props.spell.range}</label>
            <label>Concentration: {props.spell.concentration?.toString()}</label>
            <label>Focus: {props.spell.focus?.toString()}</label>
            <label>Duration (in rounds): {props.spell.duration}</label>
            <label>Targets: {props.spell.targets}</label>
            <label>Effect: {props.spell.effect}</label>
            <label>Flavor Text: {props.spell.flavorText}</label>
        </div>
    );
};