import {Spinner} from '@phosphor-icons/react';

export default function () {
  return (
    <div className="flex grow flex-col items-center justify-center gap-3">
      <Spinner size={40} className="animate-spin fill-neutral-400" />
      <span className="font-roboto text-4xl font-normal text-neutral-400">Carregando...</span>
    </div>
  );
}
