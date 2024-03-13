import {Notebook} from '../types/notebook';
import {useGetNotes} from '../libs/swr';
import Archive from '../assets/archive-logo.png';
import Card from '../components/dashboard/Card';
import Loading from '../layouts/Loading';
import Error from '../layouts/Error';
import './style.css';

export default function Archives() {
  const {data, error, isLoading} = useGetNotes();

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  let allNotArchived = true;

  if (data != 'No notebooks')
    data.map((items: Notebook) => {
      if (items.isArchived) allNotArchived = false;
    });

  if (data == 'No notebooks' || allNotArchived) {
    return (
      <div className="flex grow flex-col items-center justify-center p-5">
        <div className="mb-20 flex flex-col items-center gap-2 ">
          <img src={Archive} className="mb-10 h-24 opacity-30" alt="" />
          <span className="font-roboto text-4xl font-medium text-neutral-400 min-[450px]:text-left">Não há nada nos arquivos.</span>
          <span className="font-base flex text-justify font-roboto text-neutral-400">
            Você pode tirar notebooks do dashboard e mover para cá.
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="myGrid h-min gap-5 p-3">
        {data.map((items: Notebook) =>
          items.isArchived ? (
            <div key={items.code}>
              <Card notebook={items} />
            </div>
          ) : (
            ''
          ),
        )}
      </div>
    );
  }
}
