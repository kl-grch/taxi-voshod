"use client";

import "./filter.scss";
import { useFilter } from "@/app/hooks/useFilter";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useReduxToolkit";
import { resetFilter, getFilters } from "./filterSlice";
import { RootState } from "@/app/redux/store/store";

export default function Filter() {
  const { filters } = useFilter();
  const dispatch = useAppDispatch();
  const filtersState = useAppSelector(
    (state: RootState) => state.filter.filters
  );

  function getNumberTarif(tarif: string) {
    switch (tarif) {
      case "Комфорт+":
        return 13;
      case "Комфорт":
        return 14;
      case "Комфорт2":
        return 22;
      case "Комфорт3":
        return 26;
      default:
        return "";
    }
  }

  const filterBrandsActive = filtersState
    .filter((item) => item.includes("&brand[]="))
    .map((item) => item.split("=")[1]);
  if (!filters) return <option disabled>loading</option>;

  return (
    <div className="filter">
      {filterBrandsActive.length > 0 && (
        <div className="filter__active-brands">
          Выбранные бренды: {filterBrandsActive.map((item) => `${item},`)}
        </div>
      )}
      <div className="filter__items">
        <div className="items__item">
          <div className="item__name">Марка</div>
          <select className="item__select" multiple size={3}>
            {filters.brands.values.map((brand: string) => {
              return (
                <option
                  key={brand}
                  value={brand}
                  onClick={() => dispatch(getFilters(`&brand[]=${brand}`))}
                >
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        <div className="items__item">
          <div className="item__name">Модель</div>
          <select className="item__select" multiple size={3}>
            {filters.models.values
              .filter((modelsBrand: { brand: string; models: [] }) => {
                if (filterBrandsActive.length === 0) {
                  return modelsBrand;
                } else {
                  return filterBrandsActive.includes(modelsBrand.brand);
                }
              })
              .map((modelsBrand: { brand: string; models: [] }) => (
                <optgroup key={modelsBrand.brand} label={modelsBrand.brand}>
                  {modelsBrand.models.map((model: string) => (
                    <option
                      key={model}
                      value={model}
                      onClick={() => dispatch(getFilters(`&model[]=${model}`))}
                    >
                      {model}
                    </option>
                  ))}
                </optgroup>
              ))}
          </select>
        </div>
        <div className="items__item">
          <div className="item__name">Тариф</div>
          <select className="item__select" multiple size={3}>
            {Object.values(filters.tarif.values).map((tarif: any) => (
              <option
                key={tarif}
                value={tarif}
                onClick={() =>
                  dispatch(getFilters(`&tarif[]=${getNumberTarif(tarif)}`))
                }
              >
                {tarif}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filtersState.length == 0 ? null : (
        <div className="filter__reset">
          Сбросить фильтры{" "}
          <span onClick={() => dispatch(resetFilter())}>+</span>
        </div>
      )}
    </div>
  );
}
