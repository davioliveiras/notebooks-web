import {Notebook} from '../types/notebook';
import {useGetNotes} from '../libs/swr';
import Card from '../components/data-displays/Card';
import Loading from '../components/dialogs/Loading';
import Error from '../components/dialogs/Error';
import './pages.css';
import EmptyArchive from '../components/dialogs/EmptyArchive';

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
    return <EmptyArchive />;
  } else {
    return (
      <div className="myGrid h-min w-full max-w-[1700px] justify-center gap-5 p-3">
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
