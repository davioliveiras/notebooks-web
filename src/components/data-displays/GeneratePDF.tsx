import {Document, Page, Text, Image, StyleSheet, View} from '@react-pdf/renderer';
import {Notebook} from '../../types/notebook';

type props = {
  notebook: Notebook;
};

const style = StyleSheet.create({
  page: {
    padding: '20px',
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    marginBottom: '20px',
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 15,
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 15,
  },
  notas: {
    fontFamily: 'Helvetica',
    fontSize: '10',
  },
  image: {
    width: '150px',
  },
  viewRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
});

export default function GeneratePDF({notebook}: props) {
  return (
    <Document>
      <Page style={style.page}>
        <View>
          <Text style={style.title}>{`Notebook ${notebook.code}`}</Text>
        </View>
        <View style={style.viewRow}>
          <View style={style.viewCol}>
            <View>
              <Text style={style.label}>Marca</Text>
              <Text style={style.text}>{`${notebook.brand.name}`}</Text>
            </View>
            <View>
              <Text style={style.label}>Modelo</Text>
              <Text style={style.text}>{`${notebook.model}`}</Text>
            </View>
            <View>
              <Text style={style.label}>Sistema</Text>
              <Text style={style.text}>{`${notebook.system.name} ${notebook.system_version}`}</Text>
            </View>
            <View>
              <Text style={style.label}>Marca do processador</Text>
              <Text style={style.text}>{`${notebook.processor.brand.name}`}</Text>
            </View>
            <View>
              <Text style={style.label}>Modelo do processador</Text>
              <Text style={style.text}>{`${notebook.processor.model}`}</Text>
            </View>
            <View>
              <Text style={style.label}>Memória RAM</Text>
              <Text style={style.text}>{`${notebook.ram} GB`}</Text>
            </View>
            <View>
              <Text style={style.label}>Armazenamento HD</Text>
              <Text style={style.text}>{`${notebook.hd} GB`}</Text>
            </View>
            <View>
              <Text style={style.label}>Armazenamento SSD</Text>
              <Text style={style.text}>{`${notebook.ssd}`}</Text>
            </View>
            <View>
              <Text style={style.label}>Tela</Text>
              <Text style={style.text}>{`${notebook.resolution} de ${notebook.inch} polegadas, ${notebook.hertz} Hz`}</Text>
            </View>
            <View>
              <Text style={style.label}>Placa de vídeo</Text>
              <Text style={style.text}>{`${notebook.graphics_card?.brand.name} ${notebook.graphics_card?.model}`}</Text>
            </View>
          </View>

          <View style={style.viewCol}>
            <Image style={style.image} src={'https://m.media-amazon.com/images/I/61PrCgQ2KwL._AC_UF1000,1000_QL80_.jpg'} />
            <Text style={style.notas}>{`${notebook.note}`}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
