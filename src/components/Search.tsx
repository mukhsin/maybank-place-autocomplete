import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Empty, message, Space, Spin } from "antd";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearError,
  clearPredictions,
  setSearchQuery,
  setSelectedPlace,
} from "@/store/slices";
import { searchPlacePredictions } from "@/store/thunks";
import { debounce, MOCK_PLACES } from "@/utils";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { predictions, loading, error } = useAppSelector(
    (state) => state.places,
  );

  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchQuery(value));

        if (value.trim().length > 0) {
          dispatch(searchPlacePredictions(value));
        } else {
          dispatch(clearPredictions());
        }
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  const handleSearch = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (
    value: string,
    // option: { value: string; label: string; description: string },
  ) => {
    const place = MOCK_PLACES.find((p) => p.place_id === value);
    if (place) {
      dispatch(setSelectedPlace(place));
    }
    setInputValue(place?.name || "");
  };

  const handleClear = () => {
    setInputValue("");
    dispatch(setSelectedPlace(null));
    dispatch(clearPredictions());
    dispatch(clearError());
  };

  const options = predictions.map((pred) => ({
    value: pred.place_id,
    label: pred.structured_formatting.main_text,
    description: pred.structured_formatting.secondary_text,
  }));

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <AutoComplete
        value={inputValue}
        options={options}
        onChange={handleSearch}
        onSelect={handleSelect}
        onClear={handleClear}
        placeholder="Search for a place (e.g., Marina, Borobudur, Petronas...)"
        style={{ width: "100%" }}
        allowClear
        filterOption={false}
        notFoundContent={
          loading ? (
            <Spin size="small" />
          ) : (
            <Empty description="No places found" />
          )
        }
        suffixIcon={loading ? <Spin size="small" /> : <SearchOutlined />}
      />
    </Space>
  );
};
