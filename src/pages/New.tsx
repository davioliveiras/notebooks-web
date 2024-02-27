import { FiPlus } from "react-icons/fi";

export default function New(){
  return(
    <form className="flex justify-center">
      <div className="flex bg-white gap-2">
        <div className="flex flex-col  pl-10 pr-10 pt-5">
          <span className="text-lg font-semibold mb-5">Detalhes e processador</span>

          <label htmlFor="marca">Marca</label>
          <input type="text" id="marca" placeholder="Acer"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"/>

          <label htmlFor="marca">Modelo</label>
          <input type="text" id="marca" placeholder="Aspire 3"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"/>

          <label htmlFor="marca">Sistema</label>
          <input type="text" id="marca" placeholder="Linux"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"/>

          <label htmlFor="marca">Versão do sistema</label>
          <input type="text" id="" placeholder="Ubuntu 23.04"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"/>

          <label htmlFor="marca">Marca do processador</label>
          <input type="text" id="" placeholder="Ubuntu 23.04"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"/>
          
          <label htmlFor="marca">Modelo do processador</label>
          <input type="text" id="" placeholder="Ubuntu 23.04"
            className="border w-[200px] border-b-gray-400 mb-5 border-transparent outline-none transition focus:border-b-sky-500 pb-1"/>

          <label htmlFor="marca">Clock</label>
          <div>
          <input type="number" id="" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>
          <span className="ml-2">GHz</span>
          </div>           
                  
        </div>

        <div className="flex w-80 flex-col  pl-5 pr-5 pt-5">
          <span className="text-lg font-semibold mb-5">Armazenamento e memória</span>

          <label htmlFor="marca">RAM</label>
          <div>
          <input type="number" id="" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>
          <span className="ml-2">GB</span>
          </div>

          <label htmlFor="marca">DDR</label>

          <input type="number" id="" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>


          <label htmlFor="marca">HD</label>
          <div>
          <input type="number" id="" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>
          <span className="ml-2">GB</span>
          </div>

          <label htmlFor="marca">SSD</label>
          <div>
          <input type="number" id="" placeholder=""
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>
          <span className="ml-2">GB</span>
          </div>

          <div className="flex flex-col">
            {/* <WarningCircle size={18}/> */}
            <span className="w-52 text-sm font-medium italic text-justify text-neutral-500">
              Você deve inserir a quantidade de pelo menos um tipo de armazenamento, HD ou SSD (ou os dois juntos).
            </span>
          </div>
        </div>

        <div className="flex flex-col  pl-5 pr-5 pt-5">
          <span className="text-lg font-semibold mb-5">Tela e resolução</span>

          <label htmlFor="marca">Resolução</label>
          <input type="text" id="" placeholder="1080x720"
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>

          <label htmlFor="marca">Polegadas</label>
          <input type="number" id="" placeholder="14"
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>


          <label htmlFor="marca">Frequência</label>
          <div>
          <input type="number" id="" placeholder="120"
            className="border w-[100px] border-gray-400 rounded mb-5 border-transparent outline-none transition focus:border-sky-500 p-1"/>
          <span className="ml-2">Hz</span>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" id="touch"/>            
            <label htmlFor="touch">Tela touch</label>          
          </div>
        </div>

        <div className="flex flex-col w-80 items-center pl-5 pr-5 pt-5">
          <span className="text-lg font-semibold mb-5">Imagens</span>
          <input type="file" id="imagens" className="hidden"/>
          <label htmlFor="imagens">
            <div className="flex justify-center items-center w-40 h-60 border-[2px] rounded border-dashed cursor-pointer">
              <FiPlus/>
            </div>
          </label>
        </div>
      </div>
    </form>
  )
}