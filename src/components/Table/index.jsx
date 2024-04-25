import { useState, useEffect, useCallback } from "react";
import { fetchCities } from "../../actions";
import SearchInput from "../SearchInput";
import "./Table.css";
import "react-responsive-pagination/themes/classic.css";
import ResponsivePagination from "react-responsive-pagination";
import Loader from "../Loader";

const Table = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [, setTotalItems] = useState(0);

  const [pagination, setPagination] = useState({
    namePrefix: "",
    offset: 0,
    limit: 5,
  });

  const fetchData = useCallback(
    async (paginationInfo) => {
      setIsLoading(true);
      const result = await fetchCities(paginationInfo);
      setIsLoading(false);

      if (result?.data) {
        setCities(result.data);
        setTotalPages(
          Math.ceil(result?.metadata?.totalCount / pagination.limit)
        );
        setTotalItems(result?.metadata?.totalCount || 0);
      }
    },
    [pagination]
  );

  useEffect(() => {
    fetchData(pagination);
  }, [pagination, fetchData]);

  const renderTableRows = () => {
    if (cities.length === 0) {
      return (
        <tr>
          <td colSpan="3">No result found</td>
        </tr>
      );
    } else {
      return cities.map((city, index) => (
        <tr key={city.id}>
          <td>{index + 1}</td>
          <td>{city.name}</td>
          <td>{city.country}</td>
        </tr>
      ));
    }
  };

  const handlePageClick = (event) => {
    setPagination((prev) => ({ ...prev, offset: event - 1 }));
  };

  return (
    <>
      <div className="header">
        <SearchInput
          onDebounedTextChange={(val) =>
            setPagination((prev) => ({ ...prev, namePrefix: val }))
          }
          textValue={pagination.namePrefix}
        />
        <div className={isLoading ? "" : "hidden"}>
          <Loader />
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>

        {cities.length > 0 && (
          <div className="table-footer">
            <div className="pagination-container">
              <ResponsivePagination
                current={pagination.offset + 1}
                total={totalPages}
                onPageChange={handlePageClick}
              />
            </div>

            <div className="city-input">
              <label htmlFor="city-input">Number of cities to display: </label>
              <input
                type="number"
                id="city-input"
                min="1"
                max="10"
                defaultValue={5}
                onChange={(e) => {
                  const val = +e.target.value;

                  if (val <= 10) {
                    setPagination((prev) => ({
                      ...prev,
                      limit: val,
                      namePrefix: "",
                    }));
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
