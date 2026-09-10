import type { Meta, StoryObj } from '@storybook/react';
import { DiscoveryFragment } from '../components/DiscoveryFragment';

const meta: Meta<typeof DiscoveryFragment> = {
  title: 'Fragments/DiscoveryFragment',
  component: DiscoveryFragment,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DiscoveryFragment>;

export const AllAppliances: Story = {
  args: {
    initialCategory: 'all',
    initialMaxHeight: null,
    onProductSelect: (p) => alert(`Selected product: ${p.name}`),
    onClearanceFilterChange: (val) => console.log('Clearance filter changed:', val),
  },
};

export const FilteredByEspresso: Story = {
  args: {
    initialCategory: 'espresso_machine',
    initialMaxHeight: null,
    onProductSelect: (p) => alert(`Selected product: ${p.name}`),
  },
};

export const ConstrainedClearance35cm: Story = {
  args: {
    initialCategory: 'all',
    initialMaxHeight: 35,
    onProductSelect: (p) => alert(`Selected product: ${p.name}`),
    onClearanceFilterChange: (val) => console.log('Clearance filter changed:', val),
  },
};
