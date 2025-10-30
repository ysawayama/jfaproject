import { Formation } from './formation-types';

// フォーメーション座標定義
// x: 横方向（0=左端、100=右端）
// y: 縦方向（0=上端（相手ゴール側）、100=下端（自陣ゴール側））

export const formations: Record<string, Formation> = {
  '4-3-3': {
    name: '4-3-3',
    displayName: 'Formation 4-3-3',
    positions: [
      // GK
      { position: 'GK', x: 50, y: 92 },
      // Defenders (4)
      { position: 'LB', x: 15, y: 75 },
      { position: 'LCB', x: 35, y: 78 },
      { position: 'RCB', x: 65, y: 78 },
      { position: 'RB', x: 85, y: 75 },
      // Midfielders (3)
      { position: 'LCM', x: 30, y: 50 },
      { position: 'CM', x: 50, y: 55 },
      { position: 'RCM', x: 70, y: 50 },
      // Forwards (3)
      { position: 'LW', x: 20, y: 25 },
      { position: 'ST', x: 50, y: 20 },
      { position: 'RW', x: 80, y: 25 },
    ],
  },
  '4-4-2': {
    name: '4-4-2',
    displayName: 'Formation 4-4-2',
    positions: [
      // GK
      { position: 'GK', x: 50, y: 92 },
      // Defenders (4)
      { position: 'LB', x: 15, y: 75 },
      { position: 'LCB', x: 35, y: 78 },
      { position: 'RCB', x: 65, y: 78 },
      { position: 'RB', x: 85, y: 75 },
      // Midfielders (4)
      { position: 'LM', x: 20, y: 50 },
      { position: 'LCM', x: 40, y: 55 },
      { position: 'RCM', x: 60, y: 55 },
      { position: 'RM', x: 80, y: 50 },
      // Forwards (2)
      { position: 'LF', x: 40, y: 22 },
      { position: 'RF', x: 60, y: 22 },
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    displayName: 'Formation 4-2-3-1',
    positions: [
      // GK
      { position: 'GK', x: 50, y: 92 },
      // Defenders (4)
      { position: 'LB', x: 15, y: 75 },
      { position: 'LCB', x: 35, y: 78 },
      { position: 'RCB', x: 65, y: 78 },
      { position: 'RB', x: 85, y: 75 },
      // Defensive Midfielders (2)
      { position: 'LDM', x: 40, y: 60 },
      { position: 'RDM', x: 60, y: 60 },
      // Attacking Midfielders (3)
      { position: 'LAM', x: 25, y: 40 },
      { position: 'CAM', x: 50, y: 42 },
      { position: 'RAM', x: 75, y: 40 },
      // Forward (1)
      { position: 'ST', x: 50, y: 20 },
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    displayName: 'Formation 3-5-2',
    positions: [
      // GK
      { position: 'GK', x: 50, y: 92 },
      // Defenders (3)
      { position: 'LCB', x: 25, y: 78 },
      { position: 'CB', x: 50, y: 80 },
      { position: 'RCB', x: 75, y: 78 },
      // Midfielders (5)
      { position: 'LWB', x: 10, y: 60 },
      { position: 'LCM', x: 35, y: 50 },
      { position: 'CM', x: 50, y: 52 },
      { position: 'RCM', x: 65, y: 50 },
      { position: 'RWB', x: 90, y: 60 },
      // Forwards (2)
      { position: 'LF', x: 40, y: 22 },
      { position: 'RF', x: 60, y: 22 },
    ],
  },
  '3-4-3': {
    name: '3-4-3',
    displayName: 'Formation 3-4-3',
    positions: [
      // GK
      { position: 'GK', x: 50, y: 92 },
      // Defenders (3)
      { position: 'LCB', x: 25, y: 78 },
      { position: 'CB', x: 50, y: 80 },
      { position: 'RCB', x: 75, y: 78 },
      // Midfielders (4)
      { position: 'LM', x: 20, y: 52 },
      { position: 'LCM', x: 40, y: 55 },
      { position: 'RCM', x: 60, y: 55 },
      { position: 'RM', x: 80, y: 52 },
      // Forwards (3)
      { position: 'LW', x: 20, y: 25 },
      { position: 'ST', x: 50, y: 20 },
      { position: 'RW', x: 80, y: 25 },
    ],
  },
  '5-3-2': {
    name: '5-3-2',
    displayName: 'Formation 5-3-2',
    positions: [
      // GK
      { position: 'GK', x: 50, y: 92 },
      // Defenders (5)
      { position: 'LWB', x: 10, y: 72 },
      { position: 'LCB', x: 30, y: 78 },
      { position: 'CB', x: 50, y: 80 },
      { position: 'RCB', x: 70, y: 78 },
      { position: 'RWB', x: 90, y: 72 },
      // Midfielders (3)
      { position: 'LCM', x: 35, y: 50 },
      { position: 'CM', x: 50, y: 52 },
      { position: 'RCM', x: 65, y: 50 },
      // Forwards (2)
      { position: 'LF', x: 40, y: 22 },
      { position: 'RF', x: 60, y: 22 },
    ],
  },
};

export const getFormation = (formationName: string): Formation => {
  return formations[formationName] || formations['4-3-3'];
};

export const getFormationNames = (): string[] => {
  return Object.keys(formations);
};
