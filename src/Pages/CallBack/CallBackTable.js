import axios from "axios";
import { useEffect, useState } from "react";
import TableHeader from "../../components/TableHeader/TableHeader";
import ContactTable from "../../components/TableRow/ContactTable";

// --- Images
import ThreeDotsSvg from "../../Assets/Images/ProductsImgs/threedots.svg";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";

const env = process.env.REACT_APP_ALL_API;

export default function TableContactRow() {
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const [totalPage, setTotalpage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  // Datas
  const [data, setData] = useState([]);

  const token = JSON.parse(window.localStorage.getItem("token"));

  // --- Check count
  const handleChange = (evt) => {
    if (evt.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
  };

  // --- Get table Datas
  useEffect(() => {
    setLoader(true);

    axios
      .get(`${env}orders?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data);
        setTotalpage(res.data?.total_count.count);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [limit, page, token]);

  // --- Loader
  const loaders = (
    <svg
      aria-hidden="true"
      className="mr-2 w-14 h-1w-14 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  return (
    <>
      <div className="bg-white border-b rounded-xl mb-[100px]">
        <div className="flex py-3 px-4 items-center">
          <input
            className="mr-3 w-4 h-4"
            type="checkbox"
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="text-[#b9b9b9] mr-3">{checkedCount}, Выбрано</span>
          <img src={Trash} alt="Trash icon" />
        </div>
        <div className="table-scroll overflow-x-scroll pb-2.5 bg-white">
          <table className="w-full">
            <thead className="bg-[#f2f2f2]">
              <ContactTable styles="py-[13px]">
                <TableHeader styles="w-11 pr-3 justify-center">
                  <input className="w-4 h-4" type="checkbox" />
                </TableHeader>
                <TableHeader styles="w-[80px]" sortIcon={true}>
                  ID
                </TableHeader>
                <TableHeader styles="w-[393px]" sortIcon={true}>
                  Имя
                </TableHeader>
                <TableHeader styles="w-[250px]" sortIcon={true}>
                  Номер телефона
                </TableHeader>
                <TableHeader styles="w-[258px]">Время заказа</TableHeader>
                <TableHeader styles="w-[95px] pl-11">
                  <button>
                    <img src={ThreeDotsSvg} alt="three dots icon" />
                  </button>
                </TableHeader>
              </ContactTable>
            </thead>
            <tbody className="bg-white">
              {data.result?.length && loader ? (
                <div className="flex items-center justify-center my-5">
                  {loaders}
                </div>
              ) : (
                data.result?.map((item) => {
                  return (
                    <ContactTable
                      styles="py-1.5"
                      data={item}
                      key={item.id}
                      isChecked={isChecked}
                      handleChanges={handleChange}
                    ></ContactTable>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex border-t mt-2.5 p-3 justify-between items-center pr-5">
          <div className="flex">
            <select
              className="rounded-md bg-[#f2f2f2] outline-none w-12 px-1 mr-3"
              onChange={(evt) => setLimit(evt.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <span className="m-0 mr-3 text-paginationColor text-sm">
              Элементы на каждой странице
            </span>
            <span className="text-sm text-paginationButtonColor">
              1-5 из {totalPage} предметов
            </span>
          </div>
          <div className="flex items-center">
            <input
              className="w-12 text-center outline-none text-sm text-paginationButtonColor rounded-md bg-[#f2f2f2]  "
              type="nubmer"
              value={page}
              onChange={(evt) => setPage(evt.target.value)}
              maxLength={1}
            />
            <span className="mr-3.5 text-sm text-paginationButtonColor">
              из {totalPage / limit} страниц
            </span>
            <span className="flex">
              <button className="mr-4 text-paginationButtonColor">&#60;</button>
              <button className=" text-paginationButtonColor">&#62;</button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}