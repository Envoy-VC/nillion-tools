export interface Mode {
  param: string;
  name: string;
  href: string;
}

export const modes: Mode[] = [
  {
    param: 'docs',
    name: 'Docs',
    href: '/docs',
  },
  {
    param: 'demo',
    name: 'Demo',
    href: '/demo',
  },
];
