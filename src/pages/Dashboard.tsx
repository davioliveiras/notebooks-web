import Card from '../components/data-displays/Card';
import {Notebook} from '../types/notebook';
import {useGetNotes} from '../libs/swr';
import Loading from '../components/dialogs/Loading';
import Error from '../components/dialogs/Error';
import EmptyList from '../components/dialogs/EmptyList';

export default function Dashboard() {
  const {data, error, isLoading} = useGetNotes();

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  let allArchived = true;

  if (data != 'No notebooks')
    data.map((items: Notebook) => {
      if (!items.isArchived) allArchived = false;
    });

  if (data == 'No notebooks' || allArchived) {
    return <EmptyList />;
  } else {
    return (
      <div className="myGrid h-min w-full max-w-[1700px] justify-center gap-5 p-3">
        {data.map((items: Notebook) =>
          !items.isArchived ? (
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
