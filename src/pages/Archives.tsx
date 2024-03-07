import {Notebook} from '../types/notebook';
import ArchivedCard from '../components/archives/ArchivedCard';
import {useGetNotes} from '../libs/swr';
import Archive from '../assets/archive.png';

export default function Archives() {
  const {data, error, isLoading} = useGetNotes();

  if (isLoading) return <span>carregando</span>;

  if (error) return <span>ocorreu um erro</span>;

  let allNotArchived = true;

  if (data != 'No notebooks')
    data.map((items: Notebook) => {
      if (items.isArchived) allNotArchived = false;
    });

  if (data == 'No notebooks' || allNotArchived) {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <div className="mb-10 flex gap-2"></div>
        <div className="flex flex-col items-center gap-2 max-[450px]:w-72">
          <img src={Archive} className="mb-10 h-24 opacity-30" alt="" />
          <span className="text-4xl font-medium text-neutral-400 min-[450px]:text-left">Não há nada nos arquivos.</span>
          <span className="font-base flex text-justify text-base text-neutral-400">
            Você pode tirar notebooks do dashboard e mover para cá.
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        {data.map((items: Notebook) => (
          <div key={items.code}>
            <ArchivedCard notebook={items} />
          </div>
        ))}
      </div>
    );
  }
}
