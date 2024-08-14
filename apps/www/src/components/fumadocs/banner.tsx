import { projects } from '~/lib/fumadocs/projects';

import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';

export const Banner = ({ basePath = 'docs' }: { basePath?: string }) => {
  return (
    <RootToggle
      options={projects.map((project) => ({
        url: `/${basePath}/${project.param}`,
        icon: (
          <project.icon
            className='size-9 shrink-0 rounded-md bg-gradient-to-t from-fd-background/80 p-1.5'
            style={{
              backgroundColor: `hsl(var(--${project.param}-color)/.3)`,
              color: `hsl(var(--${project.param}-color))`,
            }}
          />
        ),
        title: project.name,
        description: (
          <>
            {/* <span className='hidden sm:block'>{project.description.large}</span> */}
            <span>{project.description.small}</span>
          </>
        ),
      }))}
    />
  );
};
