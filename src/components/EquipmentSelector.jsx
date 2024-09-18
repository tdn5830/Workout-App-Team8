import React, { useState } from 'react';
import equipmentData from '../local_assets/equipment.json'; // Directly import the JSON data
import './EquipmentSelector.css'; // Import your CSS for styling

function EquipmentSelector({ onNext }) {
  const [selectedEquipment, setSelectedEquipment] = useState(["body"]); // Array of selected equipment
  const [showMachine, setShowMachine] = useState(false); // Toggle machine dropdown
  const [showFreeweights, setShowFreeweights] = useState(false); // Toggle freeweights dropdown
  const [showMisc, setShowMisc] = useState(false); // Toggle Misc dropdown

  // Handle selecting/deselecting by equipment name
  const handleSelect = (name) => {
    if (selectedEquipment.includes(name)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== name)); // Deselect
    } else {
      setSelectedEquipment([...selectedEquipment, name]); // Select
    }
  };

  // Passes selected equipment array into WorkoutGenerator 
  const handleSubmit  = () => {
    onNext({ equipment: selectedEquipment });
  }

  return (
    <div>
      <h1>Select Your Equipment</h1>

      {/* Machine Dropdown */}
      <div className="dropdown">
        <button onClick={() => setShowMachine(!showMachine)}>Machines</button>
        {showMachine && (
          <ul>
            {equipmentData.machine.map((equipment, index) => (
              <li
                key={index}
                className={`equipment-item ${selectedEquipment.includes(equipment.name) ? 'selected' : ''}`}
                onClick={() => handleSelect(equipment.name)}
              >
                <img src={equipment.icon} alt={equipment.name} className="equipment-icon" />
                {equipment.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Freeweights Dropdown */}
      <div className="dropdown">
        <button onClick={() => setShowFreeweights(!showFreeweights)}>Freeweights</button>
        {showFreeweights && (
          <ul>
            {equipmentData.freeweights.map((equipment, index) => (
              <li
                key={index}
                className={`equipment-item ${selectedEquipment.includes(equipment.name) ? 'selected' : ''}`}
                onClick={() => handleSelect(equipment.name)}
              >
                <img src={equipment.icon} alt={equipment.name} className="equipment-icon" />
                {equipment.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Misc equipment Dropdown */}
      <div className="dropdown">
        <button onClick={() => setShowMisc(!showMisc)}>Misc</button>
        {showMisc && (
          <ul>
            {equipmentData.misc.map((equipment, index) => (
              <li
                key={index}
                className={`equipment-item ${selectedEquipment.includes(equipment.name) ? 'selected' : ''}`}
                onClick={() => handleSelect(equipment.name)}
              >
                <img src={equipment.icon} alt={equipment.name} className="equipment-icon" />
                {equipment.name}
              </li>
            ))}
          </ul>
        )}
      </div>

    <button onClick = {() => handleSubmit()}className='submit-button'>Submit</button>
    </div>
  );
}

export default EquipmentSelector;
