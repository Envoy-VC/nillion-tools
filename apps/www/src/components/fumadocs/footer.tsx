export const Footer = () => {
  return (
    <footer className='mt-auto border-t bg-fd-card py-12 text-fd-secondary-foreground'>
      <div className='container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='mb-1 text-sm font-semibold'>Nillion Key Manager</p>
          <p className='text-xs'>
            Built with ❤️ by{' '}
            <a
              className='font-medium'
              href='https://envoy1084.xyz'
              rel='noreferrer noopener'
              target='_blank'
            >
              EnvoyVC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
