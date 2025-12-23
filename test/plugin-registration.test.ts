import { createApp } from 'vue';
import VueBoutique, { VBButton } from '../index';

describe('VueBoutique plugin registration', () => {
  it('registers VB, B, and kebab-case aliases', () => {
    const app = createApp({});

    app.use(VueBoutique);

    expect(app.component('VBButton')).toBe(VBButton);
    expect(app.component('BButton')).toBe(VBButton);
    expect(app.component('b-button')).toBe(VBButton);
  });
});
