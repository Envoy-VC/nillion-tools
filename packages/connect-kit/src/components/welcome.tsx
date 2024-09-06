import { AnimateSlide } from './animate-slide';
import { WelcomeIcon } from './icons/welcome';

export const Welcome = () => {
  return (
    <div className='ck-flex ck-flex-col ck-justify-between ck-h-full'>
      <AnimateSlide>
        <div className='ck-min-h-[16rem] ck-flex ck-flex-col ck-gap-4 ck-pb-5 ck-justify-center ck-items-center'>
          <WelcomeIcon height={200} width={200} />
          <div className='ck-text-lg ck-font-medium text-center'>
            Your gateway to the Interchain
          </div>
          <div className='ck-text-xs ck-font-medium text-center ck-text-neutral-400'>
            Connect your wallet to get started
          </div>
        </div>
      </AnimateSlide>
    </div>
  );
};
