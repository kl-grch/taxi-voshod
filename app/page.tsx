"use client";

import { Container } from "react-bootstrap";
import Filter from "./components/filter/Filter";
import Image from "next/image";
import "./pageHome.scss";
import Link from "next/link";
import { useAllCars } from "./hooks/useAllCars";
import { useAppSelector, useAppDispatch } from "./hooks/useReduxToolkit";
import { RootState } from "./redux/store/store";
import { getNumberPage } from "./pageNumberSlice";

interface ListItemProps {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string | null;
  tarif: string[];
}

function getNumbersArray(number: number): number[] {
  const numbersArray: number[] = [];
  for (let i = 1; i <= number; i++) {
    numbersArray.push(i);
  }
  return numbersArray;
}

export default function Home() {
  const filters = useAppSelector((state: RootState) => state.filter.filters);
  const numberPage = useAppSelector(
    (state: RootState) => state.pageNumber.value
  );
  const { allCars } = useAllCars(
    numberPage,
    filters.reduce((filter, current) => filter + current, "")
  );
  const dispatch = useAppDispatch();

  let formatterPrice = new Intl.NumberFormat("ru", {
    maximumSignificantDigits: 3,
  });

  return (
    <main className="main">
      <Container>
        <div className="main__wrapper">
          <div className="main__filter">
            <Filter />
          </div>
          <div className="main__cars">
            <div className="cars__items">
              {!allCars ? (
                <p>Loading data</p>
              ) : (
                allCars.list.map((listItem: ListItemProps) => {
                  return (
                    <Link
                      href={`/car/${listItem.id}`}
                      key={listItem.id}
                      className="items__car"
                    >
                      <div className="car__img">
                        <Image
                          src={
                            listItem.image !== null
                              ? listItem.image
                              : "https://era74.ru/media/catalog/2019/08/06/no-photo_FIu9fGA.png"
                          }
                          alt={listItem.brand + " " + listItem.model}
                          width={300}
                          height={300}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "16 / 9",
                          }}
                        />
                      </div>
                      <div className="car__brand">
                        <div className="brand__name">{listItem.brand}</div>
                        <div className="brand__model">{listItem.model}</div>
                      </div>
                      <div className="car__number">
                        Номер: {listItem.number}
                      </div>
                      <div className="car__price">
                        Цена: {formatterPrice.format(listItem.price)} ₽
                      </div>
                      <div className="car__tarif">
                        Тариф: {listItem.tarif.map((item) => item)}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
          <div className="main__pages">
            {!allCars
              ? null
              : getNumbersArray(allCars.pages).map((page) => (
                  <Link
                    key={page}
                    href={{
                      query: `page=${page}`,
                    }}
                    onClick={() => dispatch(getNumberPage(page))}
                    className={`pages__number ${
                      numberPage == page && "pages__number--active"
                    }`}
                  >
                    {page}
                  </Link>
                ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
