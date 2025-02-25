import React from "react";
import Trash from "../../Assets/Images/ProductsImgs/trash.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import THead from "../../components/THead/THead";
import TBody from "../../components/TBody/TBody";

const env = process.env.REACT_APP_ALL_API;

const datajon = [
  {
    title: "ID",
    image: true,
    style: "w-14 justify-center",
  },
  {
    title: "Название товара",
    image: true,
    style: "w-[300px] ",
  },
  {
    title: "Цена",
    image: false,
    style: "w-[140px]",
  },
  {
    title: "Cо скидкой",
    image: false,
    style: "w-[140px]",
  },
  {
    title: "Кол-во",
    image: true,
    style: "w-[97px]",
  },
  {
    title: "Категория",
    image: true,
    style: "w-[150px]",
  },
  {
    title: "Статус",
    image: false,
    style: "w-[120px]",
  },
];

const Products = () => {
  const [data, setData] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [checkedCount, setCheckedCount] = React.useState(0);
  const [limit, setLimit] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalpage] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const [deleteAll, setDeleteAll] = React.useState([]);
  const languages = useSelector((state) => state.data.localization);
  const lang = useSelector((state) => state.data.lang);

  const token = JSON.parse(window.localStorage.getItem("token"));
  const handleChange = (evt) => {
    if (evt.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
  };

  // --- Get Product
  React.useEffect(() => {
    setLoader(true);
    axios
      .get(`https://intex-shop-production.up.railway.app/api/products?page=${page}&limit=${limit}`)
      .then((res) => {
        setData(res?.data?.result);
        // (res?.data?.result);
        setTotalpage(res.data?.total_count.count);
        setLoader(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, refresh]);
  // --- Loader
  const loaders = (
    <svg
      ariaHidden="true"
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
  const IdArray = data.result?.map((res) => res.id);
  // (IdArray);
  const DeleteAll = (e) => {
    axios
      .delete(
        `${env}products/delete`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ids: isChecked ? IdArray : deleteAll,
          },
        }
      )
      .then((res) => {
        console.log(res, IdArray);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err, IdArray);
      });
  };

  const vitalData = data.map((item) => {
    return {
      mainId: item.id,
      data: [
        {
          title: item.id,
          style: "w-14 flex justify-center",
          id: item.id,
        },
        {
          title: item.about_en,
          image: item.image[0],
          style: "w-[300px] flex pl-3 items-center",
        },
        {
          title: item.price,
          style: "w-[140px]",
        },
        {
          title: item.discount_price,
          style: "w-[140px]",
        },
        {
          title: item.count,
          style: "w-[97px]",
        },
        {
          title: item.category_en ? item.category_en : "Каркасные",
          style: "w-[150px]",
        },
        {
          title: item.status_en ? item.status_en : "new",
          style: "w-[120px]",
          label: `label label_${item.status_en}`,
          statusStyle: "",
        },
      ],
    };
  });

  const handleScroll = () => {
    console.log("scrolling");
  };

  return (
    <div className="bg-white rounded-xl mb-[100px]">
      <div className="flex py-3 px-4 items-center  z-50">
        <input
          className="mr-3 w-4 h-4 cursor-pointer"
          type="checkbox"
          onChange={() => setIsChecked(!isChecked)}
        />
        <span className="text-[#b9b9b9] mr-3">
          {isChecked ? data.result.length : deleteAll.length}, {languages[lang].main.select}
        </span>
        <img className="cursor-pointer" onClick={DeleteAll} src={Trash} alt="Trash icon" />
      </div>
      <div className="bg-white">
        <table className="w-full" onScroll={handleScroll}>
          <THead data={datajon}></THead>
          <TBody vitalData={vitalData} urlRoute="products"></TBody>
        </table>
      </div>
      {/* <div className="flex border-t mt-2.5 p-3 justify-between items-center pr-5">
        <div className="flex">
          <select
            className="rounded-md bg-[#f2f2f2] outline-none w-12 px-1 mr-3"
            onChange={(evt) => setLimit(evt.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <span className="m-0 mr-3 text-paginationColor text-sm">
            {languages[lang].main.elementsPage}
          </span>
          <span className="text-sm text-paginationButtonColor">
            1-5 из {languages[lang].main.itemsNumb} {totalPage}
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
            из {Math.floor(totalPage / limit)} {languages[lang].main.pages}
          </span>
          <span className="flex">
            <button
              className="mr-4 text-paginationButtonColor"
              onClick={() => {
                page === 0 ? setPage(0) : setPage(page - 1);
              }}
            >
              &#60;
            </button>
            <button
              className=" text-paginationButtonColor"
              onClick={() => {
                page === Math.floor(totalPage / limit)
                  ? setPage(Math.floor(totalPage / limit))
                  : setPage(page + 1);
              }}
            >
              &#62;
            </button>
          </span>
        </div>
      </div> */}
    </div>
  );
};
export default Products;
