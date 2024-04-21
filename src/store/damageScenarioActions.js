export const ADD_DAMAGE_SCENARIO = 'ADD_DAMAGE_SCENARIO';
export const EDIT_DAMAGE_SCENARIO = 'EDIT_DAMAGE_SCENARIO';
export const DELETE_DAMAGE_SCENARIO = 'DELETE_DAMAGE_SCENARIO';
export const LINK_DAMAGE_SCENARIO_TO_ASSET_AND_THREAT = 'LINK_DAMAGE_SCENARIO_TO_ASSET_AND_THREAT';

export const addDamageScenario = (damageScenarioData) => {
  console.log(`Adding damage scenario: ${JSON.stringify(damageScenarioData)}`);
  return {
    type: ADD_DAMAGE_SCENARIO,
    payload: damageScenarioData,
  };
};

export const editDamageScenario = (id, damageScenarioData) => {
  console.log(`Editing damage scenario with ID ${id}: ${JSON.stringify(damageScenarioData)}`);
  return {
    type: EDIT_DAMAGE_SCENARIO,
    payload: { id, ...damageScenarioData },
  };
};

export const deleteDamageScenario = (id) => {
  console.log(`Deleting damage scenario with ID ${id}`);
  return {
    type: DELETE_DAMAGE_SCENARIO,
    payload: id,
  };
};

export const linkDamageScenarioToAssetAndThreat = (id, assetId, threatId) => {
  console.log(`Linking damage scenario with ID ${id} to asset ID ${assetId} and threat ID ${threatId}`);
  return {
    type: LINK_DAMAGE_SCENARIO_TO_ASSET_AND_THREAT,
    payload: { id, assetId, threatId },
  };
};