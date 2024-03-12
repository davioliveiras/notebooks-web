import GitHub from '../assets/github.png';
import LinkedIn from '../assets/linkedin.png';

export default function () {
  return (
    <div className="items flex justify-center">
      <div className="mb-5 ml-10 mt-20 flex w-full max-w-[1366px] gap-2">
        <span className="text-neutral-400">
          Desenvolvido por <span className="font-medium text-neutral-400">Davi Oliveira</span>
        </span>
        <img
          src={GitHub}
          onClick={() => window.open('https://github.com/davioliveiras', '_blank')}
          className="w-6 cursor-pointer opacity-40 transition hover:opacity-60"
        />
        <img
          src={LinkedIn}
          onClick={() => {
            window.open('https://linkedin.com/in/davisilvaoliveira', '_blank');
          }}
          className="w-6 cursor-pointer fill-black opacity-55 transition hover:opacity-80"
        />
      </div>
    </div>
  );
}
