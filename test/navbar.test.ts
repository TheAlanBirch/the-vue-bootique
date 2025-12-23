import { mount } from '@vue/test-utils';
import BNavbar from '../components/navigation/BNavbar.vue';

describe('BNavbar', () => {
  it('toggles collapse visibility', async () => {
    const wrapper = mount(BNavbar, {
      props: { brand: 'Brand' },
      slots: {
        default: '<ul class="navbar-nav"><li class="nav-item">Home</li></ul>',
      },
    });

    const collapse = wrapper.get('.navbar-collapse');
    expect(collapse.classes()).not.toContain('show');

    await wrapper.get('button.navbar-toggler').trigger('click');
    expect(collapse.classes()).toContain('show');
  });
});
