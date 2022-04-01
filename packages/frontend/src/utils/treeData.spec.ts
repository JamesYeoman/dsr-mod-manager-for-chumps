import { describe, it, expect } from 'vitest';

import { unflattenFileData } from './treeData';

describe('unflattenFileData', () => {
  it('can produce correct Mock data', () => {
    const data = [
      { path: 'BABYMETAL/Babymetal', filename: '02 - Megitsune.mp3' },
      { path: 'BABYMETAL/Babymetal', filename: '03 - Gimme Chocolate!!.mp3' },
      {
        path: 'BABYMETAL/Metal Resistance',
        filename: '01 - Road of Resistance (feat. Herman Li & Sam Totman).mp3',
      },
      { path: 'BABYMETAL/Metal Resistance', filename: '02 - Karate.mp3' },
      { path: 'BAND-MAID/Brand New Maid', filename: '01 - the non-fiction days.mp3' },
      { path: 'BAND-MAID/Brand New Maid', filename: '03 - Order.mp3' },
      { path: 'BAND-MAID/World Domination', filename: '02 - Play.mp3' },
      { path: 'BAND-MAID/World Domination', filename: '14 - Dice.mp3' },
      {
        path: 'Cloudjumper/Bad Apple (feat. Un3h)',
        filename: '01 - Bad Apple (feat. Un3h).mp3',
      },
      {
        path: 'FalKKonE/Intense Symphonic Metal Covers, Vol. 18',
        filename: '12 - One Reason (From _Deadman Wonderland_).mp3',
      },
      {
        path: 'Various Artists/METAL GEAR RISING REVENGEANCE Vocal Tracks Selection',
        filename: '01 - Rules of Nature (Platinum Mix).mp3',
      },
      {
        path: 'Various Artists/METAL GEAR RISING REVENGEANCE Vocal Tracks Selection',
        filename: '11 - It Has To Be This Way (Platinum Mix).mp3',
      },
    ];
    const shouldBeProduced = [
      {
        key: 'Amazon Music/BABYMETAL',
        label: 'BABYMETAL',
        nodes: [
          {
            key: 'Amazon Music/BABYMETAL/Babymetal',
            label: 'Babymetal',
            nodes: [
              {
                key: 'Amazon Music/BABYMETAL/Babymetal/02 - Megitsune.mp3',
                label: '02 - Megitsune.mp3',
              },
              {
                key: 'Amazon Music/BABYMETAL/Babymetal/03 - Gimme Chocolate!!.mp3',
                label: '03 - Gimme Chocolate!!.mp3',
              },
            ],
          },
          {
            key: 'Amazon Music/BABYMETAL/Metal Resistance',
            label: 'Metal Resistance',
            nodes: [
              {
                key: 'Amazon Music/BABYMETAL/Metal Resistance/01 - Road of Resistance (feat. Herman Li & Sam Totman).mp3',
                label: '01 - Road of Resistance (feat. Herman Li & Sam Totman).mp3',
              },
              {
                key: 'Amazon Music/BABYMETAL/Metal Resistance/02 - Karate.mp3',
                label: '02 - Karate.mp3',
              },
            ],
          },
        ],
      },
      {
        key: 'Amazon Music/BAND-MAID',
        label: 'BAND-MAID',
        nodes: [
          {
            key: 'Amazon Music/BAND-MAID/Brand New Maid',
            label: 'Brand New Maid',
            nodes: [
              {
                key: 'Amazon Music/BAND-MAID/Brand New Maid/01 - the non-fiction days.mp3',
                label: '01 - the non-fiction days.mp3',
              },
              {
                key: 'Amazon Music/BAND-MAID/Brand New Maid/03 - Order.mp3',
                label: '03 - Order.mp3',
              },
            ],
          },
          {
            key: 'Amazon Music/BAND-MAID/World Domination',
            label: 'World Domination',
            nodes: [
              {
                key: 'Amazon Music/BAND-MAID/World Domination/02 - Play.mp3',
                label: '02 - Play.mp3',
              },
              {
                key: 'Amazon Music/BAND-MAID/World Domination/14 - Dice.mp3',
                label: '14 - Dice.mp3',
              },
            ],
          },
        ],
      },
      {
        key: 'Amazon Music/Cloudjumper',
        label: 'Cloudjumper',
        nodes: [
          {
            key: 'Amazon Music/Cloudjumper/Bad Apple (feat. Un3h)',
            label: 'Bad Apple (feat. Un3h)',
            nodes: [
              {
                key: 'Amazon Music/Cloudjumper/Bad Apple (feat. Un3h)/01 - Bad Apple (feat. Un3h).mp3',
                label: '01 - Bad Apple (feat. Un3h).mp3',
              },
            ],
          },
        ],
      },
      {
        key: 'Amazon Music/FalKKonE',
        label: 'FalKKonE',
        nodes: [
          {
            key: 'Amazon Music/FalKKonE/Intense Symphonic Metal Covers, Vol. 18',
            label: 'Intense Symphonic Metal Covers, Vol. 18',
            nodes: [
              {
                key: 'Amazon Music/FalKKonE/Intense Symphonic Metal Covers, Vol. 18/12 - One Reason (From _Deadman Wonderland_).mp3',
                label: '12 - One Reason (From _Deadman Wonderland_).mp3',
              },
            ],
          },
        ],
      },
      {
        key: 'Amazon Music/Various Artists',
        label: 'Various Artists',
        nodes: [
          {
            key: 'Amazon Music/Various Artists/METAL GEAR RISING REVENGEANCE Vocal Tracks Selection',
            label: 'METAL GEAR RISING REVENGEANCE Vocal Tracks Selection',
            nodes: [
              {
                key: 'Amazon Music/Various Artists/METAL GEAR RISING REVENGEANCE Vocal Tracks Selection/01 - Rules of Nature (Platinum Mix).mp3',
                label: '01 - Rules of Nature (Platinum Mix).mp3',
              },
              {
                key: 'Amazon Music/Various Artists/METAL GEAR RISING REVENGEANCE Vocal Tracks Selection/11 - It Has To Be This Way (Platinum Mix).mp3',
                label: '11 - It Has To Be This Way (Platinum Mix).mp3',
              },
            ],
          },
        ],
      },
    ];

    expect(unflattenFileData(data, 'Amazon Music')).toEqual(shouldBeProduced);
  });
});
