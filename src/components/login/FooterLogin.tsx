import GitHub from '../../assets/github.png';
import LinkedIn from '../../assets/linkedin.png';

export function FooterLogin() {
  return (
    <div className="mb-5 flex flex-col items-center gap-3 font-roboto text-neutral-600 min-[900px]:animate-fade-in-bottom min-[900px]:flex-row min-[900px]:gap-0">
      <div className="flex gap-2">
        <span className="">
          Desenvolvido por <span className="font-medium text-neutral-600">Davi Oliveira</span>
        </span>
        <img
          src={GitHub}
          onClick={() => window.open('https://github.com/davioliveiras', '_blank')}
          className="w-6 cursor-pointer opacity-70 transition hover:opacity-60"
        />
        <img
          src={LinkedIn}
          onClick={() => {
            window.open('https://linkedin.com/in/davisilvaoliveira', '_blank');
          }}
          className="w-6 cursor-pointer fill-black opacity-90 transition hover:opacity-80"
        />
      </div>

      <div className="ml-3 mr-3 mt-px hidden h-1 w-1 rounded-full bg-neutral-600 min-[900px]:inline" />
      <span>Esse site utiliza cookies 🍪</span>
    </div>
  );
}
