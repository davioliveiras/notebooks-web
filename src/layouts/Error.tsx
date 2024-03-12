import SadFace from '../assets/sadface.png';

export default function Error() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-3 p-5">
      <img src={SadFace} alt="sad face" className="h-20 opacity-70" />
      <span className="font-roboto text-4xl font-medium text-neutral-400">Ocorreu um erro</span>
      <span className="max-w-[450px] text-justify font-roboto text-base text-neutral-400">
        Tente recarregar a página. Entre em contato caso o erro persista: davioliveirasilva.br@gmail.com.
      </span>
    </div>
  );
}
